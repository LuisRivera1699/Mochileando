import React, {
    ReactElement,
    useRef,
    useContext,
    useEffect,
    useState,
} from "react";
import { app } from "../firebaseConfig";

import Header from "../components/Header";
import { useHistory } from "react-router-dom";
import { Auth } from "../context/AuthContext";

interface Datos {
    nombre?: string;
    apellido?: string;
    feNacimiento?:string;
    sexo?:string;
}

export default function Perfil(): ReactElement {
    let history = useHistory();
    const { usuario } = useContext(Auth);
    const [userData,setUserData]=useState<Datos>()
    const date = new Date(Date.now()).getFullYear()

    useEffect(() => {
        if (usuario == null) {
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
        }

    }, [history, usuario]);

    return(
        <div className="grid-home-page-traveller-container bg-gray-900" style={{ height: window.innerHeight}}>
            <div className="grid-side-bar">
                <Header history={history} state="authorized" height={window.innerHeight} />
            </div>
            <div className="perfil">
                <p className="perfilnombre">{userData?.nombre} {userData?.apellido}</p>
                <p className="perfildatos">Sexo: {userData?.sexo}</p>
                <p className="perfildatos">Fecha de Nacimiento: {userData?.feNacimiento}</p>
            </div>
        </div>
    );
}