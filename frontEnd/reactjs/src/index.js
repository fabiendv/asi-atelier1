import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './lib/main.css';
import './lib/animate.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import globalReducer from './reducers';

import Chat from './chat/containers/chat'
import Game from './play/components/game/containers/game';
let socket = require('socket.io-client')('http://localhost:1337');
let user;
let test = Math.random()*100;
if(test<10){
    user = {"id":1,"login":"max","pwd":"max","account":5614651400,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":55,"name":"name74","description":"description74","family":"family74","affinity":"affinity74","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100,"hp":500,"defence":26,"attack":58,"price":231,"user":57,"store":null}]}
}else if(test<20){
    user = {"id":2,"login":"fabien","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}]}
}else if(test<30){
    user = {"id":3,"login":"jacques","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}]}
}else if(test<40){
    user = {"id":4,"login":"martin","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}]}
}else if(test<50){
    user = {"id":5,"login":"thibault","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}]}
}else if(test<60){
    user = {"id":6,"login":"balbal","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}]}
}else if(test<70){
    user = {"id":7,"login":"test","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}]}
}else if(test<80){
    user = {"id":8,"login":"what","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}]}
}else if(test<90){
    user = {"id":9,"login":"why","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}]}
}else if(test<=100){
    user = {"id":10,"login":"okkk","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}]}
}

// user = {"id":57,"login":"max","pwd":"max","account":5614651400,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":55,"name":"name74","description":"description74","family":"family74","affinity":"affinity74","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100,"hp":500,"defence":26,"attack":58,"price":231,"user":57,"store":null}]}
// user = {"id":58,"login":"fabien","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}]}

let player1 = {"id":57,"login":"max","pwd":"max","account":5614651400,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":55,"name":"name74","description":"description74","family":"family74","affinity":"affinity74","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100,"hp":500,"defence":26,"attack":58,"price":231,"user":57,"store":null}],"socketID":"q8TtmnO1S-uPCHPuAAAI"}
let player2 = {"id":58,"login":"fabien","pwd":"fabien","account":51000,"lastName":"lastname_default","surName":"surname_default","email":"email_default","cardList":[{"id":54,"name":"name73","description":"description73","family":"family74","affinity":"affinity73","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":88,"hp":600,"defence":13,"attack":58,"price":200,"user":58,"store":null}], "socketID":"q8TtmnO1S-uPCHPuAAAI"}

const store = createStore(globalReducer);
// Game test
//ReactDOM.render(<Provider store={store}><Game user={user} socket={socket} player1={player1} player2={player2}></Chat></Provider>, document.getElementById('root'));

// Chat test
ReactDOM.render(<Provider store={store}><Chat user={user}></Chat></Provider>, document.getElementById('root'));

// Real APP
//ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
