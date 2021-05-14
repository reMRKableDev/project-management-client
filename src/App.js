import React, { useState } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import ProjectList from "./components/Projects/ProjectList";
import ProjectDetails from "./components/Projects/ProjectDetails";
import TaskDetails from "./components/Tasks/TaskDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import AuthService from "./services/AuthService";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  // CHECK IF USER IS LOGGED IN BY CONFIRMING WITH THE BACKEND
  const fetchUserFromBE = () => {
    if (loggedInUser === null) {
      service
        .isLoggedIn()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  // SET THE GLOBAL APP STATE WITH THE LOGGED IN USER
  const setTheUserToGlobalState = (userObj) => setLoggedInUser(userObj);

  // CALL THE AUTHENTICATION CHECK EVERY TIME THE APP LOADS
  fetchUserFromBE();

  return loggedInUser ? (
    <div className="App">
      <Navbar userInSession={loggedInUser} setUser={setTheUserToGlobalState} />
      <Switch>
        <Route exact path="/login" render={() => <Redirect to="/projects" />} />
        <ProtectedRoute
          user={loggedInUser}
          exact
          path="/projects"
          component={ProjectList}
        />
        <ProtectedRoute
          user={loggedInUser}
          exact
          path="/projects/:id"
          component={ProjectDetails}
        />
      </Switch>
    </div>
  ) : (
    <div className="App">
      <Navbar userInSession={loggedInUser} setUser={setTheUserToGlobalState} />

      <Switch>
        <ProtectedRoute
          user={loggedInUser}
          path="/projects/:projectId/tasks/:taskId"
          component={TaskDetails}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/projects/:id"
          component={ProjectDetails}
        />
        <ProtectedRoute
          user={loggedInUser}
          path="/projects"
          component={ProjectList}
        />
        <Route
          path="/signup"
          render={() => <Signup setUser={setTheUserToGlobalState} />}
        />
        <Route
          path="/login"
          render={() => <Login setUser={setTheUserToGlobalState} />}
        />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
