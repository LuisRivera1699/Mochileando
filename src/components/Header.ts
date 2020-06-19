import React from "react";
import {app} from "../firebaseConfig";

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    renderLogIn(){
        this.props.history.push({
            pathname: "/login",
            signup: false
        });
    }
    renderSignup(){
        this.props.history.push({
            pathname: "/login",
            signup:true    
        });
    }

    renderWelcome(){
        this.props.history.push("/");
    }

    render(){
        if (this.props.state === "welcome"){
            return(
                <div class="grid-header">
                    <div class="header-title-container">
                        <div class="header-title-inside-container">
                            <h1 class="h1-header" onClick={() => this.renderWelcome()}>Mochilleando</h1>
                        </div>
                    </div>
                    <div class="header-auth-container">
                        <div class="header-auth-inside-container">
                            <button class="header-log-in-button" onClick={() => this.renderLogIn()}>Iniciar Sesi&oacute;n</button>
                            <button class="header-sign-up-button" onClick={() => this.renderSignup()}>Registrarse</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            if (this.props.state === "LogIn") {
                return(
                    <div class="grid-header">
                        <div class="header-title-container">
                            <div class="header-title-inside-container">
                                <h1 class="h1-header" onClick={() => this.renderWelcome()}>Mochilleando</h1>
                            </div>
                        </div>
                        <div class="header-auth-container">
                            <div class="header-auth-inside-container">
                                <button class="header-sign-up-button" onClick={() => this.renderSignup()}>Registrarse</button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                if (this.props.state === "SignUp") {
                    return(
                        <div class="grid-header">
                            <div class="header-title-container">
                                <div class="header-title-inside-container">
                                    <h1 class="h1-header" onClick={() => this.renderWelcome()}>Mochilleando</h1>
                                </div>
                            </div>
                            <div class="header-auth-container">
                                <div class="header-auth-inside-container">
                                    <button class="header-log-in-button" onClick={() => this.renderLogIn()}>Iniciar Sesi&oacute;n</button>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return(
                        <div class="grid-header">
                            <div class="header-title-container">
                                <div class="header-title-inside-container">
                                    <h1 class="h1-header" onClick={() => this.renderWelcome()}>Mochilleando</h1>
                                </div>
                            </div>
                            <div class="header-auth-container">
                                <div class="header-auth-inside-container">
                                    <button class="header-log-in-button" onClick={() => app.auth().signOut()}>Cerrar Sesi&oacute;n</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            } 
        }
        
    }
};

export default Header;