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
  return (
    <div>
      <div>
        <h1 className="listcollectionsh1">Listing all collections:</h1>
      </div>
      {list}
    </div>
  );
}

const updateCollectionsState = (url, setCollections) => {
  axios
    .get(url)
    .then((response) => {
      setCollections(response.data.collections);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getList = (collections) => {
  let list = collections.map((item) => {
    return (
      <li className="collectionlistitem" key={Math.floor(Math.random() * 1000000000000)}>
        {item}
      </li>
    );
  });
  return (
    <div>
      <ul className="collectionlist">{list}</ul>
    </div>
  );
};
