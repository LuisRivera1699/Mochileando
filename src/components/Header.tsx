import React, { ReactElement } from "react";
import { app } from "../firebaseConfig";

interface Props {}

export default function Header({ history, state }: any): ReactElement {
    const auxHistory = history || [];

    const renderLogIn = () => {
        auxHistory.push({
            pathname: "/login",
            signup: false,
        });
    };
    const renderSignup = () => {
        auxHistory.push({
            pathname: "/login",
            signup: true,
        });
    };

    const renderWelcome = () => {
        auxHistory.push("/");
    };

    if (state === "welcome") {
        return (
            <div className="grid-header">
                <div className="header-title-container">
                    <div className="header-title-inside-container">
                        <h1
                            className="h1-header"
                            onClick={() => renderWelcome()}
                        >
                            Mochilleando
                        </h1>
                    </div>
                </div>
                <div className="header-auth-container">
                    <div className="header-auth-inside-container">
                        <button
                            className="header-log-in-button"
                            onClick={() => renderLogIn()}
                        >
                            Iniciar Sesi&oacute;n
                        </button>
                        <button
                            className="header-sign-up-button"
                            onClick={() => renderSignup()}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        if (state === "LogIn") {
            return (
                <div className="grid-header">
                    <div className="header-title-container">
                        <div className="header-title-inside-container">
                            <h1
                                className="h1-header"
                                onClick={() => renderWelcome()}
                            >
                                Mochilleando
                            </h1>
                        </div>
                    </div>
                    <div className="header-auth-container">
                        <div className="header-auth-inside-container">
                            <button
                                className="header-sign-up-button"
                                onClick={() => renderSignup()}
                            >
                                Registrarse
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            if (state === "SignUp") {
                return (
                    <div className="grid-header">
                        <div className="header-title-container">
                            <div className="header-title-inside-container">
                                <h1
                                    className="h1-header"
                                    onClick={() => renderWelcome()}
                                >
                                    Mochilleando
                                </h1>
                            </div>
                        </div>
                        <div className="header-auth-container">
                            <div className="header-auth-inside-container">
                                <button
                                    className="header-log-in-button"
                                    onClick={() => renderLogIn()}
                                >
                                    Iniciar Sesi&oacute;n
                                </button>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="grid-header">
                        <div className="header-title-container">
                            <div className="header-title-inside-container">
                                <h1
                                    className="h1-header"
                                    onClick={() => renderWelcome()}
                                >
                                    Mochilleando
                                </h1>
                            </div>
                        </div>
                        <div className="header-auth-container">
                            <div className="header-auth-inside-container">
                                <button
                                    className="header-log-in-button"
                                    onClick={() => app.auth().signOut()}
                                >
                                    Cerrar Sesi&oacute;n
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}
