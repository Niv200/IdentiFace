import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import UploadImage from "./UploadImage";
import AddUser from "./AddUser";
import ListUsers from "./ListUsers";
import DeleteUsers from "./DeleteUsers";

export default function Users() {
  let match = useRouteMatch();

  return (
    <div>
      <Router>
        <div>
          <Link to={`${match.url}`}>Users panel</Link>
        </div>
        <div>
          <Link to={`${match.url}/uploadimage`}>Upload user's image</Link>
        </div>
        <div>
          <Link to={`${match.url}/listusers`}>List and remove users in database</Link>
        </div>
        <div>
          <Link to={`${match.url}/adduser`}>Add user to collection</Link>
        </div>
        <div>
          <Link to={`${match.url}/deleteuser`}>Delete user from S3</Link>
        </div>

        <Switch>
          <Route path={`${match.path}/uploadimage`}>
            <h1>Upload</h1>
            <UploadImage />
          </Route>
          <Route path={`${match.path}/listusers`}>
            <h1>Users list:</h1>
            <ListUsers />
          </Route>
          <Route path={`${match.path}/adduser`}>
            <h1>Add user</h1>
            <AddUser />
          </Route>
          <Route path={`${match.path}/deleteuser`}>
            <DeleteUsers />
          </Route>
          <Route path={`${match.path}`}>
            <h1>Users panel</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
