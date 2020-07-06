import React, { useState, useEffect } from 'react';
import { app } from '../firebaseConfig';
import CarouselComponent from "../views/carousel.component";

const BestTravel = ({ titulo, descripcion, imagen }: any) => {

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
        <div className="best-travel" >
            <div className= "App">
                <CarouselComponent />
            </div>
        </div>
    )
}

export default BestTravel;