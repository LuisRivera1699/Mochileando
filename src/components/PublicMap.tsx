import React, { useEffect, useRef } from "react";

const API_KEY = "AIzaSyAjaX7LsXUefminI6f3FrxnoEAGK6y-N-Y";

declare global {
    interface Window {
        google: any;
        map: any;
        points: any;
    }
}

// La ruta se guarda en la variable global window.points
const PublicMap = ({ points }: any) => {
    const ref = useRef(null);

    useEffect(() => {
        const onLoad = () => {
            window.points = [];

            window.map = new window.google.maps.Map(ref.current, {
                zoom: 5,
                center: { lat: -9.19777751008936, lng: -75.28101863230539 },
                mapTypeId: "terrain",
            });

            function placeMarker(pointsArray: any) {
                const auxPoints = pointsArray || [];
                auxPoints.forEach((point: any) => {
                    new window.google.maps.Marker({
                        position: point,
                        map: window.map,
                    });
                });
            }

            placeMarker(points);
        };

        if (!window.google) {
            const script = document.createElement(`script`);
            script.src =
                `https://maps.googleapis.com/maps/api/js?key=` + API_KEY;
            document.head.append(script);
            script.addEventListener(`load`, onLoad);

            return () => script.removeEventListener(`load`, onLoad);
        } else onLoad();
    }, [points]);

    return (
        <>
            <div
                style={{
                    height: `60vh`,
                    margin: `1em 0`,
                    borderRadius: `0.5em`,
                }}
                ref={ref}
            />
        </>
    );
};

export { PublicMap };
