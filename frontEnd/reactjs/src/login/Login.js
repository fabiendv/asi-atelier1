import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createAccount, setLoginPage, setUserSession} from '../actions';
import { setMainMenuPage } from '../actions';

import Swal from 'sweetalert2'

const axios = require('axios').default;

/*wal.fire({
   
    title: 'Congratulations !',
    text: 'You win your game against Fabien !',
    imageUrl: 'https://i.ibb.co/VQxZKJC/trophy.png',
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: 'trophy',
    confirmButtonColor: '#2c2c2c',
    confirmButtonText: 'Return to the home page',
    backdrop: `
    rgba(0,0,123,0.4)
    url("https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif")
    center left
    round
  `
  }).then((result) => {
            if (result.value) {
                this.props.dispatch(setMainMenuPage());
            }
    })
          
          */
         /*
         Swal.fire({
            type: 'error',
            title: 'Too bad ...',
            text: 'You loose your game against Martin !',
            confirmButtonColor: '#2c2c2c',
            confirmButtonText: 'Return to the home page',
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://media.giphy.com/media/psmj4cmTGQQ0We0Uyf/giphy.gif")
            center left
            no-repeat
          `
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(setMainMenuPage());
            }
          })*/

       

class Login extends Component {
    //className constructor whith given properties
    constructor(props) {
        super(props);      
        this.state = {
            login:"",
            pwd:"",
        };
        this.processInput=this.processInput.bind(this);
        this.submitLogin=this.submitLogin.bind(this);
        this.checkRequiredFields=this.checkRequiredFields.bind(this);
        this.handleSignupPageSelected = this.handleSignupPageSelected.bind(this);
    }

    processInput(event){
        const target = event.currentTarget;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // console.log(event.target.value);
        //let currentVal=this.state;
        this.setState({
            [name]: value
          });
        // console.log(this.state);
    }

    checkRequiredFields(){
        var form = document.getElementsByTagName('form')[0];
        var fillFields = true;
        for(var i=0; i < form.elements.length; i++){
            if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
            form.elements[i].style.borderColor = 'red';
            fillFields = false;
            }else{
                form.elements[i].style.borderColor = 'rgba(34,36,38,.15)';
            }    
        }

        return fillFields;
    }

    submitLogin(){
       

        var form = document.getElementsByTagName('form')[0];
        let fillFields = this.checkRequiredFields();

        if(fillFields === true){
            console.log("User to login: "+JSON.stringify(this.state));
            // AJAX INSCRIRE USER
            let that=this;

            axios({
                method: 'get',
                baseURL: 'http://localhost:8082',
                url:`/auth?login=${this.state.login}&pwd=${this.state.pwd}`,
                headers:{
                    'Access-Control-Allow-Origin':'*'
                }
            })
            .then(function(response){
                console.log("response: "+response.data);
                if(response.data){
                // REDIRIGER TO STORE VIEW
                    // Get user's information
                    axios({
                        method: 'get',
                        baseURL: 'http://localhost:8082',
                        url:`/users`,
                        headers:{
                            'Access-Control-Allow-Origin':'*'
                        }
                    }).then(function(user){
                        console.log('Login :'+JSON.stringify(that.state.login));

                        user.data.forEach(function(element){
                            if(that.state.login===element.login){
                                return that.props.dispatch(setUserSession(element));
                            }
                        });

                    }).catch(function(error){
                        console.log("error"+error);
                    })

                }else{
                    // Stay on login page
                    return that.props.dispatch(setLoginPage(true,response.data));
                }
            })
            .catch(function(error){
                console.log("error"+error);
                form.getElementsByClassName('error')[0].style.display = "block";
                form.getElementsByClassName('error')[0].innerHTML = "The username and password entered do not match any accounts. Please try again.";
                // REDIRIGER TO LOGIN - MAYBE
            });

        }else{
            form.getElementsByClassName('error')[0].style.display = "block";
            form.getElementsByClassName('error')[0].innerHTML = "All fields must be completed !";
        }

        
    }

    handleSignupPageSelected(hasAccount){
        return this.props.dispatch(createAccount(hasAccount));   
    }
     
    //render function use to update the virtual dom
    render() {

        return (
         /*    <form classNameName="ui form">

                <div classNameName="col-md-6"> 
                    <label>
                        <b>
                            Username
                        </b>
                    </label> 
                    <input type="text" placeholder="Enter Username" name="login" onChange={(ev)=>{this.processInput(ev)}} required/> 
        
                    <label>
                        <b>
                            Password
                        </b>
                    </label> 
                    <input type="password" placeholder="Enter Password" name="pwd" onChange={(ev)=>{this.processInput(ev)}} required/> 
                    
                    <button classNameName="btn btn-lg btn-login" type="button" onClick={()=>{this.submitLogin()}}>
                        Login
                    </button> 
                </div> 
        
                <div classNameName="col-md-6">
                    <div classNameName="btn btn-lg btn-custom" onClick={()=>{this.handleSignupPageSelected(false)}}>
                        Create an account
                    </div>
                </div> 
            </form> */
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                <form className="ui large form">
                    <div className="ui stacked secondary segment">
                    <div className="field">
                        <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="login" required onChange={(ev)=>{this.processInput(ev)}} placeholder="Username" />
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input type="password" name="pwd"  required onChange={(ev)=>{this.processInput(ev)}} placeholder="Password" />
                        </div>
                    </div>
                    <div className="ui fluid large teal submit button" onClick={()=>{this.submitLogin()}}>Login</div>
                    </div>
            
                    <div className="ui error message">
                        
                    </div>

                </form>
            
                <div className="ui message">
                    New to us? <span className="register" onClick={()=>{this.handleSignupPageSelected(false)}}>Register</span>
                </div>
                </div>
            </div>
        );
    }
}

export default connect()(Login);