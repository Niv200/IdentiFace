import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listcollections";
const url2 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/describecollection";

export default function CollectionData() {
  const [collections, setCollections] = useState(undefined);
  const [current, setCurrent] = useState(undefined);

  useEffect(() => {
    updateCollectionsState(url, setCollections);
  }, []);
  let list;
  if (collections) {
    list = getList(collections, setCurrent);
  }
  return (
    <div>
      <div>
        <h1>Show information about each collection</h1>
      </div>
      {list}
      {current ? <div>{current}</div> : undefined}
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

const getList = (collections, setCurrent) => {
  let list = collections.map((item) => {
    return (
      <li key={Math.floor(Math.random() * 1000000000000)}>
        {item} {getCollectionButton(item, setCurrent)}
      </li>
    );
  });
  return (
    <div>
      <ul>{list}</ul>
    </div>
  );
};

const showData = (collection, setCurrent) => {
  let body = {
    collectionId: collection,
  };

  axios.post(url2, body).then(
    (response) => {
      if (response.data.result === "success") {
        setCurrent(
          <div>
            <div> Collection name: {collection}</div>
            <div> Faces count: {response.data.collection.FaceCount}</div>
            <div> Created at: {response.data.collection.CreationTimestamp}</div>
          </div>
        );
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

const getCollectionButton = (collection, setCurrent) => {
  return <button onClick={() => showData(collection, setCurrent)}>Show</button>;
};
