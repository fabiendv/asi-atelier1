import React, { Component } from 'react';
import MenuElement from '../Components/MenuElement';

class Menu extends Component{


    constructor(props) {
        super(props);
        
    }


    render() {

        return (
                <div className="container-fluid">
                    <div className="row justify-content-center" >
                         
                        <div className="col-md-3">
                            <MenuElement 
                                type ="buy"
                                imgURL = ""
                                link = "" 
                            />
                        </div>
                        <div className="col-md-3"> 
                            <MenuElement 
                                type ="sell"
                                imgURL = ""
                                link = "" 
                            />
                        </div>
                        
                    </div>  
                    <div className="row justify-content-center">
                        <div className="col-md-3"> 
                            <MenuElement 
                                type ="play"
                                imgURL = ""
                                link = "" 
                            />
                    </div>
                    </div>
                </div>
        );
    }

}
export default Menu;