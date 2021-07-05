import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/listdynamo";
const url2 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/deletefromdatabase";
const url3 = "https://5xsgteuu4g.execute-api.eu-central-1.amazonaws.com/stage_1/identiface-api/deletefromcollection";

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
      <p className="paragraph">Click on the button to show more info</p>
      <div className="paragraph">{info}</div>
      <div>{displayUsers(users, setInfo, setUsers, users)}</div>
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
const displayUsers = (data, setInfo, setUsers, users) => {
  return data.map((user) => {
    return mapUser(user, setInfo, setUsers, users);
  });
};
const mapUser = (userData, setInfo, setUsers, users) => {
  return (
    <button key={Math.floor(Math.random() * 100000000000)} onClick={() => setInfo(showUser(userData, setInfo, setUsers, users))}>
      {userData.name}
    </button>
  );
};

const showUser = (userData, setInfo, setUsers, users) => {
  return (
    <div>
      <div>id: {userData.id}</div>
      <div>imageId: {userData.imageId}</div>
      <div>file: {userData.file}</div>
      <div>collection: {userData.collection}</div>
      <div>
        <button onClick={() => deleteUser(userData.id, setInfo, setUsers, userData, users)}>delete</button>
      </div>
    </div>
  );
};

const deleteUser = (userId, setInfo, setUsers, userData, users) => {
  setInfo("Deleting user...");
  const req = { userId: userId };
  axios.post(url2, req).then(
    (response) => {
      if (response.data.success) {
        deleteFromCollection(userData.collection, userData.id);
        setUsers(users.filter((user) => user !== userData));
        setInfo("User deleted");
      }
    },
    (error) => {
      setInfo("Error deleting user");
    }
  );
};

const deleteFromCollection = (collectionName, id) => {
  let req = {
    collectionName: collectionName,
    IDs: [id],
  };

  axios.post(url3, req).then(
    (response) => {},
    (error) => {}
  );
};
export default ListUsers;
