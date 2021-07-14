import React, { useState } from "react";
import Amplify, { Storage } from "aws-amplify";
import config from "../aws-exports";
Amplify.configure(config);

const uploadFile = (file, name, setResult) => {
	setResult(false);
	Storage.put("compare/" + name, file, {
		contentType: "image/png",
	})
		.then((result) => setResult("Photo uploaded to S3"))
		.catch((err) => console.log(err));
};

export default function UploadComparePhoto() {
	const [file, setFile] = useState();
	const [fileName, setFileName] = useState("");
	const [message, setMessage] = useState(undefined);
	const [result, setResult] = useState();
	if (result === false) {
		return (
			<div>
				<h1>Uploading new image...</h1>
			</div>
		);
	}
	if (result) {
		return (
			<div>
				<h1>New image has been uploaded.</h1>
				<button
					onClick={() => {
						setResult(undefined);
						setFile(undefined);
						setFileName("");
					}}
				>
					back
				</button>
			</div>
		);
	}
	return (
		<div>
			<div>
				<label>Select image (.png) for comparison</label>
				<div>
					<input className="paragraph" type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
				</div>
			</div>
			<div>
				<label className="paragraph">Image name</label>
				<input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
			</div>
			{fileName}
			<button onClick={() => upload(fileName, setMessage, file, setResult)}>Upload image</button>
			<div>{message}</div>
		</div>
	);
}

//Verify values and file before uploading file
const upload = (fileName, setMessage, file, setResult) => {
	if (fileName.length > 5) {
		if (!file) {
			setMessage("Image is not valid!");
		} else {
			setMessage(undefined);
			uploadFile(file, fileName, setResult);
		}
	} else {
		setMessage("Name is too short!, it must be bigger than 5 characters.");
	}
};
