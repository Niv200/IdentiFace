import React from "react";
import CollectionList from "./CollectionList";
import CreateCollection from "./CreateCollection";
import CollectionDelete from "./CollectionDelete";
import CollectionData from "./CollectionData";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

export default function Collections() {
  let match = useRouteMatch();
  return (
    <div>
      <Router>
        <ul className="navcol">
          <li className="nav-li-col">
            <Link to={`${match.url}`}>Show collections</Link>
          </li>
          <li className="nav-li-col">
            <Link to={`${match.url}/collectiondata`}>Show data</Link>
          </li>
          <li className="nav-li-col">
            <Link to={`${match.url}/newcollection`}>Add new collection</Link>
          </li>
          <li className="nav-li-col">
            <Link to={`${match.url}/deletecollection`}>Delete collection</Link>
          </li>
        </ul>
        <Switch>
          <Route path={`${match.path}/collectiondata`}>
            <CollectionData />
          </Route>
          <Route path={`${match.path}/newcollection`}>
            <CreateCollection />
          </Route>
          <Route path={`${match.path}/deletecollection`}>
            <CollectionDelete />
          </Route>
          <Route path={match.path}>
            <CollectionList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
