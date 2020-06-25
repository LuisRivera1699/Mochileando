import React, { useContext, useEffect } from "react";
import {
    withRouter,
    // useLocation,
} from "react-router"; /* Solo para logearnos con RRSS*/
/*import * as firebase from "firebase/app";*/ import { app } from "../firebaseConfig";
// import Signup from "./Signup";
import { Auth } from "../context/AuthContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Login = ({ history }: any) => {
    //const location = useLocation();
    //const [signup, setsignup] = useState(location.key);
    const { usuario } = useContext(Auth);
    // const [error, seterror] = useState("");

    useEffect(() => {
        if (usuario) {
            history.push("/");
        }
    }, [history, usuario]);

    /*useEffect(() => {
        setsignup(location.pathname);
    }, [location.pathname]);*/

    const renderSignUp = () => {
        history.push("/signup");
    };

    const correoClave = async (e: any) => {
        e.preventDefault();
        const { usuario, clave } = e.target.elements;

        await app
            .auth()
            .signInWithEmailAndPassword(usuario.value, clave.value)
            .then((result: any) => {
                console.log(result);
                history.push("/");
            })
            .catch((error: any) => {
                // seterror(error.message);
            });
    };

    return (
        <div
            className="grid-welcome-page-container bg-gray-900"
            style={{ height: window.innerHeight }}
        >
            <Header state="LogIn" history={history} />
            <div className="grid-body-login">
                <div className="login-foto">
                    <img src={require("../paisaje_login.png")} alt="paisaje" />
                </div>
                <form
                    className="login-form-container bg-white"
                    onSubmit={correoClave}
                >
                    <div className="login-form-title">
                        <p className="login-form-title-text font-bold">
                            Iniciar Sesi&oacute;n
                        </p>
                        <div className="text-center text-sm">
                            <span>¿No tienes cuenta?</span>
                            &nbsp;
                            <span
                                className="font-semibold"
                                onClick={() => renderSignUp()}
                                style={{ cursor: "pointer" }}
                            >
                                Reg&iacute;strate
                            </span>
                        </div>
                    </div>
                    <div className="user-container">
                        <input
                            className="user-input-field rounded w-full py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="usuario"
                            placeholder="Ingresa tu email"
                            required
                        />
                    </div>
                    <div className="password-container">
                        <input
                            className="password-input-field rounded w-full py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            name="clave"
                            placeholder="Ingresa tu clave"
                            required
                        />
                        <div
                            className="text-gray-400"
                            style={{ cursor: "pointer" }}
                        >
                            <Link to="/recuperar-contraseña">
                                ¿Olvidaste tu contrase&ntilde;a?
                            </Link>
                        </div>
                    </div>
                    <div className="login-button-container">
                        <input
                            className="login-button rounded py-2 px-3"
                            type="submit"
                            value="Ingresar"
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <div className="line-container">
                        <hr className="line" />
                    </div>
                    <div className="facebook-button-container">
                        <button className="facebook-button bg-blue-600 text-white py-2 px-3 rounded">
                            Ingresa con Facebook
                        </button>
                    </div>
                    <div className="google-button-container">
                        <button className="google-button bg-red-600 text-white py-2 px-3 rounded">
                            Ingresa con Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Login);
