import React from "react";
import { useState } from "react";
import axios from "axios";

const urlCreate = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/createcollection";

export default function CreateCollection() {
	const [collectionName, setCollectionName] = useState("");
	const [status, setStatus] = useState();

	return (
		<div>
			<div>{status}</div>
			<input type="text" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} />
			<button onClick={() => createNewCollection(collectionName, setStatus)}>Create</button>
		</div>
	);
}

const createNewCollection = (collectionName, setStatus) => {
	if (collectionName.length > 5 && /^[a-zA-Z]+$/.test(collectionName) && collectionName.length < 25) {
		setStatus(undefined);
		create(collectionName);
	} else {
		if (collectionName.length < 5) {
			setStatus("Collection name is too short!");
		} else {
			if (collectionName.length > 25) {
				setStatus("Collection name is too long!");
			} else {
				setStatus("Collection name must contain single word using alphabetics only!");
			}
		}
	}
};

const create = (collection) => {
	let body = {
		// data: {
		collectionName: collection,
		// },
	};

	axios.post(urlCreate, body).then(
		(response) => {
			console.log(response);
		},
		(error) => {
			console.log(error);
		}
	);
};
