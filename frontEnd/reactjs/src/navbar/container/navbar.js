import React, { Component } from 'react';
import NavbarElement from '../components/navbarElement';

class Navbar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLogged:this.props.isLogged,
            name:this.props.name,
            title:this.props.title,
            money:this.props.money
        };
    }

    render() {

        let display;

        /**
         *  Si l'utilisateur est connecté, renvoie son argent + nom
         */
        if (this.state.isLogged==="true"){
            display = (
                <nav class="navbar shadow navbar-light bg-light">

                <div class="col-sm-4 text-center">
                    <NavbarElement 
                        icon = "dollar sign icon"
                        text = {this.state.money}
                    />
                </div>
                <div class="col-sm-4 text-center">
                    <NavbarElement 
                        icon = ""
                        text = {this.state.title}
                    />
                </div>
                <div class="col-sm-4 text-center">
                    <NavbarElement 
                        icon = "user icon"
                        text = {this.state.name}
                    />
                </div> 
            </nav>

            );
        }
        
        /**
         * Si l'utilisateur est pas connecté (page login, sign up)
         */
        else{
            display = (
                <nav class="navbar shadow navbar-light bg-light">

                <div class="col-sm-4 text-center">
                    <NavbarElement 
                        icon = ""
                        text = "" 
                    />
                </div>
                <div class="col-sm-4 text-center">
                    <NavbarElement 
                        icon = ""
                        text = {this.state.title}
                    />
                </div>
                <div class="col-sm-4 text-center">
                    <NavbarElement 
                        icon = ""
                        text = "" 
                    />
                </div> 
            </nav>

            );

        }

        return display;
    }

}
export default Navbar;