import React, { Component } from 'react';

class Login extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);        
    }
  
     
  //render function use to update the virtual dom
  render() {

    return (
        <div className="container">
    
            <div className="col-md-6"> 
                <label><b>Username</b></label> 
                <input type="text" placeholder="Enter Username" name="uname" required/> 
    
                <label><b>Password</b></label> 
                <input type="password" placeholder="Enter Password" name="psw" required/> 
    
                <button type="submit">Login</button> 
            </div> 
    
            <div className="col-md-6" > 
                <span className="psw">
                    <a href="#">
                        Create an account
                    </a>
                </span> 
            </div> 
        </div>
    );
  }
}

export default Login;