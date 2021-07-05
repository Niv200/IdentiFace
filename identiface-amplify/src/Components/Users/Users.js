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
            <h3>Upload user's image:</h3>
            <p className="paragraph"> Type the user's first and last name and choose a .png file to upload.</p>
            <h3>Add user to collection:</h3>
            <p className="paragraph"> Add a person to certain collection and update DynamoDB</p>
            <h3>List and remove users in database:</h3>
            <p className="paragraph"> Remove user from DynamoDB and corresponding collection</p>
            <h3>Delete user from s3:</h3>
            <p className="paragraph">
              This should only be used to delete a person from the system.
              <br /> If you want to change the user collection then delete him from DB <br /> and upload him into a new collection.
            </p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
