import React, {Component} from 'react';
import './App.css';
import './Semantic-UI-CSS-master/semantic.min.css';
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
    }; 
  }

  render(){

    let display;
  
    if(this.props.hasAccount || this.props.hasAccount === "undefined"){  
      if(this.props.islogged){
        display = (
          <div>
            <Navbar
              isLogged="true"
              name="JDoe"
              title="Home"
              money="500"
            /> 
            <Menu/>
          </div>
        );
        
        // return store view
      }else{
        // return Login view
        display = (

          <div>  
          
            <Navbar
              isLogged="false"
              name=""
              title="Sign In"
              money=""
            /> 

            <Login>
            </Login>

          </div>
        );
      }
      

    }else{
      // return Signup view
      display = (
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

    return display;

  }

}

const mapState = (state, ownProps) => {
  console.log(JSON.stringify(state));
  return {
    hasAccount: state.loginReducer.hasaccount,
  }
}

export default connect(mapState)(App);
