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
        <ul className="navcol">
          <li className="nav-li-col">
            <Link to={`${match.url}`}>Users panel</Link>
          </li>
          <li className="nav-li-col">
            <Link to={`${match.url}/uploadimage`}>Upload user's image</Link>
          </li>
          <li className="nav-li-col">
            <Link to={`${match.url}/listusers`}>List and remove users in database</Link>
          </li>
          <li className="nav-li-col">
            <Link to={`${match.url}/adduser`}>Add user to collection</Link>
          </li>
          <li className="nav-li-col">
            <Link to={`${match.url}/deleteuser`}>Delete user from S3</Link>
          </li>
        </ul>

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
            <p className="paragraph">
              <h4>Upload user's image:</h4> Type the user's first and last name and choose a png file to upload.
              <br />
              <h4>List and remove users in database:</h4> Choose a person to remove from database and collection.
              <br />
              <h4>Add user to collection:</h4> Choose a collection to add a person from S3 into. <br />
              This will add them to DynamoDB and rekognition.
              <br />
              <h4>Delete user from s3:</h4> This should only be used to delete a person from the system.
              <br /> If you want to change the user collection then delete him from DB <br /> and upload him into a new collection.
            </p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
