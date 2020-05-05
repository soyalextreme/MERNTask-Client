import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Login from "./components/auth/Login";
import NewAcount from "./components/auth/NewAcount";
import Proyects from "./components/proyects/Proyects";

import ProjectState from "./context/projects/projectState";
import TareaState from "./context/task/taskState";
import AlertState from "./context/alert/alertState";
import AuthState from "./context/auth/authState";
import { tokenAuth } from "./config/tokenAuth";
import PrivateRoute from "./components/rutes/PrivateRoute";

// revisar si tenemos un token

const token = localStorage.getItem("token");

if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProjectState>
      <TareaState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NewAcount} />
                <PrivateRoute
                  exact
                  path="/mis-proyectos"
                  component={Proyects}
                />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TareaState>
    </ProjectState>
  );
}

export default App;
