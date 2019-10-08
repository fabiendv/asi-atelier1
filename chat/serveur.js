
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io');
var ioServer = io(server);
const CONFIG = require('./config');
var express = require('express');
var md5 = require ('MD5');

app.use(express.static(CONFIG.publicDir));

var users={};
var messages={};


ioServer.on('connection', function(socket){
    var me;
    console.log('nouvel utilisateur');

    /** Récupérer la liste des utilisateurs */
    for( var k in users){
        socket.emit('newusr',users[k]);
    }

    socket.on('login', function(user){

        me=user;
        //** Ajout d'un nouvel utilisateur */
        ioServer.emit('newusr',me.username);

        /** Ajouter ce dernier à la liste d'utilisateurs en ligne */
        users[me.username]=me.username;

        //** Mettre le nom de l'utilisateur local */
        socket.emit('currentUser',me.username);
       
    })


    socket.on('disconnect',function(){
       
        delete users[me.username];
        ioServer.emit("deleteUser",me);
    })

    socket.on('messageSent',function(data){
        console.log("data"+data);
        date = new Date();
        data.hours = date.getHours();
        data.minutes = date.getMinutes();
        ioServer.emit("newMessage",data);

    })



});

server.listen(CONFIG.port, () => `App listenning on port ${CONFIG.port}`);
