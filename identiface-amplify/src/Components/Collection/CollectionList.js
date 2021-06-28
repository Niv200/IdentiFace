import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listcollections";

const urlDelete = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/deletecollection";
export default function CollectionList() {
	const [collections, setCollections] = useState(undefined);
	const [edit, setEdit] = useState(false);
	const [toRemove, setToRemove] = useState();

	useEffect(() => {
		updateCollectionsState(url, setCollections);
	}, []);
	let list;
	if (collections) {
		list = getList(setCollections, collections, collections, edit, setEdit, setToRemove, toRemove);
	}
	return (
		<div>
			heyy {list}
			<button
				onClick={() => {
					if (edit) {
						setToRemove(undefined);
					}
					setEdit(!edit);
				}}
			>
				{edit ? "Back" : "Edit"}
			</button>
		</div>
	);
}

//
const updateCollectionsState = (url, setCollections) => {
	axios
		.get(url)
		.then((response) => {
			console.log(response.data.collections);
			setCollections(response.data.collections);
		})
		.catch((error) => {
			console.log(error);
		});
};

const getList = (setCollections, collections, collection, edit, setEdit, setToRemove, toRemove) => {
	let list = collection.map((item) => {
		if (edit && !toRemove) {
			return (
				<li key={Math.floor(Math.random() * 1000000000000)}>
					{item} <button onClick={() => setToRemove(item)}>remove</button>
				</li>
			);
		} else if (toRemove === item) {
			return (
				<li key={Math.floor(Math.random() * 1000000000000)}>
					{item}
					<button onClick={() => deleteCollection(item, setCollections, collections, setToRemove, setEdit)}>
						permanently delete
					</button>
				</li>
			);
		} else {
			return <li key={Math.floor(Math.random() * 1000000000000)}>{item}</li>;
		}
	});
	return (
		<div>
			<ul>{list}</ul>
		</div>
	);
};

const deleteCollection = (collection, setCollections, collections, setToRemove, setEdit) => {
	let body = {
		data: {
			collectionName: collection,
		},
	};

	axios.delete(urlDelete, body).then(
		(response) => {
			let deleted = response.data.deletedCollection;
			setCollections(collections.filter((item) => item !== deleted));
			setEdit(false);
			setToRemove(undefined);
		},
		(error) => {
			console.log(error);
		}
	);
};
