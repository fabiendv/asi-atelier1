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
            <a className="btn btn-block btn-lg btn-primary" role="button" href={this.props.link}>
                <i class={this.props.imgURL}></i>
                  {this.props.type}
            </a>
        );
    }
}
export default MenuElement;