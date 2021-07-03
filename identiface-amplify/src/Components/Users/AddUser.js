import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listcollections";
const url2 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listfacesinbucket";
const url3 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/sendface";

function AddUser() {
  const [collections, setCollections] = useState(undefined);
  const [collection, setCollection] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [adding, setAdding] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  useEffect(() => {
    // setUsers(getUsers());
    updateCollectionsState(setCollections);
    getUsers(setUsers);
  }, []);
  if (status) {
  }
  if (!collection && collections) {
    return (
      <div>
        <h1>Choose a collection to add a user into.</h1>
        <div>{promptCollections(collections, setCollection)}</div>
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
        <h1>
          You are about to add {user} to {collection} collection.
        </h1>
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
      <h1>Adding user into {collection}.</h1>
      <div>{getUsersButtons(users, collection, setUser)}</div>
      <button onClick={() => setCollection(undefined)}>Back</button>
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

const getUsersButtons = (users, collection, setUser) => {
  return users.map((user) => {
    return (
      <div key={Math.floor(Math.random() * 100000000000)}>
        {user}
        <button key={Math.floor(Math.random() * 100000000000)} onClick={() => setUser(user)}>
          add
        </button>
      </div>
    );
  });
};

const addUser = (user, collection, setStatus) => {
  console.log("Adding user " + user + " to collection: " + collection);
  setStatus("Added new user");
  //setAdding(undefined) when completed
  console.log(user);
  let path = "public/" + user.replace(" ", "-") + ".png";
  console.log(path);
  const sendFace = {
    fileName: path,
    collectionName: collection,
  };
  /**
   * {statusCode: 200, body: "\"Sent image to collection\"", result: {…}}
body: "\"Sent image to collection\""
result:
FaceModelVersion: "5.0"
FaceRecords: Array(1)
0:
Face: {FaceId: "58e1cfb1-b99e-449e-a741-782a1a0681d3", BoundingBox: {…}, ImageId: "b7957307-b943-3d70-b00a-defcb8ee24cb", Confidence: 99.99270629882812}
FaceDetail: {BoundingBox: {…}, Landmarks: Array(5), Pose: {…}, Quality: {…}, Confidence: 99.99270629882812}
__proto__: Object
length: 1
__proto__: Array(0)
UnindexedFaces: []
__proto__: Object
statusCode: 200
__proto__: Object
   */
  console.log(sendFace);
  axios.post(url3, sendFace).then(
    (response) => {
      console.log(response.data.result);
      setStatus(undefined);
    },
    (error) => {
      setStatus(undefined);
      console.log(error);
    }
  );
  const params = {
    TableName: "hey",
    Item: {
      id: "hey",
      collection: "hey",
      file: "hey",
    },
  };
};

const getUsers = (setUsers) => {
  axios
    .get(url2)
    .then((response) => {
      let list = response.data.images.map((userPath) => {
        return userPath.Key.replace("public/", "").replace("-", " ").split(".")[0];
      });
      console.log(list);
      setUsers(list);
    })
    .catch((error) => {
      console.log(error);
    });
};

const isExisting = (user, database) => {
  return true;
};

const updateCollectionsState = (setCollections) => {
  axios
    .get(url)
    .then((response) => {
      setCollections(response.data.collections);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default AddUser;
