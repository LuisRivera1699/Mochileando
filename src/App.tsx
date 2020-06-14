import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Register from "./pages/Register";

import { useUser } from "reactfire";

function App() {
    const user = useUser();

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Home} exact></Route>
                    <Route path="/login" exact>
                        {user ? <Redirect to="/" /> : <Login />}
                    </Route>
                    <Route path="/register" exact>
                        {user ? <Redirect to="/" /> : <Register />}
                    </Route>
                    <Route path="/" component={Error}></Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
