import React, { ReactElement } from "react";

import { useFirebaseApp, useUser } from "reactfire";

interface Props {}

type User = {
    email: string;
};

export default function Home({}: Props): ReactElement {
    const user = useUser<User | null>();
    const firebase = useFirebaseApp();

    console.log("user----->", user);

    return (
        <div>
            <h1>{user?.email}</h1>
            <h1>Home</h1>
            <button
                onClick={async () => {
                    await firebase.auth().signOut();
                }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
}
