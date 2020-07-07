import React, {
    ReactElement,
    // useRef,
    useContext,
    useEffect,
    useState,
} from "react";
import { app } from "../firebaseConfig";

import { useHistory } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import Carousel from "../components/Carousel"
import { when } from "q";



interface Datos {
    nombre?: string;
    apellido?: string;
    feNacimiento?:string;
    sexo?:string;
}

export default function Besttravel(): ReactElement {
    let history = useHistory();
    const { usuario } = useContext(Auth);
    const [userData,setUserData]=useState<Datos>()
    const [publicData,setPublicData]=useState<firebase.firestore.DocumentData>([])
    // const date = new Date(Date.now()).getFullYear()
    const [listo, setListo]=useState(false)
    //const [imageUrl,setImageUrl]=useState(true) 


    useEffect(() => {
        if (usuario == null) {
        } else {
            const UserData = async () => {
                const Data = (
                    await app.firestore()
                    .collection("users")
                    .doc(usuario.uid)
                    .get()
                ).data();
                setUserData(Data);
            }
            UserData();
        }

    }, [history, usuario]);

    useEffect(
        () => {
            
                app.firestore().collection("travells").orderBy('likesCounter', 'desc').limit(3)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        console.log("holi")
                        publicData.push({...doc.data(), id:doc.id});
                        
                        
                    });
                })
                .then (
                    () => {
                        setPublicData(publicData);
                        setListo(true);
                    }
                )
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
            
        }

    )

    return(
        <div>
            {
                listo === true ? (
                    <Carousel viajes={publicData}/>

                ):(<p>No hay publicaciones</p>)
            }
        </div>
    );
}
