import {withRouter} from "react-router"
import {app} from "../firebaseConfig"
import React, { useState } from "react"

const Signup = ({renderSignUp, history}) => {
    const [error, seterror] = useState('')
    
    const handleSignUp = async e => {
        e.preventDefault();
        const {usuario, clave, nombre, apellido, sexo, nacimiento} = e.target.elements;

        await app
            .auth()
            .createUserWithEmailAndPassword(usuario.value, clave.value)
            .then(result => {
                console.log(result);
                app.firestore().collection('users').doc(result.user.uid).set({
                    nombre: nombre.value,
                    apellido: apellido.value,
                    sexo: sexo.value,
                    feNacimiento: nacimiento.value
                });
                history.push("/")
            })
            .catch(
                error => {
                    seterror(error.message);
                }
            );

    };

    return (
        <div>
            <form onSubmit={handleSignUp}>
                <h1>Registro</h1>
                {error? <p>Error</p> : null}
                <input
                    type="text"
                    name="usuario"
                    placeholder="Ingresa tu email"/>
                <input
                    type="password"
                    name="clave"
                    placeholder="Ingresa una clave"/><br/>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Ingresa tu(s) nombre(s)"/>
                <input
                    type="text"
                    name="apellido"
                    placeholder="Ingresa tu(s) apellido(s)"/><br/>
                <label>Selecciona tu g&eacute;nero</label>
                <select name="sexo">
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select><br/>
                <label>Selecciona tu fecha de nacimiento</label>
                <input
                    type="date"
                    name="nacimiento"
                    /><br/>
                <input
                    type="submit"
                    value="Registrarse"/>
                <button
                    onClick={() => renderSignUp(false)}>
                    Ya tengo una cuenta
                </button>
            </form>
        </div>
    );

};

export default withRouter(Signup);