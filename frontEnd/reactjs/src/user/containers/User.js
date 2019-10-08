import React, { Component } from 'react';
import Wallet from "../components/Wallet";
import Avatar from "../components/Avatar";
import UserForm from "../components/UserForm";

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
            this.setState({
                id:data.id,
                surname:data.surname,
                lastname:data.lastname,
                login:data.login,
                pwd:data.pwd,
                account:data.money,
                img:data.img,
              });

            console.log("user to submit: "+JSON.stringify(data));
          // AJAX INSCRIRE USER
          // REDIRIGER LOGIN

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
               }
           return display;
         }

   }
   export default User;
