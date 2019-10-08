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
                    <h2><i class={this.props.icon}></i>{this.props.text}</h2>
                </div>
        );
    }

}
export default NavbarElement;