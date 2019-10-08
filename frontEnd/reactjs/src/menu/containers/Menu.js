import React, { Component } from 'react';
import MenuElement from '../components/MenuElement';

class Menu extends Component{

    constructor(props) {
        super(props);
    }

    render() {

        return (
                <div className="container-fluid">
                    <div className="menu-container">
                        <div className="row menu">
                            <div class="col-sm-1"></div>
                            <div className="col-sm-4">
                                <MenuElement 
                                    type ="buy"
                                    imgURL = "shopping cart icon menu-icon"
                                    link = "" 
                                />
                            </div>
                            <div class="col-sm-2"></div>
                            <div className="col-sm-4"> 
                                <MenuElement 
                                    type ="sell"
                                    imgURL = "money bill alternate icon menu-icon"
                                    link = "" 
                                />
                            </div>
                            <div class="col-sm-1"></div>
                            
                        </div>  
                        <div className="row menu">
                            <div class="col-sm-4"></div>
                            <div className="col-sm-4"> 
                                <MenuElement 
                                    type ="play"
                                    imgURL = "gamepad icon menu-icon"
                                    link = "" 
                                />
                            </div>
                            <div class="col-sm-4"></div>
                        </div>
                    </div>
                </div>
        );
    }

}
export default Menu;