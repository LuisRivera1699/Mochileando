import React, { useState, useEffect } from 'react';
import Modal1 from './Modal1';

const Modal = ({ show, close }: any) => {

    const [foto, setfoto] = useState(false);
    const [titulo, settitulo] = useState("");
    const [descripcion, setdescripcion] = useState("");
    const [tipoviaje, settipoviaje] = useState("");
    const [imagen, setimagen] = useState({
        image: null,
        url: ''
    });
    const [nombre, setnombre] = useState("");

    const handleImageUploaded = (event: any) => {
        const image = event.target.files[0];
        setimagen(image);
    };

    useEffect(() => {
        console.log(imagen);
    }, [imagen])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { titulo, descripcion, tipoviaje, imagenes } = e.target.elements;
        settitulo(titulo.value);
        setdescripcion(descripcion.value);
        settipoviaje(tipoviaje.value);
        setnombre(imagenes.files[0].name);
        setfoto(true);
    }

    const closeModalHandler = () => {
        setfoto(false);
    }

    return (

        <div style={{ height: 0 }}>
            {
                foto === false ? (
                    <div className="modal-wrapper"
                        style={{
                            transform: show ? 'translateY(-10vh)' : 'translateY(-200vh)',
                            opacity: show ? '1' : '0'
                        }}>
                        <div className="modal-header bg-green-500 flex items-center justify-center">
                            <h3 className="text-white">PASO 1 - Crear publicación</h3>
                            <span className="close-modal-btn" onClick={close}
                                style={{ position: "relative", left: "200px", top: "-1px" }}>×</span>
                        </div>
                        <div className="modal-body">

                            <form onSubmit={handleSubmit}>
                                {/*<h1>Publicación de tu viaje</h1>*/}
                                <label>¿Cómo llamarás a tu viaje?: </label>
                                <input
                                    type="text"
                                    name="titulo"
                                    placeholder="Título"
                                    required />
                                <br />
                                <label className="relative align-top" style={{ marginRight: "105px" }}>¡Cuéntanos!: </label>
                                <textarea
                                    name="descripcion"
                                    rows={8}
                                    cols={45}
                                    placeholder="Descripción"
                                    required />
                                <br />
                                <label>¿Qué tipo de viaje hiciste?: </label>
                                <select name="tipoviaje" required>
                                    <option value="departamental">Departamental</option>
                                    <option value="provincial">Provincial</option>
                                </select>
                                <br />
                                <label>¿Quieres incluir imágenes?: </label>
                                <input
                                    type="file"
                                    name="imagenes"
                                    placeholder="Imágenes" multiple
                                    onChange={handleImageUploaded}
                                    required />
                                <br />
                                <input
                                    className="btn-continue"
                                    type="submit"
                                    value="Siguiente"
                                />

                            </form>
                            <button className="btn-cancel" onClick={close}>CERRAR</button>
                        </div>
                        <div className="modal-footer bg-green-500">
                            {/*<button className="btn-cancel" onClick={close}>CERRAR</button>
                            <button className="btn-continue" onClick={() => setfoto(true)}>SIGUIENTE</button>*/}

                        </div>
                    </div>

                ) : (
                        <Modal1
                            className="modal1"
                            show={foto}
                            close={closeModalHandler}
                            primarymodal={close}
                            titulo={titulo}
                            descripcion={descripcion}
                            tipoviaje={tipoviaje}
                            imagen={imagen}
                            imagennombre={nombre}>
                        </Modal1>
                    )
            }


        </div>
    )
}

export default Modal;