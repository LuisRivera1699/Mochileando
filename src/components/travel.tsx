import React, { useState, useEffect, useRef, useContext } from "react";
import { app } from "../firebaseConfig";
import { Auth } from "../context/AuthContext";
import firebase from "firebase";

import EditComment from './EditComment';

const Travel = ({ titulo, descripcion, imagen, id, creador, isEditable = true }: any) => {
    const [imageUrl, setImageUrl] = useState("");
    const comment = app.firestore().collection("travells").doc(id)
    const textArea = useRef<HTMLTextAreaElement>(null);
    const { usuario } = useContext(Auth);


    const [comments, setComments] = useState<any[]>([]);
    const [liked, setLiked] = useState(false)

    const creadorid = creador.id;
    console.log(creadorid);
    const [edit, setEdit] = useState(false)
    const titleRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)

    const fetchComments = async () => {
        const db = app.firestore();
        const comments_aw = await db
            .collection("travells")
            .doc(id)
            .collection("comentarios")
            .get();

        const comentsResp = comments_aw.docs.map((doc) => ({id: doc.id, ...doc.data() }));

        setComments(comentsResp);
    };

    useEffect(() => {
        getImage();
        fetchComments();
        checkLiked();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const performLike = async (e: any) => {
        const increment = firebase.firestore.FieldValue.increment(1)
        e.target.style.fill = "blue"
        await comment.update({
            usersWhoLike: firebase.firestore.FieldValue.arrayUnion(usuario!!.uid),
            likesCounter: increment
        }).then(() => {
            console.log("success")
            setLiked(true)
            checkLiked()
        }).catch(error => {
            console.log(error.message)
            checkLiked()
        })
    }

    const performDislike = async (e: any) => {
        e.target.style.fill = "black"
        const increment = firebase.firestore.FieldValue.increment(-1)
        await comment.update({
            usersWhoLike: firebase.firestore.FieldValue.arrayRemove(usuario!!.uid),
            likesCounter: increment
        }).then(() => {
            console.log("success")
            setLiked(false)
            checkLiked()
        }).catch(error => {
            console.log(error.message)
            checkLiked()
        })
    }

    const checkLiked = () => {
        app.firestore().runTransaction(transaction => {
            return transaction.get(comment).then(data => {
                if (!data.exists) {
                    throw console.error('Document does not exist');

                } else {
                    const usersWhoLike: Array<any> = data.data()!!.usersWhoLike
                    if (usersWhoLike.includes(usuario!!.uid)) {
                        console.log("true")
                        setLiked(true)
                    } else {
                        setLiked(false)
                    }
                }
            })
        }).then(() => {
            console.log("success")
        }).catch((error) => {
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
                uid: usuario?.uid,
            });
        fetchComments();
        if (textArea.current) {
            textArea.current.value = "";
        }
    };

    const [isShowing, setisshowing] = useState(false);
    const [commentid, setcommentid] = useState("");

    const openEditComment = async (e: any) => {
        setcommentid(e);
        setisshowing(true);
        console.log(e);
    }

    const eliminarPublicacion = async () => {
            await app.firestore()
            .collection("travells")
            .doc(id)
            .delete()
            window.location.reload(false);
    }

    const closeEditComment = () => {
        setisshowing(false);
    }
    const [newTitle, setNewTitle] = useState(titulo)
    const [newDesc, setNewDesc] = useState(descripcion)

    return (
        <div className="travel-box">
            <svg onClick={liked ? performDislike : performLike} style={liked ? { fill: "blue" } : {}} className="like-button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path fill-rule="nonzero" d="M326.213 81.237c2.93-14.835 10.571-24.366 21.047-29.209 8.516-3.933 18.414-4.335 28.725-1.618 8.953 2.35 18.367 7.134 27.39 14.008 24.426 18.59 47.292 53.623 50.222 97.43.897 13.465.65 27.887-.626 43.158-.84 10.099-2.162 20.705-3.91 31.784h103.903l.484.048c16.89.66 33.249 4.771 47.02 12 11.906 6.236 21.958 14.775 28.938 25.429 7.181 10.949 11.114 23.965 10.536 38.835-.437 11.044-3.39 23.02-9.414 35.8 3.46 14.386 5.032 29.8 2.823 43.323-1.866 11.504-6.343 21.733-14.386 29.316.413 19.016-2.126 34.949-7.24 48.744-5.256 14.174-13.134 25.938-23.245 36.355-.862 9.095-2.35 17.8-4.653 25.96-2.882 10.218-7.063 19.607-12.945 27.887l-.024-.012c-17.717 24.98-31.89 24.414-54.331 23.493-3.118-.118-6.473-.26-11.682-.26H301.587c-18.295 0-32.646-2.634-45.78-9.201-12.992-6.484-24.07-16.5-35.906-31.323l-3.035-8.622V297.51l10.311-2.775c26.22-7.087 46.831-29.48 62.847-56.304 16.465-27.58 28.016-59.894 35.918-85.997v-68.54l.272-2.658zM20.823 272.743h151.478c11.457 0 20.835 9.366 20.835 20.823v276.936c0 11.457-9.378 20.835-20.835 20.835H20.823C9.366 591.337 0 581.96 0 570.502V293.566c0-11.456 9.366-20.823 20.823-20.823zM358.87 77.197c-2.256 1.04-4.075 3.662-5.15 8.114v69.096l-.602 3.968c-8.374 27.981-20.906 63.39-39.343 94.265-17.327 29.032-39.863 53.954-69.13 65.47v211.526c8.03 9.52 15.436 15.992 23.527 20.031 8.941 4.465 19.465 6.272 33.414 6.272h203.258c3.626 0 8.362.189 12.768.366 13.31.543 21.709.886 30.709-11.811v-.06c3.897-5.503 6.756-12.023 8.823-19.322 2.196-7.784 3.472-16.418 4.11-25.63l4.287-9.119c8.941-8.468 15.804-18.023 20.138-29.728 4.477-12.071 6.402-26.623 5.327-44.824l-.484-8.232 6.992-4.347c4.772-2.964 7.382-8.586 8.504-15.449 1.772-10.913-.083-24.342-3.508-36.791l1.087-10.028c5.646-10.784 8.35-20.41 8.681-28.843.33-8.74-1.937-16.335-6.083-22.666-4.358-6.638-10.795-12.047-18.52-16.11-10.015-5.244-22.075-8.268-34.713-8.823v.035H415.883l3.094-16.429c2.988-15.886 5.126-31.04 6.33-45.402 1.182-14.079 1.418-27.118.627-39.036-2.339-34.985-20.256-62.705-39.379-77.257-6.094-4.642-12.153-7.795-17.622-9.236-4.122-1.075-7.606-1.134-10.063 0z" /></svg>
            {
                isEditable && 
                    <svg onClick={() => {
                        if (edit) {
                            const db = app.firestore()
                            const docRef = db.collection("travells").doc(id)
                            docRef.update({
                                titulo: titleRef.current?.value,
                                descripcion: descRef.current?.value
                            }).then(function() {
                                console.log("Document successfully updated!");
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });

                            setNewTitle(titleRef.current?.value)
                            setNewDesc(descRef.current?.value)
                            setEdit(false)
                            
                        } else {
                            setEdit(true)
                        }
                    }} style={{position: "relative", float: "right", margin: "10px"}} className="cursor-pointer" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.125 6.5625L23.4375 1.875L4.6875 20.625L2.8125 27.1875L9.375 25.3125L28.125 6.5625ZM19.6875 5.625L24.375 10.3125L19.6875 5.625ZM4.6875 20.625L9.375 25.3125L4.6875 20.625Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
            }

            <div className="travel p-5 ">
                <div className="travel-info">
                    <div>
                        <h1>
                            <b>T&iacute;tulo: </b> {edit ? <input ref={titleRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" defaultValue={newTitle}/> : newTitle}
                        </h1>
                    </div>
                    <div>
                        <p>
                            <b>Descripci&oacute;n: </b>
                            {edit ? <textarea ref={descRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows={5} defaultValue={newDesc}/> : newDesc}
                        </p>
                    </div>
                </div>
                <div className="travel-image">
                    <img className="image-trav" src={imageUrl} alt="" />
                </div>
                {
                    usuario?.uid === creadorid ? (
                        <button onClick={eliminarPublicacion}>Eliminar</button>
                    ):(<p> </p>)
                }
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
                        return new Date(b.fecha) - new Date(a.fecha);
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
                            <div>
                                <p className="mt-4">{comment?.comentario}</p>
                                {
                                      usuario?.uid === comment!.uid ? (
                                        <button onClick={() => openEditComment(comment.id)} className="text-base focus:outline-none flex justify-center px-1 py-1 rounded cursor-pointer hover:bg-blue-700 hover:text-blue-100 bg-blue-100 text-blue-700 border duration-200 ease-in-out border-blue-600 transition">
                                            <div className="flex leading-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit w-5 h-5 mr-1">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            Edit</div>
                                        </button>
                                    ):(<p> </p>)
                                }
                            </div>
                        </div>
                    ))}
            </div>
            <EditComment
                className="modal"
                show={isShowing}
                close={closeEditComment}
                comment={commentid}
                travel={id}>
            </EditComment>
        </div>
    );
};

export default Travel;
