import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listcollections";

const urlDelete = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/deletecollection";
export default function CollectionDelete() {
  const [collections, setCollections] = useState(undefined);
  const [toRemove, setToRemove] = useState();

  useEffect(() => {
    updateCollectionsState(url, setCollections);
  }, []);
  let list;
  if (collections) {
    list = getList(setCollections, collections, setToRemove, toRemove);
  }

  return (
    <div className="addbackground">
      <h1 className="listcollectionsh1">Choose collection to delete:</h1>
      {list}
      {toRemove ? undefined : ""}
    </div>
  );
}

//
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

const getList = (setCollections, collections, setToRemove, toRemove) => {
  let list = collections.map((item) => {
    if (!toRemove) {
      return (
        <li key={Math.floor(Math.random() * 1000000000000)}>
          {item} <button onClick={() => setToRemove(item)}>remove</button>
        </li>
      );
    } else if (toRemove === item) {
      return (
        <li key={Math.floor(Math.random() * 1000000000000)}>
          {item}
          <button onClick={() => deleteCollection(item, setCollections, collections, setToRemove)}>permanently delete</button>
        </li>
      );
    } else {
      return <li key={Math.floor(Math.random() * 1000000000000)}>{item}</li>;
    }
  });
  return (
    <div className="addbackground">
      <ul className="collectionlist">{list}</ul>
      {toRemove ? <button onClick={() => setToRemove(undefined)}>back</button> : undefined}
    </div>
  );
};

const deleteCollection = (collection, setCollections, collections, setToRemove) => {
  let body = {
    data: {
      collectionName: collection,
    },
  };

  axios.delete(urlDelete, body).then(
    (response) => {
      let deleted = response.data.deletedCollection;
      setCollections(collections.filter((item) => item !== deleted));
      setToRemove(undefined);
    },
    (error) => {
      console.log(error);
    }
  );
};
