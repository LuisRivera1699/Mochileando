import React, {
    ReactElement,
    useRef,
    useContext,
    useEffect,
    useState,
} from "react";
import { useHistory } from "react-router-dom";

import { app } from "../firebaseConfig";
import { Auth } from "../context/AuthContext";

import Header from "../components/Header";

export default function RecoveryPassword(): ReactElement {
    let history = useHistory();
    const { usuario } = useContext(Auth);
    const [error, seterror] = useState("");

    useEffect(() => {
        if (usuario) {
            history.push("/");
        }
    }, [history, usuario]);

    const emailInput = useRef(null);

    return (
        <div>
            <Header state="welcome-wo" history={history} />
            <div className="text-center mt-20">
                <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
                <p className="mt-10">
                    Ingresa tu email y recibirás un correo con los pasos para
                    recuperar tu contraseña
                </p>
                <input
                    className="mt-10 w-64 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    id="email"
                    placeholder="email"
                    ref={emailInput}
                />
                {error && (
                    <p className="mt-2 text-red-500 text-xs italic">{error}</p>
                )}
                <button
                    onClick={async () => {
                        const input: any = emailInput.current;

                        if (input.value) {
                            try {
                                await app
                                    .auth()
                                    .sendPasswordResetEmail(input.value);

                                history.push("/");
                            } catch (error) {
                                seterror(error?.message);
                            }
                        }
                    }}
                    className="mt-10 mx-auto block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    Enviar correo
                </button>
            </div>
        </div>
    );
}
