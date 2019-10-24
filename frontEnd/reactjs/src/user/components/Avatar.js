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
           <div>
                <i className="user huge icon"></i>
                <h2>{this.state.login}</h2>
           </div>     
        );
    }

}
export default Avatar;