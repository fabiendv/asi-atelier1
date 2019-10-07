import React, {Component} from 'react';
import './App.css';
import './bootstrap.min.css';
import Login from './login/Login';
import { connect } from 'react-redux';
import User from './user/containers/User';
import Menu from './Menu/Container/Menu';

class App extends Component {

  //class constructor whith given properties
  constructor(props) {
    super(props);
    
    //creation of an initial state, a json object
    this.state = {
        hasAccount:true,
        islogged:false,
    }; 
  }

  render(){

    let display=[];
    if(this.props.hasAccount){
      if(this.props.islogged){
        // return store view
      }
      // return Login view
      return(
        // Martin and Maxime work
        <Menu></Menu>
        // Fabien work
        // <Login hasAccount={this.props.hasAccount}>
        // </Login>
      );

    }else{
      // return Signup view
      return(
        <User 
        id="5"
        surname="Maxime"
        lastname="Delahodde"
        login="m-delahodee"
        pwd = "max"
        account="2.3"
        img=""
        display_type="USER_FORM"
    />  );
    }

  }

}

const mapState = (state, ownProps) => {
  return {
    hasAccount: state.loginReducer.hasaccount
  }
}

export default connect(mapState)(App);
