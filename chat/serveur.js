
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
    console.log('nouvel utilisateur');

    /** Récupérer la liste des utilisateurs */
    for( var k in users){
        socket.emit('newusr',users[k]);
    }

    socket.on('login', function(user){
        me=user;
        me.usercolor = randomColor();
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
        console.log("message recu cote serveur");
        data.color = users[data.username].usercolor;
        date = new Date();
        data.hours = date.getHours();
        data.minutes = date.getMinutes();
        //ioServer.emit("newMessage",data); //brocoast
        //socket.broadcast.to(data.target).emit("newMessage",data);  //from https://dev.to/moz5691/socketio-for-simple-chatting---1k8n
        io.in('room1').emit('newMessage',data);
        console.log("message renvoye pour destinataire : "+ data.target);
    })

    socket.on('createRoom', function(data){
        socket.join('room1');
        ioServer.in('room1').emit("newMessage", data);
    })

});

server.listen(CONFIG.port, () => `App listenning on port ${CONFIG.port}`);
