import React from 'react';
import './App.css';
import { AuthContext } from './context/AuthContext';
import Login from "./views/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard"

const App = () => (
    <AuthContext>
      <Router>
        <Switch>
          <Route path="/perfil">
            <p>Perfil</p>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Dashboard/>
          </Route>
          <Route path="*">
            <p>ERROR</p>
          </Route>
        </Switch>
      </Router>
    </AuthContext>
)

export default App;
