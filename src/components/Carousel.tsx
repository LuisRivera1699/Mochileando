import React, { useState, useEffect, useRef, useContext } from "react";
import { Carousel } from 'react-responsive-carousel';
import { app } from "../firebaseConfig";
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function CarouselComponent({viajes}:any) {
    const viaje1 = viajes[0];
    const viaje2 = viajes[1];
    const viaje3 = viajes[2];
    const [imageUrl1, setImageUrl1] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");

    useEffect(() => {
        getImage1();
        getImage2();
        getImage3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getImage1 = async () => {
        await app
            .storage()
            .ref()
            .child(viaje1.imagenes)
            .getDownloadURL()
            .then(function (url) {
                setImageUrl1(url);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    const getImage2 = async () => {
        await app
            .storage()
            .ref()
            .child(viaje2.imagenes)
            .getDownloadURL()
            .then(function (url) {
                setImageUrl2(url);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    const getImage3 = async () => {
        await app
            .storage()
            .ref()
            .child(viaje3.imagenes)
            .getDownloadURL()
            .then(function (url) {
                setImageUrl3(url);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    return (
        <div className="carousel-wrapper" style={{maxWidth:"40%", marginLeft:"auto", marginRight:"auto"}}>
            <Carousel showThumbs={false} >
                <div className="publi" style={{backgroundColor:"#101925"}}>
                    <h1 className="titulopubli" style={{color: "white", fontSize:"2em"}}>{viaje1.titulo}</h1>
                    <p style={{color: "white", fontSize:"0.9em"}}>{viaje1.descripcion}</p>
                    <img src={imageUrl1} />
                </div>
                <div className="publi" style={{backgroundColor:"#101925"}}>
                    <h1 className="titulopubli" style={{color: "white", fontSize:"2em"}}>{viaje2.titulo}</h1>
                    <p style={{color: "white", fontSize:"0.9em"}}>{viaje2.descripcion}</p>
                    <img src={imageUrl2} />
                </div>
                <div className="publi" style={{backgroundColor:"#101925"}}>
                    <h1 className="titulopubli" style={{color: "white", fontSize:"2em"}}>{viaje3.titulo}</h1>
                    <p style={{color: "white", fontSize:"0.9em"}}>{viaje3.descripcion}</p>
                    <img src={imageUrl3}/>
                </div>
            </Carousel>
        </div>
    );
}