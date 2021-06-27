import logo from "./logo.svg";
import "./App.css";
import UploadImage from "./Components/Buckets/UploadImage";
import React from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import Amplify from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config);

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<UploadImage />
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<div>
					<AmplifySignOut />
				</div>
			</header>
		</div>
	);
}

export default withAuthenticator(App);
