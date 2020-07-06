import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselComponent({ titulo, descripcion, imagen }: any) {
    return (
        <div className="carousel-wrapper">
            <Carousel>
            <div className="pub-tag pt-12">
                <h2 className="text-white">{titulo}</h2>
            </div>
            <div className="pub-container bg-white">
                <div className="pub-text">
                    <p>
                        {descripcion}
                    </p>
                </div>
                <div className="pub-foto flex items-center justify-center">
                    <img className="image-trav" src={imagen} alt="" />
                </div>
            </div>
            </Carousel>
        </div>
    );
}