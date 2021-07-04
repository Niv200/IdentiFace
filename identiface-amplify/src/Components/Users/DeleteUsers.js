import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listfacesinbucket";
const url2 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/deletefroms3";

function DeleteUsers() {
  const [users, setUsers] = useState(undefined);
  const [usersName, setUsersName] = useState(undefined);
  const [agree, setAgree] = useState(undefined);
  useEffect(() => {
    getUsers(setUsers);
  }, []);
  if (!agree) {
    return (
      <div>
        <div>User images should not be deleted!</div>
        <div>Instead, users should be deleted from database.</div>
        <div>Deleting user image will result in that person needed to be uploaded again.</div>
        <div>
          <button onClick={() => setAgree(true)}>click to accept</button>
        </div>
      </div>
    );
  }
  if (users) {
    return (
      <div>
        <h1>Delete user image from S3 bucket</h1>
        <div>{mapUsers(users, setUsers)}</div>
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

const mapUsers = (users, setUsers) => {
  return users.map((user) => {
    return (
      <div key={Math.floor(Math.random() * 100000000000)}>
        <button onClick={() => removeUser(user, setUsers, users)}>{user}</button>
      </div>
    );
  });
};

const removeUser = (user, setUsers, users) => {
  axios
    .post(url2, { name: user })
    .then((response) => {
      setUsers(users.filter((user2) => user2 !== user));
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
