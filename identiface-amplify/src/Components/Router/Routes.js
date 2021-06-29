import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
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

function Topics() {
	let match = useRouteMatch();

	return (
		<div>
			<h2>Topics</h2>

			<ul>
				<li>
					<Link to={`${match.url}/components`}>Components</Link>
				</li>
				<li>
					<Link to={`${match.url}/props-v-state`}>Props v. State</Link>
				</li>
			</ul>

			{/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
			<Switch>
				<Route path={`${match.path}/:topicId`}>
					<Topic />
				</Route>
				<Route path={match.path}>
					<h3>Please select a topic.</h3>
				</Route>
			</Switch>
		</div>
	);
}

function Topic() {
	let { topicId } = useParams();
	return <h3>Requested topic ID: {topicId}</h3>;
}
