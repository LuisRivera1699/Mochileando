import React, { ReactElement } from "react";
import { app } from "../firebaseConfig";

interface Props { }

export default function Header({ history, state, height }: any): ReactElement {
    const auxHistory = history || [];

    const renderLogIn = () => {
        auxHistory.push("/login");
    };
    const renderSignup = () => {
        auxHistory.push("/signup");
    };

    const renderWelcome = () => {
        auxHistory.push("/");
    };

    const renderUserGuide = () => {
        auxHistory.push("/guia-de-usuario");
    }
    const renderConfig = () => {
        auxHistory.push("/updateData")
    }

    const renderPerfil = () => {
        auxHistory.push("/perfil")
    }

    if (state === "welcome") {
        return (
            <div className="grid-header bg-green-500">
                <div className="header-title-container">
                    <div className="header-title-inside-container">
                        <h1
                            className="h1-header font-semibold"
                            onClick={() => renderWelcome()}
                        >
                            Mochilleando
                        </h1>
                    </div>
                </div>
                <div className="header-auth-container">
                    <div className="header-auth-inside-container">
                        <button
                            className="header-log-in-button py-2 px-4 rounded bg-white"
                            onClick={() => renderLogIn()}
                        >
                            Iniciar Sesi&oacute;n
                        </button>
                        <button
                            className="header-sign-up-button py-2 px-4 rounded bg-white"
                            onClick={() => renderSignup()}
                        >
                            Registrarse
                        </button>
                        <button
                            className="header-sign-up-button py-2 px-4 rounded bg-white"
                            onClick={() => renderUserGuide()}
                        >
                            Guia de Usuario
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        if (state === "LogIn") {
            return (
                <div className="grid-header bg-green-500">
                    <div className="header-title-container">
                        <div className="header-title-inside-container">
                            <h1
                                className="h1-header font-semibold"
                                onClick={() => renderWelcome()}
                            >
                                Mochilleando
                            </h1>
                        </div>
                    </div>
                    <div className="header-auth-container">
                        <div className="header-auth-inside-container">
                            <button
                                className="header-sign-up-button py-2 px-4 rounded bg-white"
                                onClick={() => renderSignup()}
                            >
                                Registrarse
                            </button>
                            <button
                                className="header-sign-up-button py-2 px-4 rounded bg-white"
                                onClick={() => renderUserGuide()}
                            >
                                Guia de Usuario
                        </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            if (state === "SignUp") {
                return (
                    <div className="grid-header bg-green-500">
                        <div className="header-title-container">
                            <div className="header-title-inside-container">
                                <h1
                                    className="h1-header font-semibold"
                                    onClick={() => renderWelcome()}
                                >
                                    Mochilleando
                                </h1>
                            </div>
                        </div>
                        <div className="header-auth-container">
                            <div className="header-auth-inside-container">
                                <button
                                    className="header-log-in-button py-2 px-4 rounded bg-white"
                                    onClick={() => renderLogIn()}
                                >
                                    Iniciar Sesi&oacute;n
                                </button>
                                <button
                                    className="header-sign-up-button py-2 px-4 rounded bg-white"
                                    onClick={() => renderUserGuide()}
                                >
                                    Guia de Usuario
                        </button>
                            </div>
                        </div>
                    </div>
                );
            } else {
                if (state === "welcome-wo") {
                    return (
                        <div className="grid-header bg-green-500">
                            <div className="header-title-container">
                                <div className="header-title-inside-container">
                                    <h1
                                        className="h1-header font-semibold"
                                        onClick={() => renderWelcome()}
                                    >
                                        Mochilleando
                                    </h1>
                                </div>
                            </div>
                            <div className="header-auth-container">
                                <div className="header-auth-inside-container">
                                    {/*<button
                                        className="header-log-in-button py-2 px-4 rounded bg-white"
                                        onClick={() => renderLogIn()}
                                    >
                                        Iniciar Sesi&oacute;n
                                    </button>*/}
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="flex flex-col bg-green-500" style={{ height: height, position: "fixed" }}>
                            <div className="text-center px-6 py-6 my-6">
                                <h1>Mochilleando</h1>
                            </div>
                            <div className="text-center px-6 py-6 ">
                                <button className="bg-transparent font-semibold 
                                    hover:text-white py-2 px-4  
                                    rounded" style={{ width: 200, cursor: "pointer" }}
                                    onClick={()=>renderPerfil()}
                                >Perfil</button>
                            </div>
                            <div className="text-center px-6 py-6 ">
                                <button className="bg-transparent font-semibold 
                                    hover:text-white py-2 px-4  
                                    rounded" style={{ width: 200, cursor: "pointer" }}
                                >Seguidores</button>
                            </div>
                            <div className="text-center px-6 py-6 ">
                                <button className="bg-transparent font-semibold 
                                    hover:text-white py-2 px-4 
                                    rounded" style={{ width: 200, cursor: "pointer" }}
                                >Seguidos</button>
                            </div>
                            <div className="text-center px-6 py-6 ">
                                <button className="bg-transparent font-semibold 
                                    hover:text-white py-2 px-4 
                                    rounded" style={{ width: 200, cursor: "pointer" }}
                                    onClick={()=>renderConfig()}
                                >Configuracion</button>
                            </div>
                            <div className="text-center px-6 py-6 my-12">
                                <button className="bg-transparent font-semibold 
                                    hover:text-white  
                                    rounded" style={{ width: 200, cursor: "pointer" }}
                                    onClick={() => app.auth().signOut()}
                                >Cerrar Sesion</button>
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}
