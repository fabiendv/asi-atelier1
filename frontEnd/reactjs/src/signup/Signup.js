import React, { Component } from 'react';

class Signup extends Component {
    //class constructor whith given properties
    constructor(props) {
        super(props);        
    }
  
     
  //render function use to update the virtual dom
  render() {

    return (
        <div className="container">
            <div className="col-md-6">
                <h1>Signup</h1>
            </div>
            <div className="col-md-7"> 
                <label><b>Username</b></label> 
                <input type="text" placeholder="Enter Username" name="uname" required/> 
    
                <label><b>Password</b></label> 
                <input type="password" placeholder="Enter Password" name="psw" required/> 
    
                <label><b>Repeat password</b></label> 
                <input type="password" placeholder="Repeat Password" name="rpsw" required/> 

                <button type="submit">Sign up</button> 
            </div> 
    
        </div>
    );
  }
}

export default Signup;