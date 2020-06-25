import { useHistory } from "react-router-dom";
import { app } from "../firebaseConfig";
import React, { useState } from "react";
import Header from "../components/Header";
import "firebase/auth"

const Signup = () => {
    // const [error, seterror] = useState("");
    const [usedmailerror, setusedmailerror] = useState(false)
    const [weakpassworderror, setweakpassworderror] = useState(false)

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

        usuario.style.borderColor = "";
        usuario.style.borderWidth = "0px";
        clave.style.borderColor = "";
        clave.style.borderWidth = "0px";
        nombre.style.borderColor = "";
        nombre.style.borderWidth = "0px";
        apellido.style.borderColor = "";
        apellido.style.borderWidth = "0px";
        sexo.style.borderColor = "";
        sexo.style.borderWidth = "0px";
        nacimiento.style.borderColor = "";
        nacimiento.style.borderWidth = "0px";


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
                switch (error.code) {
                    case 'auth/weak-password':
                        clave.parentElement.style.height = "53px";
                        clave.style.borderColor = "red";
                        clave.style.borderWidth = "1px";
                        setweakpassworderror(true)
                        console.log(clave.parent)
                        break;
                    case 'auth/email-already-in-use':
                        usuario.parentElement.style.height = "53px";
                        usuario.style.borderColor = "red";
                        usuario.style.borderWidth = "1px";
                        setusedmailerror(true)
                        break;
                }
            });
    };

    const renderLogIn = () => {
        history.push("/login");
    }

    return (
        <div className="grid-welcome-page-container bg-gray-900" style={{ height: window.innerHeight }}>
            <Header state="SignUp" history={history} />
            <div className="grid-body-registrar">
                <form className="reg-form-container bg-white" onSubmit={handleSignUp}>
                    <div className="reg-phrase font-bold">
                        <h3>Viaja con Nosotros</h3>
                    </div>
                    <div className="nombre-reg-c">
                        <input
                            className="nombre-reg rounded py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="nombre"
                            placeholder="Nombre(s)"
                            required />
                    </div>
                    <div className="apellido-reg-c">
                        <input
                            className="apellido-reg rounded py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="apellido"
                            placeholder="Apellido(s)"
                            required /><br />
                    </div>
                    <div className="email-reg-c">
                        <input
                            className="email-reg rounded py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="usuario"
                            placeholder="Ingresa tu email"
                            required />
                        {usedmailerror ? <small style={{ position: "relative", top: "-7px" }}>Correo no disponible.</small> : null}
                    </div>
                    <div className="password-reg-c">
                        <input
                            className="password-reg rounded py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            name="clave"
                            placeholder="Ingresa una clave"
                            required />
                        {weakpassworderror ? <small style={{ position: "relative", top: "-7px" }}>Su clave es muy d&eacute;bil, intente con otra.</small> : null}
                    </div>
                    <div className="fechaNac-reg-c">
                        <label>Fecha de Nacimiento</label>
                        &nbsp;&nbsp;
                        <input
                            className="text-gray-600 bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"
                            type="date"
                            name="nacimiento"
                            required />
                    </div>
                    <div className="genero-reg-c">
                        <label> G&eacute;nero</label>
                        &nbsp;&nbsp;
                        <select name="sexo" className="appeareance-none text-gray-600 bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"
                            required>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="registro-reg-c">
                        <input
                            className="registro-reg rounded py-2 px3"
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
