import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listcollections";
const url2 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listfacesinbucket";
const url3 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/sendface";
const url4 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/addfacetodatabase";

function AddUser() {
	const [collections, setCollections] = useState(undefined);
	const [collection, setCollection] = useState(undefined);
	const [users, setUsers] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [adding, setAdding] = useState(undefined);
	const [status, setStatus] = useState(undefined);
	const [image, setImage] = useState(undefined);
	useEffect(() => {
		// setUsers(getUsers());
		updateCollectionsState(setCollections);
		getUsers(setUsers);
	}, []);
	if (status) {
	}
	if (!collection && collections && !adding) {
		return (
			<div>
				<h1>Choose a collection to add a user into.</h1>
				<div className="paragraph">{promptCollections(collections, setCollection)}</div>
			</div>
		);
	}
	if (!users || !collections) {
		return (
			<div>
				<h1>Loading users and collections...</h1>
			</div>
		);
	}
	if (adding) {
		return (
			<div>
				<h1>Adding user to collection...</h1>
			</div>
		);
	}
	if (user) {
		return (
			<div>
				<h2>
					You are about to add {user} to {collection} collection.
				</h2>
				<button
					onClick={() => {
						addUser(user, collection, setStatus, setAdding);
						setCollection(undefined);
						setUser(undefined);
						setAdding(true);
					}}
				>
					Confirm
				</button>
				<button
					onClick={() => {
						setCollection(undefined);
						setUser(undefined);
						setStatus(undefined);
						setAdding(undefined);
					}}
				>
					Back
				</button>
			</div>
		);
	}
	return (
		<div>
			{image && (
				<div>
					<img
						className="image"
						alt="person"
						src={
							"https://identiface-face-storage192200-dev.s3.eu-central-1.amazonaws.com/public/" +
							image.replace(" ", "-") +
							".png"
						}
					/>
					<div>
						<button onClick={() => setImage(undefined)}>clear image</button>{" "}
					</div>
				</div>
			)}
			<h1>Choose a user to add into {collection}.</h1>
			<div className="paragraph">{getUsersButtons(users, collection, setUser, setImage)}</div>
			<button onClick={() => setCollection(undefined)}>Back</button>
			<div></div>
		</div>
	);
}

const promptCollections = (collections, setCollection) => {
	let buttons = collections.map((collection) => {
		return (
			<div key={Math.floor(Math.random() * 100000000000)}>
				<button key={Math.floor(Math.random() * 100000000000)} onClick={() => setCollection(collection)}>
					{collection}
				</button>
			</div>
		);
	});
	return buttons;
};

const getUsersButtons = (users, collection, setUser, setImage) => {
	return users.map((user) => {
		return (
			<div key={Math.floor(Math.random() * 100000000000)}>
				{user}
				<button key={Math.floor(Math.random() * 100000000000)} onClick={() => setUser(user)}>
					add
				</button>
				<button key={Math.floor(Math.random() * 100000000000)} onClick={() => setImage(user)}>
					show photo
				</button>
			</div>
		);
	});
};

const addUser = (user, collection, setStatus, setAdding) => {
	setStatus("Adding new user...");
	//setAdding(undefined) when completed
	let userName = user;
	let path = "public/" + user.replace(" ", "-") + ".png";
	const sendFace = {
		fileName: path,
		collectionName: collection,
	};

	axios.post(url3, sendFace).then(
		(response) => {
			if (response.data.result.FaceRecords[0].Face.ImageId) {
				let sendReq = {
					id: response.data.result.FaceRecords[0].Face.FaceId,
					imageId: response.data.result.FaceRecords[0].Face.ImageId,
					collection: collection,
					file: sendFace.fileName,
					name: userName,
				};
				axios.post(url4, sendReq).then(
					(response) => {
						if (response.data.success) {
							setStatus(undefined);
							setAdding(undefined);
						}
					},
					(error) => {
						setStatus("Error, refresh page!");
					}
				);
			} else {
				setStatus("Error, refresh page!");
			}
		},
		(error) => {
			setStatus("Error, refresh page!");
		}
	);
};

const getUsers = (setUsers) => {
	axios
		.get(url2)
		.then((response) => {
			let list = response.data.images.map((userPath) => {
				return userPath.Key.replace("public/", "").replace("-", " ").split(".")[0];
			});
			list = list.filter((listName) => !listName.includes("compare/"));
			setUsers(list);
		})
		.catch((error) => {});
};

const updateCollectionsState = (setCollections) => {
	axios
		.get(url)
		.then((response) => {
			setCollections(response.data.collections);
		})
		.catch((error) => {});
};

export default AddUser;
