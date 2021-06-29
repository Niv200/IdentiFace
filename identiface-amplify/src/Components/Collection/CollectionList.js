import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listcollections";

export default function CollectionList() {
	const [collections, setCollections] = useState(undefined);

	useEffect(() => {
		updateCollectionsState(url, setCollections);
	}, []);
	let list;
	if (collections) {
		list = getList(collections);
	}
	return <div>{list}</div>;
}

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

const getList = (collections) => {
	let list = collections.map((item) => {
		return <li key={Math.floor(Math.random() * 1000000000000)}>{item}</li>;
	});
	return (
		<div>
			<ul>{list}</ul>
		</div>
	);
};
