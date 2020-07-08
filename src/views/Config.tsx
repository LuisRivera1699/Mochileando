import React, {
    ReactElement,
    // useRef,
    useContext,
    useEffect,
    useState,
} from "react";
import { useHistory } from "react-router-dom";

import { app } from "../firebaseConfig";
import { Auth } from "../context/AuthContext";

import Header from "../components/Header";

interface Datos {
    nombre?: string;
    apellido?: string;
    feNacimiento?:string;
    sexo?:string;
}

export default function Config(): ReactElement {
    let history = useHistory();
    const { usuario } = useContext(Auth);
    const [userData,setUserData]=useState<Datos>()
    const date = new Date(Date.now()).getFullYear()

    useEffect(() => {
        if (usuario == null) {
            history.push('/')
        } else {
            const UserData = async () => {
                const Data = (
                    await app.firestore()
                    .collection("users")
                    .doc(usuario.uid)
                    .get()
                ).data();
                setUserData(Data);
            }
            UserData();
            //history.push("/updateData");
        }
    }, [history, usuario]);

    // const emailInput = useRef(null);

    const handleSignUp = async (e: any) => {
        e.preventDefault();
        const {
            email,
            nombre,
            apellido,
            sexo,
            nacimiento,
        } = e.target.elements;

        email.style.borderColor = "";
        email.style.borderWidth = "0px";
        nombre.style.borderColor = "";
        nombre.style.borderWidth = "0px";
        apellido.style.borderColor = "";
        apellido.style.borderWidth = "0px";
        sexo.style.borderColor = "";
        sexo.style.borderWidth = "0px";
        nacimiento.style.borderColor = "";
        nacimiento.style.borderWidth = "0px";

        const fecnac = new Date(nacimiento.value).getFullYear()
        console.log(fecnac)
        console.log(date)

        if ((date - fecnac) < 14) {
            window.alert("No nos engañas pillin, tu eres menor a 14 años");
            return 0
        }

        await app.firestore().collection("users").doc(usuario!!.uid).set({
            nombre: nombre.value,
            apellido: apellido.value,
            sexo: sexo.value,
            feNacimiento: nacimiento.value,
            });

        
        
            usuario!!.updateEmail(email.value).then().catch(
                error => {
                    alert(error.message)
                }
            );

            alert("Sus datos fueron actualizados");
            history.push("/");
    };

    return (
        <div className="grid-home-page-traveller-container bg-gray-900" style={{ height: window.innerHeight }}>
            <div className="grid-side-bar">
                <Header history={history} state="authorized" height={window.innerHeight} />
            </div>
            <div className="grid-home-container">
                <div className="grid-body-registrar">
                <form className="reg-form-container bg-white" onSubmit={handleSignUp}>
                    <div className="reg-phrase font-bold">
                        <h3>Actualiza tus datos</h3>
                    </div>
                    <div className="nombre-reg-c">
                        <input
                            className="nombre-reg rounded py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="nombre"
                            placeholder="Nombre(s)"
                            defaultValue={userData?.nombre}
                            required />
                    </div>
                    <div className="apellido-reg-c">
                        <input
                            className="apellido-reg rounded py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="apellido"
                            placeholder="Apellido(s)"
                            defaultValue={userData?.apellido}
                            required /><br />
                    </div>
                    <div className="email-reg-c">
                        <input
                            className="email-reg rounded py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="email"
                            placeholder="Ingresa tu email"
                            defaultValue={usuario?.email||""}
                            required />
                    </div>
                    <div className="fechaNac-reg-c">
                        <label>Fecha de Nacimiento</label>
                        &nbsp;&nbsp;
                        <input
                            className="text-gray-600 bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"
                            type="date"
                            name="nacimiento"
                            defaultValue={userData?.feNacimiento}
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
                            value="Actualizar" />
                    </div>
                </form>
            </div>
            </div>
        </div>

    );
}