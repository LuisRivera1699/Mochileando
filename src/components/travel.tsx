import React, { useState, useEffect } from 'react';
import { app } from '../firebaseConfig'

const Travel = ({ titulo, descripcion, imagen }: any) => {

    const [imageUrl, setImageUrl] = useState("")

    useEffect(
        () => {
            getImage()
        }, []
    )

    const getImage = async () => {
        await app
            .storage()
            .ref()
            .child(imagen)
            .getDownloadURL().then(
                function (url) {
                    setImageUrl(url)
                }
            ).catch(
                function (error) {
                    console.log(error.message)
                }
            )
    }

    return (
        <div className="travel">
            <div className="travel-info">
                <div>
                    <h1><b>T&iacute;tulo: </b>  {titulo}</h1>
                </div>
                <div>
                    <p><b>Descripci&oacute;n: </b>{descripcion}</p>
                </div>

            </div>
            <div className="travel-image">
                <img className="image-trav" src={imageUrl} alt="" />
            </div>
        </div>
    )
}

export default Travel;