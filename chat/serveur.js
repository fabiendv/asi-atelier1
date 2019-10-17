
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io');
var ioServer = io(server);
const CONFIG = require('./config');
var express = require('express');
var md5 = require ('MD5');
var randomColor = require('randomcolor');

app.use(express.static(CONFIG.publicDir));

var users={};

ioServer.on('connection', function(socket){
    var me;
    var color;
    console.log('Nouvel utilisateur: '+socket.id);

    /** Récupérer la liste des utilisateurs */
    for( var k in users){
        socket.emit('newusr',users[k]);
    }

    socket.on('login', function(user){
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
        delete users[me.username];
        ioServer.emit("deleteUser",me);
    })

    socket.on('messageSent',function(data){
        data.color = users[data.username].usercolor;
        date = new Date();
        data.hours = date.getHours();
        data.minutes = date.getMinutes();
        //ioServer.emit("newMessage",data); //brocoast
        console.log("Sender: "+users[data.username].socketId);
        console.log("Receiver: "+users[data.target].socketId);
        ioServer.to(users[data.target].socketId).to(users[data.username].socketId).emit("newMessage",data);//from https://dev.to/moz5691/socketio-for-simple-chatting---1k8nconsole.log
    })

});

server.listen(CONFIG.port, () => `App listenning on port ${CONFIG.port}`);


