import React, {
    ReactElement,
    // useRef,
    useContext,
    useEffect,
    useState,
} from "react";
import { app } from "../firebaseConfig";

import Header from "../components/Header";
import { useHistory } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import Travel from "../components/travel"

interface Datos {
    nombre?: string;
    apellido?: string;
    feNacimiento?:string;
    sexo?:string;
}

export default function Perfil(): ReactElement {
    let history = useHistory();
    const { usuario } = useContext(Auth);
    const [userData,setUserData]=useState<Datos>()
    const [publicData,setPublicData]=useState<firebase.firestore.DocumentData>([])
    // const date = new Date(Date.now()).getFullYear()
    const [listo, setListo]=useState(false)
    //const [imageUrl,setImageUrl]=useState(true) 


    useEffect(() => {
        if (usuario == null) {
            history.push('/')
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
            if (usuario){
                app.firestore().collection("travells").where("creador", "==", app.firestore().collection("users").doc(usuario!!.uid))
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        console.log("holi")
                        console.log(app.firestore().collection("users").doc(usuario!!.uid))
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
            } else {
                
            }      
        }
    )

    /*const getImage = async () => {
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
    }*/

    return(
        <div className="grid-home-page-traveller-container bg-gray-900" style={{ height: window.innerHeight}}>
            <div className="grid-side-bar">
                <Header history={history} state="authorized" height={window.innerHeight} />
            </div>
            <div className="perfil">
                <p className="perfilnombre" style={{fontSize: "2em", color: "#1da569", textAlign:"center" }}>{userData?.nombre} {userData?.apellido}</p>
                <p className="perfildatos" style={{fontSize: "1em", color: "white", textAlign:"center" }}>Sexo: {userData?.sexo}</p>
                <p className="perfildatos" style={{fontSize: "1em", color: "white", textAlign:"center" }}>Fecha de Nacimiento: {userData?.feNacimiento}</p>
                {listo && publicData.map((element:any) => {
                    return <Travel points={element.points} titulo={element.titulo} descripcion={element.descripcion} imagen={element.imagenes} id={element.id} creador={element.creador} />
                })}
            </div>
        </div>
    );
}