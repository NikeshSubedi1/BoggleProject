import React from "react";
import BoggleApp from "./Components/BoogleApp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Boggle" component={BoggleApp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
