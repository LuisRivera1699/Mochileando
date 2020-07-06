import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function CarouselComponent() {
    return (
        <div className="carousel-wrapper" style={{maxWidth:"40%", marginLeft:"auto", marginRight:"auto"}}>
            <Carousel showThumbs={false} >
                <div className="publi" style={{backgroundColor:"#101925"}}>
                    <h1 className="titulopubli" style={{color: "white", fontSize:"2em"}}>Canotaje en Lunahuana</h1>
                    <p style={{color: "white", fontSize:"0.9em"}}>Lugar ideal para practicar deportes de aventura o actividades al aire libre como canotaje, ciclismo de montaña y más. El canotaje en lunahuaná es aventura acuática asegurada y el deporte de aventura más solicitado que se practica en el río cañete del valle de Lunahuaná que lleva el mismo nombre de la ciudad. El rafting o canotaje es una de las actividades al aire libre más tradicionales de Lunahuaná y mayormente se ofrecen full days que incluyen el canotaje. Después de una charla sobre las técnicas de remado y las medidas de seguridad te embarcarás en una gran aventura.</p>
                    <img src="../img-01.jpg" />
                </div>
                <div className="publi" style={{backgroundColor:"#101925"}}>
                    <h1 className="titulopubli" style={{color: "white", fontSize:"2em"}}>Montaña 7 Colores Cusco Perú</h1>
                    <p style={{color: "white", fontSize:"0.9em"}}>La caminata de 3 ó 4 horas no es peligroso y demanda un esfuerzo físico moderado-alto. Existen tramos de pendientes considerables en ascenso y descenso. Sin embargo, una de las mayores dificultades es el clima frío y el viento helado. La altitud de la zona puede causar el mal de altura o soroche. Se recomienda una aclimatación previa de 1 ó 2 días en la ciudad del Cusco. Para llegar a ésta es necesario recorrer 8 km, ¿simple? Tal vez, pero a 5,000 mt de altitud se complica un poco, aquí te detallo nuestras recomendaciones de cómo lograrlo «sin morir» en el intento. En el reto, consideré mis capacidades, en lo físico no tan mal, pero mi resistencia a la altitud, no es la mejor. Por lo tanto tomé precauciones que funcionaron ¡muy bien!, así que quiero compartir con ustedes algunas recomendaciones, para que todos puedan visitar esta MARAVILLA de la naturaleza.</p>
                    <img src="../img-02.jpg" />
                </div>
                <div className="publi" style={{backgroundColor:"#101925"}}>
                    <h1 className="titulopubli" style={{color: "white", fontSize:"2em"}}>El Oasis: Huacachina</h1>
                    <p style={{color: "white", fontSize:"0.9em"}}>El oasis fue el lugar que más me inspiro en todo el viaje. ¿que hacer durante un mes en el oasis de la Huacachina? Donde quedarte, cómo disfrutarlo al máximo. Llegar a la Huacachina fue enfrentar las perdidas en el viaje, luego de perder todo, todas mis fotos mis videos y mi trabajo, llegamos al mejor lugar que hubiéramos podido encontrar y por eso hasta ahora continua siendo: MI LUGAR FAVORITO EN EL MUNDO.</p>
                    <img src="../img-03.jpg"/>
                </div>
            </Carousel>
        </div>
    );
}