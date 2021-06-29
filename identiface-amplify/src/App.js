import logo from "./logo.svg";
import "./App.css";
import CreateCollection from "./Components/Collection/CreateCollection";
import Routes from "./Components/Router/Routes";
import React from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import Amplify from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config);

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Routes />
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					<AmplifySignOut />
				</div>
			</header>
		</div>
	);
}

export default withAuthenticator(App);
