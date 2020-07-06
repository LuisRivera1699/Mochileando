import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { Auth } from "../context/AuthContext";
import { app } from "../firebaseConfig";
import Header from "../components/Header";
import Modal from "../components/travelModal/Modal"
import Travel from "../components/travel"
import CarouselComponent from "./carousel.component";

const Dashboard = ({ history }: any) => {
    const { usuario } = useContext(Auth);
    //const [nombre, setnombre] = useState(null);
    const height = window.innerHeight;

    const [pubs, setpubs] = useState<firebase.firestore.DocumentData>([])

    const [llenado, setllenado] = useState(false);

    useEffect(() => {
        if (usuario == null) {
        } else {
            app.firestore()
                .collection("users")
                .doc(usuario.uid)
                .get()
                .then((doc: any) => console.log("created")/*setnombre(doc.data()?.nombre)*/)
                .catch((err: any) => console.log(err));
        }
    }, [history, usuario]);


    useEffect(
        () => {
            const getColl = async () => {
                await app.firestore().collection('travells').get().then(snapshot => {
                    snapshot.forEach(element => {
                        pubs.push({...element.data(), id: element.id})
                    });
                }).then(() => {
                    setpubs(pubs);
                    console.log(pubs)
                    setllenado(true);
                }).catch(() => {
                    console.log("un error")
                });
            };
            getColl();
        }, []
    )

    //

    const [isShowing, setisshowing] = useState(false);

    const openModalHandler = () => {
        setisshowing(true);
    }

    const closeModalHandler = () => {
        setisshowing(false);
    }

    //

    return (
        <div>
            {!usuario ? (
                <div className="grid-welcome-page-container bg-gray-900" style={{ height: window.innerHeight }}>
                    <Header history={history} state="welcome" />
                    <div className="best-travel">
                        <div className= "App">
                            <CarouselComponent />
                        </div>
                    </div>
                </div>
            ) : (
                    <div className="grid-home-page-traveller-container 
                            bg-gray-900">
                        {isShowing ? <div onClick={closeModalHandler} className="back-drop"></div> : null}
                        <div className="grid-side-bar">
                            <Header history={history} state="authorized" height={height} />
                        </div>
                        <div className="text-center grid-home-container" style={{ height: height }}>
                            <button
                                className="bg-gray-200 m-10"
                                style={{ width: 400, height: 50 }}
                                onClick={openModalHandler}>¿A d&oacute;nde viajas hoy?</button>
                            {llenado && pubs.map((x: any) => {
                                return <Travel titulo={x.titulo} descripcion={x.descripcion} imagen={x.imagenes} id={x.id} creador={x.creador} />
                            })}
                            <Modal
                                className="modal"
                                show={isShowing}
                                close={closeModalHandler}>
                            </Modal>
                        </div>
                    </div>
                )}

        </div>
    );
};

export default withRouter(Dashboard);
