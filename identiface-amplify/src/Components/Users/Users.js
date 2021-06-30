import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import UploadImage from "./UploadImage";
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
					<Link to={`${match.url}/listusers`}>List users</Link>
				</div>
				<div>
					<Link to={`${match.url}/adduser`}>Add user to collection</Link>
				</div>
				<div>
					<Link to={`${match.url}/deleteuser`}>Delete user from collection</Link>
				</div>

				<Switch>
					<Route path={`${match.path}/uploadimage`}>
						<h1>Upload</h1>
						<UploadImage />
					</Route>
					<Route path={`${match.path}/listusers`}>
						<h1>List users</h1>
					</Route>
					<Route path={`${match.path}/adduser`}>
						<h1>Add user</h1>
					</Route>
					<Route path={`${match.path}/deleteuser`}>
						<h1>Delete user</h1>
					</Route>
					<Route path={`${match.path}`}>
						<h1>Users panel</h1>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}
