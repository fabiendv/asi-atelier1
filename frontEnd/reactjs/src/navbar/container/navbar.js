import React, { Component } from 'react';
import NavbarElement from '../components/navbarElement';

class Navbar extends Component{

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <nav className="navbar navbar-light bg-light">
                <NavbarElement 
                    text = "5000" 
                    type = "money"
                />
                <NavbarElement 
                    text = "I am the title" 
                    type = "title"
                />
                <NavbarElement 
                    text = "J.Dhoe"
                    type = "user" 
                />
            </nav>
        );
    }

}
export default Navbar;