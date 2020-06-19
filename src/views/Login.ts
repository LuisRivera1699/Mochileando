import React, {useState, useContext, useEffect} from "react";
import {withRouter, useLocation} from "react-router";
/*import * as firebase from "firebase/app";*//* Solo para logearnos con RRSS*/
import {app} from "../firebaseConfig";
import Signup from "./Signup"
import {Auth} from "../context/AuthContext";
import Header from "../components/Header";

const Login = ({history}) => {
    const location = useLocation();
    const [signup, setsignup] = useState(location.signup);
    const {usuario} = useContext(Auth);
    const [error, seterror] = useState('');

    useEffect(
        () => {
            if (usuario) {
                history.push("/")
            }
        }, [history, usuario]
    );

    useEffect(
        () => {
            setsignup(location.signup)
        }, [location.signup]
    );

    const renderSignUp = (bool) => {
        location.signup = bool
        setsignup(location.signup)
    }

    const correoClave = async e => {
        e.preventDefault();
        const { usuario, clave } = e.target.elements
        
        await app
            .auth()
            .signInWithEmailAndPassword(usuario.value, clave.value)
            .then(result => {
                console.log(result);
                history.push("/");
            })
            .catch(error => {
                seterror(error.message)
            });
    };

    return (
        <div>
            {signup===false ? (
                <div class="grid-welcome-page-container">
                    <Header
                        state="LogIn"
                        history={history}/>
                    <div class="grid-body-login">
                        <div class="login-foto">
                            <img src={require('../paisaje_login.png')}/>
                        </div>
                        <form class="login-form-container" onSubmit={correoClave}>
                            <div class="login-form-title">
                                <p class="login-form-title-text">Iniciar Sesi&oacute;n</p>
                            </div>
                            <div class="user-container">
                                <input
                                    class="user-input-field"
                                    type="text"
                                    name="usuario"
                                    placeholder="Ingresa tu email"/>
                            </div>
                            <div class="password-container">
                                <input
                                    class="password-input-field"
                                    type="password"
                                    name="clave"
                                    placeholder="Ingresa tu clave"/>
                            </div>
                            <div class="login-button-container">
                                <input
                                    class="login-button"
                                    type="submit"
                                    value="Ingresar"/>
                            </div>
                            <div class="line-container">
                                <hr class="line"/>
                            </div>
                            <div class="facebook-button-container">
                                <button class="facebook-button">Ingresa con Facebook</button>
                            </div>
                            <div class="google-button-container">
                                <button class="google-button">Ingresa con Google</button>
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
                    <div class="grid-welcome-page-container">
                        <Header
                            state="SignUp"
                            history={history}/>
                        <Signup
                            setsignup={setsignup}
                            renderSignUp={renderSignUp}/>
                    </div>
                )
            }
        </div>
    )
}

export default withRouter(Login);