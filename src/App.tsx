import React from "react";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import UserGuide from "./views/UserGuide";

const App = () => (
    <AuthContext>
        <Router>
            <Switch>
                <Route path="/guia-de-usuario">
                    <UserGuide />
                </Route>
                <Route path="/perfil">
                    <p>Perfil</p>
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="*">
                    <p>ERROR</p>
                </Route>
            </Switch>
        </Router>
    </AuthContext>
);

export default App;
