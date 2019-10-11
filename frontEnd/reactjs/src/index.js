import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './lib/main.css';
import './lib/animate.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import globalReducer from './reducers';
import Play from "./play/containers/play"


const store = createStore(globalReducer);

ReactDOM.render(<Provider store={store} ><Play /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
