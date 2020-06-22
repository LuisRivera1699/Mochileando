import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { Auth } from "../context/AuthContext";
import { app } from "../firebaseConfig";
import Header from "../components/Header";
import Modal from "../components/travelModal/Modal"

const Dashboard = ({ history }: any) => {
    const { usuario } = useContext(Auth);
    const [nombre, setnombre] = useState(null);
    const height = window.innerHeight;

    useEffect(() => {
        if (usuario == null) {
        } else {
            app.firestore()
                .collection("users")
                .doc(usuario.uid)
                .get()
                .then((doc: any) => setnombre(doc.data()?.nombre))
                .catch((err: any) => console.log(err));
        }
    }, [history, usuario]);

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
                    <div className="grid-body">
                        <div className="pub-tag pt-12">
                            <h2 className="text-white">Publicaci&oacute;n</h2>
                        </div>
                        <div className="pub-container bg-white">
                            <div className="pub-text">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. In condimentum dignissim
                                    facilisis. Donec tincidunt lacinia nisl vel
                                    tincidunt. Sed pellentesque nunc in lacinia
                                    lacinia. Etiam porta, velit nec ultricies
                                    facilisis, lorem massa feugiat elit, ac
                                    iaculis purus nunc id lectus. Phasellus
                                    hendrerit, odio in tincidunt accumsan, magna
                                    massa sollicitudin ligula, vitae cursus
                                    turpis massa tempor leo. Nunc in sapien
                                    suscipit, hendrerit urna at, dignissim
                                    ligula. Pellentesque viverra, dolor quis
                                    imperdiet ornare, mauris augue posuere sem,
                                    in blandit lacus neque sit amet tellus.
                                </p>
                            </div>
                            <div className="pub-foto flex items-center justify-center">
                                <img src={require("../paisaje.png")} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                    <div className="grid-home-page-traveller-container 
                            bg-gray-900"
                        style={{ height: height }}>
                        {isShowing ? <div onClick={closeModalHandler} className="back-drop"></div> : null}
                        <div className="grid-side-bar">
                            <Header history={history} state="authorized" height={height} />
                        </div>
                        <div className="text-center grid-home-container" style={{ height: height }}>
                            <button
                                className="bg-gray-200 m-10"
                                style={{ width: 400, height: 50 }}
                                onClick={openModalHandler}>¿A d&oacute;nde viajas hoy?</button>
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
