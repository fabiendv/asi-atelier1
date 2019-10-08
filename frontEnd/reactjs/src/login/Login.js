import React, { Component } from 'react';
import { connect } from 'react-redux';

import {setSignupPage} from '../actions';


class Login extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);      
        this.handleSignupPageSelected = this.handleSignupPageSelected.bind(this);
    }

    handleSignupPageSelected(hasAccount){
        return this.props.dispatch(setSignupPage(hasAccount));   
    }
     
    //render function use to update the virtual dom
    render() {

        return (
            <div className="container">
                <div className="col-md-6">
                    <h1>Login</h1>
                </div>
                <div className="col-md-6"> 
                    <label><b>Username</b></label> 
                    <input type="text" placeholder="Enter Username" name="uname" required/> 
        
                    <label><b>Password</b></label> 
                    <input type="password" placeholder="Enter Password" name="psw" required/> 
        
                    <button className="btn btn-lg btn-info" type="submit">
                        Login
                    </button> 
                </div> 
        
                <div className="col-md-6">
                    <div className="btn btn-lg btn-dark" onClick={()=>{this.handleSignupPageSelected(this.props.hasAccount)}}>
                    Create an account
                    </div>
                </div> 
            </div>
        );
    }
}

export default connect()(Login);