import React, { useState, useEffect } from "react";

function DeleteUsers() {
  const [users, setUsers] = useState(undefined);
  useEffect(() => {
    setUsers(getUsers());
  }, []);
  return <div></div>;
}

const getUsers = () => {
  return undefined;
};
export default DeleteUsers;
