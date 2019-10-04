import React, { Component } from 'react';

class MenuElement extends Component{


    constructor(props) {
        super(props);
        this.state = {
            type : props.type,
            imgURL : props.imgURL,
            link : props.link
        }
    }




    render() {

        return (
                <div className="menuElement">
                    <a href={this.props.link}> {this.props.type}</a>
                    <img src={this.props.imgURL} alt="logo menu" />
                </div>
        );
    }

}
export default MenuElement;