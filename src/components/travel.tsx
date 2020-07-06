import React, { useState, useEffect, useRef, useContext } from "react";
import { app } from "../firebaseConfig";
import { Auth } from "../context/AuthContext";
import firebase from "firebase";

const Travel = ({ titulo, descripcion, imagen, id, creador }: any) => {
    const [imageUrl, setImageUrl] = useState("");

    const textArea = useRef<HTMLTextAreaElement>(null);
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

        setComments(comentsResp);
    };

    useEffect(() => {
        getImage();
        fetchComments();
    }, []);

    const performLike = async () => {
        const comment = app.firestore().collection("travells").doc(id)
        const increment = firebase.firestore.FieldValue.increment(1)

        comment.update({
            likesCounter: increment
        }).then(() => {
            console.log("success")
        }).catch(error => {
            console.log(error.message)
        })
    }

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

    const getCurrentDate = () => {
        const currentdate = new Date();
        return (
            currentdate.getDate() +
            "/" +
            (currentdate.getMonth() + 1) +
            "/" +
            currentdate.getFullYear() +
            " " +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds()
        );
    };

    const setComment = async () => {
        const db = app.firestore();
        const currentUserProm = await db
            .collection("users")
            .doc(usuario?.uid)
            .get();

        const currentUser = currentUserProm.data();

        db.collection("travells")
            .doc(id)
            .collection("comentarios")
            .add({
                comentario: textArea?.current?.value,
                fecha: getCurrentDate(),
                usuario: `${currentUser?.nombre || ""} ${
                    currentUser?.apellido || ""
                    }`,
            });
        fetchComments();
        performLike();
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
                            setComment();
                        }}
                    >
                        Comentar
                    </button>
                </div>

                {comments
                    .sort((a: any, b: any) => {
                        // @ts-ignore
                        return new Date(a.fecha) - new Date(b.fecha);
                    })
                    .map((comment) => (
                        <div className="mt-10">
                            <div className="flex">
                                <h4 className="font-bold">
                                    {comment?.usuario}
                                </h4>
                                <span className="ml-2">-</span>
                                <span className="ml-2">{comment?.fecha}</span>
                            </div>
                            <p className="mt-4">{comment?.comentario}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Travel;
