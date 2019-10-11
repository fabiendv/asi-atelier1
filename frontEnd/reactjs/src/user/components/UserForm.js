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
        let currentVal=this.state;
        this.setState({
            [name]: value
          });
        // console.log(this.state);
    }

    submitOrder(){
        this.props.submitUserHandler(this.state);
        this.handleLoginPageSelected(this.props.hasAccount);
    }

    handleLoginPageSelected(hasAccount){
        return this.props.dispatch(setLoginPage(true,false));   
    }

    render() {
        return (
            <form className="ui form">
                <h4 className="ui dividing header">User Registration</h4>
                <div className="field">
                    <label>Id</label>
                    <input type="number" name="id" placeholder="0" onChange={(ev)=>{this.processInput(ev)}} value={this.state.id}></input>
                </div>
                <div className="field">
                    <label>Name</label>
                    <div className="two fields">
                        <div className="field">
                            <input className="text" name="surname" placeholder="SurName" onChange={(ev)=>{this.processInput(ev)}} value={this.state.surname}></input>
                        </div>
                        <div className="field">
                        <input className="text" name="lastname" placeholder="LastName" onChange={(ev)=>{this.processInput(ev)}} value={this.state.lastname}></input>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Login</label>
                    <input type="text" name="login" placeholder="Login" onChange={(ev)=>{this.processInput(ev)}} value={this.state.login}></input>
                </div>
                <div className="field">
                    <label>Pwd</label>
                    <input type="password" name="pwd" placeholder="" onChange={(ev)=>{this.processInput(ev)}} value={this.state.pwd}></input>
                </div>
                <div className="field">
                    <label>Image</label>
                    <input type="text" name="img" placeholder="Image" onChange={(ev)=>{this.processInput(ev)}} value={this.state.img}></input>
                </div>
                <div className="field">
                    <label>Money</label>
                    <input type="number" name="money" placeholder="" onChange={(ev)=>{this.processInput(ev)}} value={this.state.money}></input>
                </div>
                <div className="btn btn-dark" tabIndex="1" onClick={()=> this.submitOrder()}>
                    Submit User
                </div>
                <div className="btn btn-light" tabIndex="1" onClick={()=>this.handleLoginPageSelected(this.props.hasAccount)}>
                    Back
                </div>
            </form>
        );
        }

    }
    export default connect()(UserForm);
