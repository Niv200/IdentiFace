import logo from "./logo.svg";
import "./App.css";
import UploadImage from "./Components/Buckets/UploadImage";
import React from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

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
					Amplify sign
				</div>
			</header>
		</div>
	);
}

export default withAuthenticator(App);
