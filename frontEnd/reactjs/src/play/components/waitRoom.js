import React, { Component } from 'react';

class WaitRoom extends Component{

    constructor(props) {
        super(props);
        this.state = {
       
        }
    }

    testNotif(){
        console.log("tet")
       
        
    }

    render() {

        return (
                <div className="center-container">
                    <h3 onClick={this.testNotif()}>Waiting for another player</h3>
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            
        );

    }

}
export default WaitRoom;