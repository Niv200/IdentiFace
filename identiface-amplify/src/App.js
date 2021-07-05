import "./App.css";
import Routes from "./Components/Router/Routes";
import React from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import Amplify from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <header className="App-header addbackground">
        <Routes />
        <div>
          <AmplifySignOut />
        </div>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
