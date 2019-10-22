
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io');
var ioServer = io(server);
const CONFIG = require('./config');
var express = require('express');
var randomColor = require('randomcolor');

app.use(express.static(CONFIG.publicDir));

var users={};

ioServer.on('connection', function(socket){
    var me;
    var color;
    
    console.log('Nouvelle socket detectee: '+socket.id);

    /** Récupérer la liste des utilisateurs */
    for( var k in users){
        socket.emit('newusr',users[k]);
    }

    socket.on('login', function(user){

        console.log('Nouvel user detecte: '+JSON.stringify(user));

        me=user;
        me.usercolor = randomColor();
        me.socketId = socket.id;
        //** Ajout d'un nouvel utilisateur */
        ioServer.emit('newusr',me);

        /** Ajouter ce dernier à la liste d'utilisateurs en ligne */
        users[me.username]=me;

        //** Mettre le nom de l'utilisateur local */
        socket.emit('currentUser',me);
    })


    socket.on('disconnect',function(){
        if(users[me.username]){
            delete users[me.username];
            ioServer.emit("deleteUser",me);
        }
    })

    socket.on('messageSent',function(data){

        console.log('Gotcha. I send a message.');

        console.log("This is my data:"+JSON.stringify(data));
        console.log("this is my user:"+JSON.stringify(users));
        data.color = users[data.username].usercolor;
        date = new Date();
        data.hours = date.getHours();
        data.minutes = date.getMinutes();

        // TODO: Need to send the data to ActiveMQ in order to save the historic in a log file via SpringBoot

        // Broadcast example
        //ioServer.emit("newMessage",data); 
        
        //from https://dev.to/moz5691/socketio-for-simple-chatting---1k8nconsole.log
        ioServer.to(users[data.target].socketId).to(users[data.username].socketId).emit("newMessage",data);
    })

});

server.listen(CONFIG.port, () => `App listenning on port ${CONFIG.port}`);


