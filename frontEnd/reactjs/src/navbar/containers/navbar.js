import React, { Component } from 'react';
import NavbarElement from '../components/navbarElement';

class Navbar extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        let display;

        /**
         *  Si l'utilisateur est connecté, renvoie son argent + nom
         */
        if (this.props.isLogged==="true"){

            display = (
                <nav className="navbar shadow navbar-light bg-light">

                <div className="col-sm-4 text-center">
                    <NavbarElement 
                        icon = "dollar sign icon"
                        text = {this.props.money}
                    />
                </div>
                <div className="col-sm-4 text-center">
                    <NavbarElement 
                        icon = ""
                        text = {this.props.title}
                    />
                </div>
                <div className="col-sm-4 text-center">
                    <NavbarElement 
                        icon = "user icon"
                        text = {this.props.name}
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
                <nav className="navbar shadow navbar-light bg-light">

                <div className="col-sm-4 text-center">
                    <NavbarElement 
                        icon = ""
                        text = "" 
                    />
                </div>
                <div className="col-sm-4 text-center">
                    <NavbarElement 
                        icon = ""
                        text = {this.props.title}
                    />
                </div>
                <div className="col-sm-4 text-center">
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