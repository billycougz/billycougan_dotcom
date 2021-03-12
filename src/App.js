import React, { useState, useEffect } from "react";
import "./App.css";
import Warzone from "./warzone/Warzone";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./notes/Notes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/warzone">
          <Warzone />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/">Under Constuction</Route>
      </Switch>
    </Router>
  );
}

export default App;
