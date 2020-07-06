import React, { useState, useEffect, useRef, useContext } from "react";
import { app } from "../firebaseConfig";
import { Auth } from "../context/AuthContext";
import { Console } from "console";

interface Comentario {
    comentario: string;
    fecha: string;
    usuario: string;
}

const Travel = ({ titulo, descripcion, imagen, id, creador }: any) => {
    const [imageUrl, setImageUrl] = useState("");

    const textArea = useRef(null);
    const { usuario } = useContext(Auth);

    const [comments, setComments] = useState<any[]>([]);

    const fetchComments = async () => {
        const db = app.firestore();
        const comments_aw = await db
            .collection("travells")
            .doc(id)
            .collection("comentarios")
            .get();

        const comentsResp = comments_aw.docs.map((doc) => doc.data());

        comentsResp.forEach(async (com) => {
            const user = await com.usuario.get();
            setComments([
                ...comments,
                {
                    comentario: com?.comentario,
                    fecha: com?.fecha,
                    usuario: user?.data()?.nombre,
                },
            ]);
        });
    };

    useEffect(() => {
        getImage();
        fetchComments();
    }, []);

    const getImage = async () => {
        await app
            .storage()
            .ref()
            .child(imagen)
            .getDownloadURL()
            .then(function (url) {
                setImageUrl(url);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    return (
        <div className="travel-box">
            <div className="travel p-5 ">
                <div className="travel-info">
                    <div>
                        <h1>
                            <b>T&iacute;tulo: </b> {titulo}
                        </h1>
                    </div>
                    <div>
                        <p>
                            <b>Descripci&oacute;n: </b>
                            {descripcion}
                        </p>
                    </div>
                </div>
                <div className="travel-image">
                    <img className="image-trav" src={imageUrl} alt="" />
                </div>
            </div>

            <div className="p-5 text-left">
                <div>
                    <div className="text-lg">Ingresa un comentario:</div>
                    <textarea
                        ref={textArea}
                        className="mt-4 shadow appearance-none border rounded w-full p-2"
                        name="comment"
                        id=""
                        rows={3}
                    ></textarea>
                    <button
                        className="mt-5 block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={() => {
                            console.log(textArea.current);
                            console.log(id);
                            const db = app.firestore();
                            db.collection("travells")
                                .doc(id)
                                .collection("comentarios")
                                .add({
                                    comentario: "Este es un comentario",
                                    fecha: "02/19/19",
                                    usuario: db
                                        .collection("users")
                                        .doc(usuario?.uid),
                                });
                        }}
                    >
                        Comentar
                    </button>
                </div>
                <div className="mt-10">
                    <div className="flex">
                        <h4 className="font-bold">Nombre</h4>
                        <span className="ml-2">-</span>
                        <span className="ml-2">05/07/2020</span>
                    </div>
                    <p className="mt-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Doloremque ipsa molestiae dolorum dolore, eum quos autem
                        nihil eaque cumque impedit consectetur voluptatem
                        voluptates earum non et officia pariatur amet illum.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Travel;
