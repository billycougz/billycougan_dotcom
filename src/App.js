import React, { useState, useEffect } from "react";
import "./App.css";
import Warzone from "./warzone/Warzone";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./notes/Notes";
import Spotify from "./spotify/Spotify";

function App() {
  const [firstLineComplete, setFirstLineComplete] = useState(false);
  useEffect(() => {
    const div = document.getElementById("typewriter-text");
    // eslint-disable-next-line
    new Typewriter(div)
      .typeString("William Cougan")
      .pauseFor(1000)
      .start()
      .callFunction(() => {
        setFirstLineComplete(true);
        const div2 = document.getElementById("sub-text");
        // eslint-disable-next-line
        new Typewriter(div2).typeString("Software Engineer").start();
      });
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/warzone">
          <Warzone />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/spotify">
          <Spotify />
        </Route>
        <Route path="/">
          <div id="home-container">
            <div id="typewriter-text">
              {firstLineComplete && "William Cougan"}
            </div>
            <div id="sub-text" />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
