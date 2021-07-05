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
      <h1>Adding user into {collection}.</h1>
      <div className="paragraph">{getUsersButtons(users, collection, setUser)}</div>
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
      setUsers(list);
    })
    .catch((error) => {});
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
    .catch((error) => {});
};

export default AddUser;
