import React, { Component } from 'react';


class Avatar extends Component{


    constructor(props) {
        super(props);
        this.state = {
            login : props.login,
            
        }
    }


    render() {

        return (
           <div>{this.state.login}</div>     
        );
    }

}
export default Avatar;