import React from "react";

import { app } from "../firebaseConfig";

const EditComment = ({ show, close, comment, travel }: any) => {

    const handleComment = async (e: any) => {
        e.preventDefault();
        const {
            comentario
        } = e.target.elements;

        console.log(comentario);

        app.firestore().collection("travells").doc(travel).collection("comentarios").doc(comment).update({
            comentario: comentario.value,
        }).then(function() {
            console.log("Document successfully updated!");
            window.location.reload(false);
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

        //alert("Tu comentario se actualizó");
    };

    return (
        <div style={{ height: 0 }}>
                    <div className="modal-wrapper2 z-50"
                        style={{
                            
                            transform: show ? 'translate(23%,500%)' : 'translateY(-200vh)',
                            position: show ? "fixed" : "absolute", 
                            opacity: show ? '1' : '0'
                        }}>
                        <div className="modal-header bg-green-500 flex items-center justify-center">
                            <h3 className="text-white">Editar Comentario</h3>
                            <span className="close-modal-btn" onClick={close}
                                style={{ position: "relative", left: "100px", top: "-1px" }}>×</span>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleComment}>
                                <label>Editar Comentario: </label>
                                <input
                                    type="text"
                                    name="comentario"
                                    placeholder="Comentario"
                                    required />
                            </form>
                            
                        </div>
                        <div className="modal-footer bg-green-500">
                        </div>
                    </div>
        </div>
    )
}

export default EditComment;