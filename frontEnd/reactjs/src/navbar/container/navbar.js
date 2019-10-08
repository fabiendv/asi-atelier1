import React, { Component } from 'react';
import NavbarElement from '../components/navbarElement';

class Navbar extends Component{

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <nav class="navbar navbar-light bg-light">
                <NavbarElement 
                    icon = "$"
                    text = "5000" 
                />
                <NavbarElement 
                    icon = ""
                    text = "I am the title" 
                />
                <NavbarElement 
                    icon = ""
                    text = "J.Dhoe" 
                
                />
                <i class="fas fa-address-card"></i>
            </nav>
        );
    }

}
export default Navbar;