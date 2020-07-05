import React, { useState, useContext } from 'react';
import { Map } from '../Map';
import { app } from '../../firebaseConfig'
import { Auth } from '../../context/AuthContext';

const Modal1 = (props: any) => {

    const [points, setPoints] = useState([])
    const { usuario } = useContext(Auth);

    const handleCreateTravel = async () => {
        if (points.length === 0) {
            window.alert("Por favor, ingrese puntos de parada en su publicación.")
        } else {
            let ref = app.storage().ref().child('publication').child(usuario!!.uid)
            const fileName = props.imagennombre;
            ref = ref.child(fileName);
            ref.put(props.imagen).then(snapshot => { console.log("done") })
            if (usuario == null) {
                console.log('No existe un usuario')
            } else {
                app.firestore().collection("travells").doc().set({
                    creador: app.firestore().collection('users').doc(usuario.uid),
                    titulo: props.titulo,
                    descripcion: props.descripcion,
                    tipoviaje: props.tipoviaje,
                    imagenes: ref.fullPath,
                    points: points
                });
            }

            FinalClosure();
        }
    }

    const FinalClosure = () => {
        props.primarymodal();
        props.close();
    }

    return (

        <div className="modal-wrapper"
            style={{
                transform: props.show ? 'translateY(-20vh)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            <div className="modal-header bg-green-500 flex items-center justify-center">
                <h3 className="text-white">PASO 2 - Crear publicación</h3>
                <span className="close-modal-btn" onClick={FinalClosure}
                    style={{ position: "relative", left: "200px", top: "-1px" }}>×</span>
            </div>
            <div className="modal-body">
                <p>
                    {props.children}
                            MAPA
                    <Map
                        setpoints={setPoints}></Map>
                </p>
                <button className="btn-cancel" onClick={props.close}>ATRÁS</button>
                <button className="btn-continue" onClick={handleCreateTravel}>ACEPTAR</button>
            </div>
            <div className="modal-footer bg-green-500">

            </div>
        </div>
    )
}

export default Modal1;