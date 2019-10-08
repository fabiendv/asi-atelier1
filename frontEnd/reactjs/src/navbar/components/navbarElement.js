import React, { Component } from 'react';

class NavbarElement extends Component{

    constructor(props) {
        super(props);
        this.state = {
            icon : props.icon,
            text : props.text
        }
    }

    render() {

        return (
                <div className="btn-group" role="group">
                    {this.props.icon}
                    {this.props.text}
                </div>
        );
    }

}
export default NavbarElement;