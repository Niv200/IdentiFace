import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listdynamo";

function ListUsers() {
  const [users, setUsers] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  useEffect(() => {
    getUsers(setUsers);
  }, []);
  if (!users) {
    return (
      <div>
        <h1>Loading users...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Listing all users in database:</h1>
      <p>Click on the button to show more info</p>
      <div>{info}</div>
      <div>{displayUsers(users, setInfo)}</div>
      {info && <button onClick={() => setInfo(undefined)}>clear</button>}
    </div>
  );
}

const getUsers = (setUsers) => {
  axios
    .get(url)
    .then((response) => {
      setUsers(response.data.data.Items);
    })
    .catch((error) => {
      console.log(error);
    });
};
/**collection: "Managers"
file: "public/Niv-Mizrahi.png"
id: "33a4b7d8-ae30-428d-b3fb-30220f6cce98"
imageId: "b7957307-b943-3d70-b00a-defcb8ee24cb"
name: "Niv Mizrahi"
 */
const displayUsers = (data, setInfo) => {
  return data.map((user) => {
    return mapUser(user, setInfo);
  });
};
const mapUser = (userData, setInfo) => {
  return (
    <button key={Math.floor(Math.random() * 100000000000)} onClick={() => setInfo(showUser(userData))}>
      {userData.name}
    </button>
  );
};

const showUser = (userData) => {
  return (
    <div>
      <div>id: {userData.id}</div>
      <div>imageId: {userData.imageId}</div>
      <div>file: {userData.file}</div>
      <div>collection: {userData.collection}</div>
    </div>
  );
};
export default ListUsers;
