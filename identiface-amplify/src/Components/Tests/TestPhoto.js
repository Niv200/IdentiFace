import React, { useState, useEffect } from "react";
import axios from "axios";

import Amplify, { Storage } from "aws-amplify";
import config from "../../aws-exports";
let uuid = require("uuid");
Amplify.configure(config);

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listcollections";
const url2 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/comparephoto";
const url3 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listdynamo";

export default function TestPhoto() {
	const [file, setFile] = useState();
	const [fileName, setFileName] = useState();
	const [message, setMessage] = useState(undefined);
	const [result, setResult] = useState();
	const [displayResult, setDisplayResult] = useState();
	const [isContinue, setIsContinue] = useState(false);
	const [done, setDone] = useState(false);

	const [collectionsIn, setCollectionsIn] = useState([]);
	const [collectionAsked, setCollectionAsked] = useState([]);
	const [id, setId] = useState();
	//load data

	const [dbUsers, setDBUsers] = useState(undefined);
	const [collections, setCollections] = useState(undefined);
	if (result && displayResult && file) {
		setDisplayResult();
	}
	useEffect(() => {
		updateCollectionsState(setCollections);
		getUsers(setDBUsers);
	}, []);
	if (!dbUsers || !collections) {
		return (
			<div>
				<h3>Loading collections and users...</h3>
			</div>
		);
	}
	if (id && collectionsIn) {
		let name = searchDb(id, dbUsers);
		if (name) {
			return (
				<div>
					<h3>Person information:</h3>
					<div>Person is in: {stripString(JSON.stringify(collectionsIn[0]))}</div>
					<div>id: {id}</div>
					<div>name: {name}</div>
					<div>
						<h3>Response:</h3>
						<div>
							<p>
								{JSON.stringify(
									constructResponse({
										name: name,
										id: id,
										collection: [collectionsIn[0]],
									})
								)}
								{removeFile(fileName)}
							</p>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<h3>User is not in database</h3>
					<div>
						<h3>Response:</h3>
						<div>
							<p>{JSON.stringify(constructResponse(undefined))}</p>
							{removeFile(fileName)}
						</div>
					</div>
				</div>
			);
		}
	}

	if (done) {
		return (
			<div>
				<h3>Photo uploaded successfuly with the name {fileName}</h3>
				<p>Sending image to AWS Rekognition...</p>
				<p>Searching user in: {stripString(JSON.stringify(collections))}</p>
				{comparePhoto(
					fileName,
					collections,
					setResult,
					collectionsIn,
					setCollectionsIn,
					id,
					setId,
					collectionAsked,
					setCollectionAsked
				)}
			</div>
		);
	}
	if (isContinue) {
		return (
			<div>
				<h3>Uploading photo to S3...</h3>
			</div>
		);
	}
	return (
		<div>
			<h1>Upload photo to be identified</h1>
			<p>Upload a photo to find if the person inside the photo matches any in the system</p>
			<div>
				<input
					className="paragraph"
					type="file"
					name="file"
					onChange={(e) => verifyFile(e.target.files[0], setFile, setMessage, setIsContinue, setFileName, setDone)}
				/>
			</div>
			<div>{message}</div>
		</div>
	);
}

const verifyFile = (file, setFile, setMessage, setIsContinue, setFileName, setDone) => {
	if (file) {
		if (file.name.endsWith(".png")) {
			setFile(file);
			setMessage("Uploading image to S3...");
			setIsContinue(true);
			let filename = getName();
			setFileName(filename);
			uploadFile(file, filename, setMessage, setDone);
		} else {
			setIsContinue(false);
			setMessage("Image is not valid");
		}
	}
};

const getName = () => {
	let id = uuid.v4();
	let trimmed = id.replaceAll("-", "").substring(0, 10);
	let name = "test/" + trimmed;
	return name;
};

const uploadFile = (file, name, setResult, setDone) => {
	setResult(false);
	Storage.put(name, file, {
		contentType: "image/png",
	})
		.then((result) => {
			setResult("Photo uploaded to S3");
			setDone(true);
		})
		.catch((err) => console.log("Error uploading to S3, please refresh page"));
};

const removeFile = (name) => {
	Storage.remove(name)
		.then()
		.catch((err) => console.log("Error deleting image from S3"));
};

const updateCollectionsState = (setCollections) => {
	axios
		.get(url)
		.then((response) => {
			setCollections(response.data.collections);
		})
		.catch((err) => console.log("Error uploading to S3, please refresh page"));
};

const getUsers = (setUsers) => {
	axios
		.get(url3)
		.then((response) => {
			setUsers(response.data.data.Items);
		})
		.catch((error) => {
			console.log(error);
		});
};

const comparePhoto = (
	photo,
	collections,
	setResult,
	collectionsIn,
	setCollectionsIn,
	id,
	setId,
	collectionAsked,
	setCollectionAsked
) => {
	let requests = collections.map((col) => {
		return {
			photo: photo,
			collection: col,
		};
	});
	let array = [];
	requests.map((req) => {
		if (
			!array.includes(req.collection) &&
			!collectionAsked.includes(req.collection) &&
			collectionAsked.length <= requests.length
		) {
			setCollectionAsked([...collectionAsked, req.collection]);
			axios
				.post(url2, req)
				.then((response) => {
					if (response.data.status === "success") {
						// array.push(req.collection);
						if (response.data.result.FaceMatches.length === 1) {
							if (!array.includes(req.collection)) {
								array.push(req.collection);
								if (array.length > collectionsIn.length) {
									setCollectionsIn(array);
								}
							}
							if (!id) {
								setId(response.data.result.FaceMatches[0].Face.FaceId);
							}
						}
					}
				})
				.catch((err) => console.log("Error uploading to S3, please refresh page"));
		}
		return undefined;
	});
};

const stripString = (str) => {
	let newStr = str.replaceAll(",", ", ").replaceAll("[", "").replaceAll("]", "").replaceAll(`"`, "");
	return newStr;
};

const searchDb = (id, dbUsers) => {
	let user = dbUsers.filter((user) => user.id === id);
	if (user.length <= 0) {
		return undefined;
	}
	if (user[0].name) {
		return user[0].name;
	}
};

const constructResponse = (user) => {
	if (!user) {
		return { error: "User does not exist in database!" };
	}
	return {
		userName: user.name,
		userId: user.id,
		userCollection: user.collection,
	};
};
