var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io');
var ioServer = io(server);
const CONFIG = require('./config');
var express = require('express');

const Game  =require('./game/game'); 

let list_users_playroom = []

ioServer.on('connection', function(socket){
    console.log('Nouvel utilisateur.');

    socket.on("newPlayerIsWaiting",function(user){
        if(typeof list_users_playroom !== 'undefined' && list_users_playroom.length > 0){
            console.log("deja un utilisateur");

            //Création d'une nouvelle partie
            let player1 = list_users_playroom[0];
            let player2 = user;
            player2.socketID = socket.id;
            let game = new Game("",player1,player2);

            // console.log(game);

            //Retirer premier joueur de la liste
            list_users_playroom.shift(); 
            // console.log(socket.id);
            ioServer.to(player1.socketID).to(player2.socketID).emit("launchGame",player1, player2);

            console.log("player1socketID"+player1.socketID);
            console.log("player2socketID"+player2.socketID);

        }else{
            console.log("Pas d'utilisateur en attente.");
            
            let User = {};
            //Ajouter joueur à la liste d'attente
            User = user;
            User.socketID = socket.id;
            list_users_playroom.push(User);
        }

    })


    socket.on("attack", function(data){
        console.log("This is my victim socketId: "+data.victim.socketID);
        console.log("This is my user socketId: "+data.user.socketID);
        console.log("This is my attackValue: "+JSON.stringify(data.attackValue));
        ioServer.to(data.victim.socketID).to(data.user.socketID).emit("handleAttack",data.attackValue);
        // ioServer.to(data.victim.socketID).to(data.user.socketID).emit("launchGame",data.user, data.user);
        // socket.emit("handleAttack",data.attackValue);
    })

    socket.on("switchTurn", function(data){
        ioServer.to(data.turnNext.socketID).emit("handleEndTurn");
        console.log("ok martin");
    })

});


server.listen(CONFIG.port, () => `App listenning on port ${CONFIG.port}`);