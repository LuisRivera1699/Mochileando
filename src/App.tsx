import React from "react";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import UserGuide from "./views/UserGuide";
import Signup from "./views/Signup";
import RecoveryPassword from "./views/RecoveryPassword";
import Config from "./views/Config";

const App = () => (
    <AuthContext>
        <Router>
            <Switch>
                <Route exact path="/guia-de-usuario">
                    <UserGuide />
                </Route>
                <Route exact path="/recuperar-contraseña">
                    <RecoveryPassword />
                </Route>
                <Route exact path="/perfil">
                    <p>Perfil</p>
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/updateData">
                    <Config />
                </Route>
                <Route exact path="/signup">
                    <Signup />
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
