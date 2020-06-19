import React, {useState, useContext, useEffect} from "react";
import {withRouter} from "react-router";
import {Auth} from "../context/AuthContext";
import {app} from "../firebaseConfig";
import Header from "../components/Header";

const Dashboard = ({history}) => {
    const {usuario} = useContext(Auth);
    const [nombre, setnombre] = useState(null)

    useEffect(
        () => {
            if (usuario==null){
                
            } else{
                app.firestore().collection('users').doc(usuario.uid).get()
                .then(
                    doc => setnombre(doc.data().nombre)
                )
                .catch(
                    err => console.log(err)
                )
            }  
        }, [history, usuario]
    );

    return (
        <div>
            {!usuario ? (
                <div class="grid-welcome-page-container">
                    <Header
                        history={history}
                        state="welcome"/>
                    <div class="grid-body">
                        <div class="pub-tag">
                            <h2>Publicaci&oacute;n</h2>
                        </div>
                        <div class="pub-container">
                            <div class="pub-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    In condimentum dignissim facilisis. Donec tincidunt lacinia nisl 
                                    vel tincidunt. Sed pellentesque nunc in lacinia lacinia. Etiam porta, 
                                    velit nec ultricies facilisis, lorem massa feugiat elit, ac iaculis purus 
                                    nunc id lectus. Phasellus hendrerit, odio in tincidunt accumsan, magna massa 
                                    sollicitudin ligula, vitae cursus turpis massa tempor leo. Nunc in sapien 
                                    suscipit, hendrerit urna at, dignissim ligula. Pellentesque viverra, dolor 
                                    quis imperdiet ornare, mauris augue posuere sem, in blandit lacus neque sit 
                                    amet tellus.</p>
                            </div>
                            <div class="pub-foto">
                                <img src={require('../paisaje.png')}/>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div class="grid-welcome-page-container">
                    <Header
                        history={history}
                        state="authorized"/>
                    <div class="grid-body">
                        <div class="pub-tag">
                            <h2>Publicaci&oacute;n</h2>
                        </div>
                        <div class="pub-container">
                            <div class="pub-text">
                                
                            </div>
                            <div class="pub-foto">
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withRouter(Dashboard);