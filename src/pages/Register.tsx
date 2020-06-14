import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";

import "firebase/auth";
import { useFirebaseApp } from "reactfire";

interface Props {}

type FormData = {
    email: string;
    password: string;
};

export default function Register({}: Props): ReactElement {
    const { register, handleSubmit, errors } = useForm<FormData>();

    const firebase = useFirebaseApp();

    const onSubmit = handleSubmit(async ({ email, password }) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
    });

    console.log(errors);

    return (
        <div className="w-full max-w-xs" onSubmit={onSubmit}>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        ref={register({ required: true })}
                        name="email"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.email ? "border-red-500" : ""
                        }`}
                        type="text"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs italic">
                            Campo requerido
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Contraseña
                    </label>
                    <input
                        ref={register({ required: true })}
                        name="password"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.password ? "border-red-500" : ""
                        }`}
                        type="password"
                        placeholder="******************"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs italic">
                            Campo requerido
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
}
