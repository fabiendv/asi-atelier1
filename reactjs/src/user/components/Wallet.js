import React, { Component } from 'react';
class Wallet extends Component{


    constructor(props) {
        super(props);
        this.state = {
            account : props.account
        }
    }


    render() {

        return (
            <div>{this.state.account}€</div>        
        )
    }

}
export default Wallet;