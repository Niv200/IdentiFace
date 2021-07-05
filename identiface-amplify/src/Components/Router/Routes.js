import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Collections from "../Collection/Collections";
import Users from "../Users/Users";
import ComparePhoto from "../ComparePhoto";

export default function Routes() {
  return (
    <Router>
      <div>
        <ul className="nav">
          <li className="nav-li">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-li">
            <Link to="/collections">Collections</Link>
          </li>
          <li className="nav-li">
            <Link to="/users">Users</Link>
          </li>
          <li className="nav-li">
            <Link to="/compare">Compare photo</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/collections">
            <Collections />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/compare">
            <h1>Compare a photo:</h1>
            <ComparePhoto />
          </Route>
          <Route path="/">
            <div className="addbackground">
              <h1 className="listcollectionsh1">Home</h1>
              <p className="paragraph">A face recognition app made as a final project for Cyber4S course.</p>
              <p className="paragraph">
                This app allows creation of groups (collections) and adding user images into each collection.
                <br />
                Once an image is added into a collection, the user ID (result of AWS rekognition) will be stored
                <br />
                in DynamoDB table with the user name, group, image path (in S3), and image id.
              </p>
              <br />
              <h2>Testing an image</h2>
              <p className="paragraph">
                To test an image, upload it and choose a collection to compare it against (or choose all). <br />
                The result would be a JSON object (which would be returned as HTTP request depending on the use case) <br />
                that contains the result of the comparison, it will either show that a person is not matching anyone in the collection <br />
                or if a person matches someone from the collection it will return his name and how close they look alike.
              </p>
              <h2>The app utilize the following AWS services:</h2>
              <ul>
                <li>Lambda</li>
                <li>S3</li>
                <li>Rekognition</li>
                <li>API Gateway</li>
                <li>DynamoDB</li>
                <li>Cognito</li>
                <li>Amplify (auth, storage)</li>
              </ul>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
