import React, { ReactElement, useEffect, useState } from "react";
import { app } from "../firebaseConfig";

import Header from "../components/Header";
import { useHistory } from "react-router-dom";

interface Faq {
    pregunta?: string;
    respuesta?: string;
}

interface EmergencyNumber {
    nombre?: string;
    numero?: string;
}

export default function UserGuide(): ReactElement {
    let history = useHistory();
    const [faqs, setFaqs] = useState<Faq[] | undefined>([]);
    const [emergencyNumbers, setEmergencyNumbers] = useState<
        EmergencyNumber[] | undefined
    >([]);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const db = app.firestore();

            const faqsData = (
                await db.collection("user-guide-col").doc("faqs").get()
            ).data();

            setFaqs(faqsData?.list);

            const emergencyNumbersData = (
                await db
                    .collection("user-guide-col")
                    .doc("emergency-numbers")
                    .get()
            ).data();

            setEmergencyNumbers(emergencyNumbersData?.list);

            setIsloading(false);
        };
        fetchContent();
    }, []);

    return (
        <div>
            <Header state="welcome-wo" history={history} />

            <div className="container mx-auto px-4 pt-4">
                <h1 className="text-3xl mb-3">Preguntas Frecuentes</h1>
                {isLoading && <div>Cargando ...</div>}
                {!isLoading &&
                    faqs?.map(({ pregunta, respuesta }, i) => (
                        <div className="mb-2" id={pregunta}>
                            <h2 className="text-xl font-bold">{pregunta}</h2>
                            <p className="p-2">{respuesta}</p>
                        </div>
                    ))}
                <h1 className="text-3xl mb-3">Números de emergencia</h1>
                {isLoading && <div>Cargando ...</div>}
                {!isLoading &&
                    emergencyNumbers?.map(({ nombre, numero }, i) => (
                        <div className="mb-2" id={nombre}>
                            <h2 className="text-xl font-bold">{nombre}</h2>
                            <p className="p-2">{numero}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
