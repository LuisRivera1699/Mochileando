import React, {useEffect, useState} from "react";
import {app} from "../firebaseConfig";

export const Auth = React.createContext()

export const AuthContext = ({children}) => {
    const [usuario, setUsuario] = useState(null)
    const [showChild, setShowChild] = useState(false)

    useEffect(
        () => {
            app.auth().onAuthStateChanged(
                function(user) {
                    setUsuario(user);
                    setShowChild(true);
                }
            )
        }
    )

    if (!showChild){
        return <p>Cargando</p>;
    } else {
        return (
            <Auth.Provider
            value={{usuario}}
            >
                {children}
            </Auth.Provider>
        )
    }

}