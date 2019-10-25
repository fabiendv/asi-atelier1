import React, { Component } from 'react';

class NavbarElement extends Component{

    constructor(props) {
        super(props);
        this.state = {
            text : props.text,
            type : props.type
        }
    }

    render() {

        return (
            <div className="btn-group" role="group">
                <h2><i className={this.props.icon}></i>{this.props.text}</h2>
            </div>
        );

    }

}
export default NavbarElement;