import React, { Component } from 'react';
import MenuElement from '../Components/MenuElement';

class Menu extends Component{


    constructor(props) {
        super(props);
        
    }


    render() {

        return (
                <div className="menu">
                    <MenuElement 
                        type ="buy"
                        imgURL = ""
                        link = "" 
                    />
                    <MenuElement 
                        type ="sell"
                        imgURL = ""
                        link = "" 
                    />
                    <MenuElement 
                        type ="play"
                        imgURL = ""
                        link = "" 
                    />
                </div>
        );
    }

}
export default Menu;