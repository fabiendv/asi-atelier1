import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMainMenuPage } from '../../actions';
import NavbarElement from '../components/navbarElement';

class Navbar extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.setHome=this.setHome.bind(this);
    }

    setHome(){
        this.props.dispatch(setMainMenuPage());
    }

    render() {

        let display;

        /**
         *  Si l'utilisateur est connecté, renvoie son argent + nom
         */
        if (this.props.isLogged==="true"){

            display = (
                <nav className="navbar shadow navbar-light bg-light">

                <div className="btn btn-lg btn-info" onClick={()=>{this.setHome()}}>
                    Home
                </div>
                <div className="col-sm-3 text-center">
                    <NavbarElement 
                        icon = ""
                        text = {this.props.title}
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <NavbarElement 
                        icon = "user icon"
                        text = {this.props.name}
                    />
                </div> 
                <div className="col-sm-3 text-center">
                    <NavbarElement 
                        icon = "dollar sign icon"
                        text = {this.props.money}
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
export default connect()(Navbar);