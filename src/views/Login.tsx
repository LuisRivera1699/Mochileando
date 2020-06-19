import React, { useState, useContext, useEffect } from "react";
import {
    withRouter,
    useLocation,
} from "react-router"; /* Solo para logearnos con RRSS*/
/*import * as firebase from "firebase/app";*/ import { app } from "../firebaseConfig";
import Signup from "./Signup";
import { Auth } from "../context/AuthContext";
import Header from "../components/Header";

const Login = ({ history }: any) => {
    const location = useLocation();
    const [signup, setsignup] = useState(location.key);
    const { usuario } = useContext(Auth);
    const [error, seterror] = useState("");

    useEffect(() => {
        if (usuario) {
            history.push("/");
        }
    }, [history, usuario]);

    useEffect(() => {
        setsignup(location.pathname);
    }, [location.pathname]);

    const renderSignUp = (bool: any) => {
        location.pathname = bool;
        setsignup(location.pathname);
    };

    const correoClave = async (e: any) => {
        e.preventDefault();
        const { usuario, clave } = e.target.elements;

        await app
            .auth()
            .signInWithEmailAndPassword(usuario.value, clave.value)
            .then((result) => {
                console.log(result);
                history.push("/");
            })
            .catch((error) => {
                seterror(error.message);
            });
    };

    return (
        <div>
            {!signup ? (
                <div className="grid-welcome-page-container">
                    <Header state="LogIn" history={history} />
                    <div className="grid-body-login">
                        <div className="login-foto">
                            {/* <img src={require("../paisaje_login.png")} /> */}
                        </div>
                        <form
                            className="login-form-container"
                            onSubmit={correoClave}
                        >
                            <div className="login-form-title">
                                <p className="login-form-title-text">
                                    Iniciar Sesi&oacute;n
                                </p>
                            </div>
                            <div className="user-container">
                                <input
                                    className="user-input-field"
                                    type="text"
                                    name="usuario"
                                    placeholder="Ingresa tu email"
                                />
                            </div>
                            <div className="password-container">
                                <input
                                    className="password-input-field"
                                    type="password"
                                    name="clave"
                                    placeholder="Ingresa tu clave"
                                />
                            </div>
                            <div className="login-button-container">
                                <input
                                    className="login-button"
                                    type="submit"
                                    value="Ingresar"
                                />
                            </div>
                            <div className="line-container">
                                <hr className="line" />
                            </div>
                            <div className="facebook-button-container">
                                <button className="facebook-button">
                                    Ingresa con Facebook
                                </button>
                            </div>
                            <div className="google-button-container">
                                <button className="google-button">
                                    Ingresa con Google
                                </button>
                            </div>
                            {/*error? <p>{error}</p> : null*/}
                            {/*<button
                                onClick={() => renderSignUp(true)}>
                                Registrarse
                            </button>*/}
                        </form>
                    </div>
                </div>
            ) : (
                <div className="grid-welcome-page-container">
                    <Header state="SignUp" history={history} />
                    <Signup renderSignUp={renderSignUp} />
                </div>
            )}
        </div>
    );
};

export default withRouter(Login);
