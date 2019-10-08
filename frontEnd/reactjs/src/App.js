import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Login from './login/Login';
import { connect } from 'react-redux';
import User from './user/containers/User';
import Menu from './Menu/Container/Menu';
import Navbar from './navbar/container/navbar'

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

        // <Login hasAccount={this.props.hasAccount}>
        // </Login>

        //Store view
         <div>
           <Navbar></Navbar>
            <Menu></Menu>
         </div>
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
