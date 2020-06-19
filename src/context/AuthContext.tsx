import React, { useEffect, useState } from "react";
import { app } from "../firebaseConfig";

type contextProps = {
    usuario: firebase.User | undefined | null;
};

export const Auth = React.createContext<Partial<contextProps>>({});

export const AuthContext = ({ children }: any) => {
    const [usuario, setUsuario] = useState<firebase.User | null>();
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        app.auth().onAuthStateChanged(function (user) {
            setUsuario(user);
            setShowChild(true);
        });
    });

    if (!showChild) {
        return <p>Cargando</p>;
    } else {
        return <Auth.Provider value={{ usuario }}>{children}</Auth.Provider>;
    }
};
