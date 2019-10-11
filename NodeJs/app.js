var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io');
var ioServer = io(server);
const CONFIG = require('./config');
var express = require('express');

const Game  =require('./game/game'); 

app.use(express.static(CONFIG.publicDir));

let list_users_playroom = []

ioServer.on('connection', function(socket){
    console.log('nouvel utilisateur');

    socket.on("newPlayerIsWaiting",function(player){
        if(typeof list_users_playroom !== 'undefined' && list_users_playroom.length > 0){
            console.log("deja un utilisateur");

            //Création d'une nouvelle partie
            let player1 = list_users_playroom[0];
            let player2 = player;
            let game = new Game("",player1,player2);

            console.log(game);

            //Retirer premier joueur de la liste
            list_users_playroom.shift(); 

        }else{
            console.log("pas d'utilisateur");
            
            //Ajouter joueur à la liste d'attente
            list_users_playroom.push(player);
        }
    console.log(list_users_playroom);
    })

});


server.listen(CONFIG.port, () => `App listenning on port ${CONFIG.port}`);