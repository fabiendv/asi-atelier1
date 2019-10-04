import React, {Component} from 'react';

import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import Login from './login/Login';
import Signup from './signup/Signup';

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

  // if(islogged){
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //       </div>
  //   );
  // }else{
  //   return (
  //     <Login />
  //   );
  // }

  render(){

    if(this.state.hasAccount){
      if(this.state.islogged){
        // return store view
      }
      // return Login view
      return(<Login></Login>);

    }else{
      // return Signup view
      return(<Signup></Signup>);
    }

  }

}

export default App;
