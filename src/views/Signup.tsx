import { useHistory } from "react-router-dom";
import { app } from "../firebaseConfig";
import React, { useState } from "react";
import Header from "../components/Header";

const Signup = () => {
    const [error, seterror] = useState("");

    let history = useHistory();

    const handleSignUp = async (e: any) => {
        e.preventDefault();
        const {
            usuario,
            clave,
            nombre,
            apellido,
            sexo,
            nacimiento,
        } = e.target.elements;


        await app
            .auth()
            .createUserWithEmailAndPassword(usuario.value, clave.value)
            .then((result: any) => {
                console.log(result);
                app.firestore().collection("users").doc(result?.user?.uid).set({
                    nombre: nombre.value,
                    apellido: apellido.value,
                    sexo: sexo.value,
                    feNacimiento: nacimiento.value,
                });
                history.push("/");
            })
            .catch((error: any) => {
                seterror(error.message);
            });
    };

    const renderLogIn = () => {
        history.push("/login");
    }

    return (
        <div className="grid-welcome-page-container">
            <Header
                state="SignUp"
                history={history} />
            <div className="grid-body-registrar">
                <div className="reg-phrase">
                    <h3>Viaja con Nosotros</h3>
                </div>
                <form className="reg-form-container" onSubmit={handleSignUp}>
                    <div className="nombre-reg-c">
                        <input
                            className="nombre-reg"
                            type="text"
                            name="nombre"
                            placeholder="Nombre(s)" />
                    </div>
                    <div className="apellido-reg-c">
                        <input
                            className="apellido-reg"
                            type="text"
                            name="apellido"
                            placeholder="Apellido(s)" /><br />
                    </div>
                    <div className="email-reg-c">
                        <input
                            className="email-reg"
                            type="text"
                            name="usuario"
                            placeholder="Ingresa tu email" />
                    </div>
                    <div className="password-reg-c">
                        <input
                            className="password-reg"
                            type="password"
                            name="clave"
                            placeholder="Ingresa una clave" />
                    </div>
                    <div className="fechaNac-reg-c">
                        <label>Fecha de Nacimiento</label>
                    &nbsp;&nbsp;
                    <input
                            type="date"
                            name="nacimiento" />
                    </div>
                    <div className="genero-reg-c">
                        <label> G&eacute;nero</label>
                    &nbsp;&nbsp;
                    <select name="sexo">
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="registro-reg-c">
                        <input
                            className="registro-reg"
                            type="submit"
                            value="Registrarse" />
                    </div>
                    <div className="sicuenta-reg-c">
                        <p
                            className="sicuenta-reg"
                            onClick={() => renderLogIn()}>
                            Ya tengo una cuenta
                    </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
