import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import Login from './login/Login';
import Signup from './signup/Signup';

function App() {
  // user is connected
  // var islogged = true;

  // user is not connected
  var islogged = false;

  // if there is a connected user
  if(islogged){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        </div>
    );
  }else{
    return (
      <Login />
    );
  }

}

export default App;
