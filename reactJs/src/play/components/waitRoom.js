import React, { Component } from 'react';

class WaitRoom extends Component{

    constructor(props) {
        super(props);
        this.state = {
       
        }
    }

    render() {

        return (
                <div className="center-container">
                    <h3>Waiting for another player</h3>
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            
        );

    }

}
export default WaitRoom;