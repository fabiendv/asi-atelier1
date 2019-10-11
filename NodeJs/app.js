var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io');
var ioServer = io(server);
const CONFIG = require('./config');
var express = require('express');

const Game  =require('./game/game'); 

let list_users_playroom = []

ioServer.on('connection', function(socket){
    console.log('nouvel utilisateur');

    socket.on("newPlayerIsWaiting",function(user){
        if(typeof list_users_playroom !== 'undefined' && list_users_playroom.length > 0){
            console.log("deja un utilisateur");

            //Création d'une nouvelle partie
            let player1 = list_users_playroom[0];
            let player2 = user;
            player2.socketID = socket.id;
            let game = new Game("",player1,player2);

            console.log(game);

            //Retirer premier joueur de la liste
            list_users_playroom.shift(); 
            console.log(socket.id);
            ioServer.to(player1.socketID).to(socket.id).emit("launchGame");

        }else{
            console.log("pas d'utilisateur");
            
            let User = {};
            //Ajouter joueur à la liste d'attente
            User = user;
            User.socketID = socket.id;
            list_users_playroom.push(User);
        }

    })

});


server.listen(CONFIG.port, () => `App listenning on port ${CONFIG.port}`);