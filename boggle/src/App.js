import React from "react";
import BoggleApp from "./Components/BoggleApp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import BoggleBar from "./Components/BoggleBar";
import BrowseChallenges from "./Components/BrowseChallenges";
import { AuthProvider } from "./AuthProvider";
import ChallengeBoggle from "./Components/ChallengeBoggle";

function App() {
  return (
    <AuthProvider>
      <Router>
        <BoggleBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Boggle" component={BoggleApp} />
          <Route path="/Browse" component={BrowseChallenges} />
          <Route
            path="/Challenge/:challengeId"
            render={(props) => <ChallengeBoggle {...props} />}
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
