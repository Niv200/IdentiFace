import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listfacesinbucket";
const url2 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/deletefroms3";

function DeleteUsers() {
  const [users, setUsers] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [agree, setAgree] = useState(undefined);
  useEffect(() => {
    getUsers(setUsers);
  }, []);
  if (!agree) {
    return (
      <div className="paragraph">
        <h1>Delete user image from S3</h1>
        <h3>User images should not be deleted!</h3>
        <p className="paragraph">Instead, users should be deleted from database.</p>
        <p className="paragraph">Deleting user image will result in that person's image needed to be uploaded again.</p>
        <div>
          <button onClick={() => setAgree(true)}>click to accept</button>
        </div>
      </div>
    );
  }
  if (userName) {
    return (
      <div>
        <h3>You are about to delete {userName} from S3.</h3>
        <p className="paragraph">please confirm deletion.</p>
        <button
          onClick={() => {
            removeUser(userName, setUsers, users, setUserName);
          }}
        >
          delete
        </button>
      </div>
    );
  }
  if (users) {
    return (
      <div>
        <h1>Delete user image from S3 bucket</h1>
        <div>{mapUsers(users, setUsers, setUserName)}</div>
      </div>
    );
  }
  return (
    <div>
      <h1>Delete user image from S3 bucket</h1>
      <h1>Loading users...</h1>
    </div>
  );
}

const mapUsers = (users, setUsers, setUserName) => {
  return users.map((user) => {
    return (
      <div key={Math.floor(Math.random() * 100000000000)}>
        <button onClick={() => setUserName(user)}>{user}</button>
      </div>
    );
  });
};

const removeUser = (user, setUsers, users, setUserName) => {
  axios
    .post(url2, { name: user })
    .then((response) => {
      setUsers(users.filter((user2) => user2 !== user));
      setUserName(undefined);
    })
    .catch((error) => {});
};

const getUsers = (setUsers) => {
  axios
    .get(url)
    .then((response) => {
      let list = response.data.images.map((userPath) => {
        return userPath.Key.replace("public/", "").split(".")[0];
      });
      setUsers(list);
    })
    .catch((error) => {});
};

export default DeleteUsers;
