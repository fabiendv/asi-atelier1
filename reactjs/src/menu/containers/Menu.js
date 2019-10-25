import React, { Component } from 'react';
import MenuElement from '../components/MenuElement';

class Menu extends Component{

    render() {

        return (
                <div className="container-fluid">
                    <div className="menu-container block-container">
                        <div className="row menu">
                            <div className="col-sm-1"></div>
                            <div className="col-sm-4">
                                <MenuElement 
                                    type ="buy"
                                    imgURL = "shopping cart icon menu-icon"
                                    link = "" 
                                />
                            </div>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-4"> 
                                <MenuElement 
                                    type ="sell"
                                    imgURL = "money bill alternate icon menu-icon"
                                    link = "" 
                                />
                            </div>
                            <div className="col-sm-1"></div>
                            
                        </div>  
                        <div className="row menu">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-4"> 
                                <MenuElement 
                                    user={this.props.user}
                                    type ="play"
                                    imgURL = "gamepad icon menu-icon"
                                    link = "" 
                                />
                            </div>
                            <div className="col-sm-4"></div>
                        </div>
                    </div>
                </div>
        );
    }

}
export default Menu;