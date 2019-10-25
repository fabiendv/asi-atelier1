import React from 'react';
import { connect } from 'react-redux';

import {setLoginPage} from '../../actions';

 class UserForm extends React.Component{
     
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            surname:"",
            lastname:"",
            img:"",
            login:"",
            pwd:"",
            money:0,
        };
        this.processInput=this.processInput.bind(this);
        this.submitOrder=this.submitOrder.bind(this);
        this.handleLoginPageSelected = this.handleLoginPageSelected.bind(this);
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

    submitOrder(){

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

        if (fillFields === true){
            this.props.submitUserHandler(this.state);
            this.handleLoginPageSelected(this.props.hasAccount);
        } else{
            form.getElementsByClassName('error')[0].style.display = "block";
        }
    }

    handleLoginPageSelected(hasAccount){
        return this.props.dispatch(setLoginPage(true,false));   
    }

    render() {
        return (
            <div className="ui middle aligned center aligned grid">
            <div className="column">
            <form className="ui large form">
            <div className="ui stacked secondary segment">
                {/* <div className="field hidden content">
                    <label>Id</label>
                    <input type="number" name="id" placeholder="0" onChange={(ev)=>{this.processInput(ev)}} value={this.state.id}></input>
                </div> */}
                <div className="field">
                    <label>Name</label>
                    <div className="two fields">
                        <div className="field">
                            <input className="text" name="surname"required placeholder="FirstName" onChange={(ev)=>{this.processInput(ev)}} value={this.state.surname}></input>
                        </div>
                        <div className="field">
                        <input className="text" name="lastname" required placeholder="LastName" onChange={(ev)=>{this.processInput(ev)}} value={this.state.lastname}></input>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="login" placeholder="Bob44" required onChange={(ev)=>{this.processInput(ev)}} value={this.state.login}></input>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="pwd" placeholder="edmGRdv$cd564" required onChange={(ev)=>{this.processInput(ev)}} value={this.state.pwd}></input>
                </div>
                <div className="field">
                    <label>Image</label>
                    <input type="text" name="img" required placeholder="https://gravatar.com/avatar/e7a1f42bd1cea215be40c39abcc845d3?s=400&d=robohash&r=x" onChange={(ev)=>{this.processInput(ev)}} value={this.state.img}></input>
                </div>
                <div className="field">
                    <label>Money</label>
                    <input type="number" name="money" required placeholder="10000" onChange={(ev)=>{this.processInput(ev)}} value={this.state.money}></input>
                </div>
                <div className="ui fluid large teal submit button" tabIndex="1" onClick={()=> this.submitOrder()}>
                    Create Account
                </div>
                <div className="ui fluid large back submit button" tabIndex="1" onClick={()=>this.handleLoginPageSelected(this.props.hasAccount)}>
                    Back
                </div>
                </div>

                <div className="ui error message">
                    <div className="header">
                        All fields must be completed !
                    </div>
                        Please fill in the fields in red above            
                </div>
            </form>
            
            </div>
            </div>
        );
        }

    }
    export default connect()(UserForm);
