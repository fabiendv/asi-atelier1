import React, { Component } from 'react';
import Wallet from "../components/Wallet";
import Avatar from "../components/Avatar";
import UserForm from "../components/UserForm";
import { connect } from 'react-redux';
import {setLoginPage} from '../../actions';
const axios = require('axios').default;

 class User extends Component{
    WALLET_LABEL='WALLET';
    AVATAR_LABEL='AVATAR';
    USER_FORM_LABEL='USER_FORM';
    
   constructor(props) {
       super(props);
       this.state = {
           id:this.props.id,
           surname:this.props.surname,
           lastname:this.props.lastname,
           login:this.props.login,
           pwd:this.props.pwd,
           account:this.props.account,
           img:this.props.img,
           display_type:this.props.display_type
       };

       this.submitUserHandler=this.submitUserHandler.bind(this);
    }

    submitUserHandler(data){
        var that = this;
        
        // AJAX INSCRIRE USER
        axios({
            method: 'post',
            baseURL: 'http://localhost:8082',
            url: `/user`,
            data:{
                //id:data.id,
                surname:data.surname,
                lastname:data.lastname,
                login:data.login,
                pwd:data.pwd,
                account:data.money,
                img:data.img
            },
            headers:{
                'Access-Control-Allow-Origin':'*'
            }
        })
        .then(function(response){
            // Created user
            console.log("Added user : ");
            console.log(response);
            that.setState({
                id:response.data.id,
                surname:response.data.surName,
                lastname:response.data.lastName,
                login:response.data.login,
                pwd:response.data.pwd,
                account:response.data.account,
                img:data.img,
            });
            // REDIRIGER TO LOGIN
            return this.props.dispatch(setLoginPage(true)); 
        })
        .catch(function(error){
            console.log(error);
            // REDIRIGER TO SIGNUP
            // return this.props.dispatch(setLoginPage(true)); 
        });

    }

       render() {
           let display="";
           switch(this.props.display_type){
               case this.WALLET_LABEL:
                       display=(                
                           <Wallet
                               account={this.props.account}
                           />
                       );
                   break;
               case this.AVATAR_LABEL:
                       display=(                
                           <Avatar 
                               login={this.props.login} 
                           />
                       );
                   break;
               case this.USER_FORM_LABEL:
                       display=(                
                           <UserForm 
                                submitUserHandler={this.submitUserHandler}
                           />
                       );
                   break;
                default:
               }
           return display;
         }

   }
   export default connect()(User);
