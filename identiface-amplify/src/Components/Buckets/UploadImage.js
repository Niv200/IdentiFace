import React, { useState } from "react";
import AWS from "aws-sdk";

const S3_BUCKET = "identiface-main-bucket";
const REGION = "eu-central-1";

AWS.config.update({
	accessKeyId: "AKIA4RIMQDLB2OQXHWPK",
	secretAccessKey: "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",
});

const myBucket = new AWS.S3({
	params: { Bucket: S3_BUCKET },
	region: REGION,
});

const uploadFile = (file, name, setProgress) => {
	const params = {
		ACL: "public-read",
		Body: file,
		Bucket: S3_BUCKET,
		Key: name,
	};

	myBucket
		.putObject(params)
		.on("httpUploadProgress", (evt) => {
			setProgress(Math.round((evt.loaded / evt.total) * 100));
		})
		.send((err) => {
			if (err) console.log(err);
		});
};

// export default function UploadImage() {
// 	const [progress, setProgress] = useState(0);
// 	const [selectedFile, setSelectedFile] = useState(null);
// 	const [setPersonName, personName] = useState("");

// 	const handleFileInput = (e) => {
// 		setSelectedFile(e.target.files[0]);
// 	};

// 	//If  progress is more than 0
// 	if (progress > 0) {
// 		//Is completed?
// 		if (progress === 100) {
// 			return (
// 				<div>
// 					<div>Success!</div>
// 				</div>
// 			);
// 			//Else show progress
// 		} else {
// 			return (
// 				<div>
// 					<div>Native SDK File Upload Progress is {progress}%</div>
// 				</div>
// 			);
// 		}
// 	}

// 	//If name and file are valid:
// 	if (selectedFile && selectedFile.name) {
// 		//If file name doesnt end with .jpg
// 		if (!selectedFile.name.endsWith(".jpg")) {
// 			return (
// 				<div>
// 					<div>File is not valid!</div>
// 					<div>Only files ending with .jpg are supported!</div>
// 					<input type="file" onChange={handleFileInput} />
// 				</div>
// 			);
// 		}
// 		//Show uploading button
// 		return (
// 			<div>
// 				<button
// 					onClick={() =>
// 						uploadFile(selectedFile, selectedFile.name, setProgress)
// 					}
// 				>
// 					Upload to S3
// 				</button>
// 			</div>
// 		);
// 		//Show uploading box
// 	} else {
// 		return (
// 			<div>
// 				<div>Select a person JPG file to begin with:</div>
// 				<input type="file" onChange={handleFileInput} />
// 			</div>
// 		);
// 	}
// }

///////////////////////////

export default function UploadImage() {
	const [file, setFile] = useState();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [message, setMessage] = useState(undefined);
	const [progress, setProgress] = useState(0);
	let progressText;
	if (progress > 1) {
		progressText = progress + "%";
		if (progress === 100) {
			progressText = "Done uploading!";
		}
	}
	return (
		<div>
			<div>{message}</div>
			<div>
				<label>Select image (.png)</label>
				<input
					type="file"
					name="file"
					onChange={(e) => uploadImage(e.target.files[0], setFile, setMessage)}
				/>
			</div>
			<div>
				<label>First name</label>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</div>
			<div>
				<label>Last name</label>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</div>
			<button
				onClick={() =>
					upload(firstName, lastName, setMessage, file, setProgress)
				}
			>
				Upload person
			</button>
			<div>{progressText}</div>
		</div>
	);
}

const upload = (firstName, lastName, setMessage, file, setProgress) => {
	if (firstName.length > 2 && lastName.length > 2) {
		if (!file) {
			setMessage("Image is not valid!");
		} else {
			setMessage(undefined);
			let fileName = firstName + "-" + lastName + ".png";
			uploadFile(file, fileName, setProgress);
		}
	} else {
		if (firstName.length > 3) {
			setMessage("Last name is too short!");
		} else {
			setMessage("First name is too short!");
		}
	}
};

const uploadImage = (file, setFile, setMessage) => {
	if (file) {
		if (file.name && file.name.endsWith(".jpg")) {
			setFile(file);
			setMessage(undefined);
		} else {
			setFile(undefined);
			setMessage("Image must end with .jpg");
		}
	} else {
		setFile(undefined);
		setMessage("Image must end with .jpg");
	}
};
