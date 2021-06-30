import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Collections from "../Collection/Collections";
import Users from "../Users/Users";

export default function Routes() {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/collections">Collections</Link>
					</li>
					<li>
						<Link to="/users">Users</Link>
					</li>
				</ul>

				<Switch>
					<Route path="/collections">
						<h1>Collections</h1>
						<Collections />
					</Route>
					<Route path="/users">
						<h1>Users</h1>
						<Users />
					</Route>
					<Route path="/">
						<h1>home</h1>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
