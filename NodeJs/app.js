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

            console.log(player1.id);
            console.log(player2.id);
            
            
            if(player1.id!==player2.id){
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
                let User = {};
                User = user;
                User.socketID = socket.id;
                list_users_playroom.push(User);
            }

            
            

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
        // On verifie que la carte qui defend a encore des points de vie
        if(data.defendingCard.hp>0){
            // On calcule les dommages qui vont etre envoyes.
            console.log("attack card:"+data.attackingCard.attack);
            console.log("defence card:"+data.defendingCard.defence);

            var realAttackValue = data.attackingCard.attack - data.defendingCard.defence;
            // Si les dommages sont negatifs ou nuls, l'attaque sera de 1 pdv
            if(realAttackValue<=0){
                realAttackValue=1;
            }
            console.log("defending hp:"+data.defendingCard.hp);
            console.log("attack value:"+realAttackValue);

            // Si il reste des pdv a la carte qui se fait attaquer APRES CETTE ATTAQUE
            if(data.defendingCard.hp>realAttackValue){
                // On met a jour les pdv restant
                var newDefendingCardHp = data.defendingCard.hp - realAttackValue;
                console.log("J'envoie la nouvelle valeur de hp pour le defenseur: "+newDefendingCardHp);
                ioServer.to(data.victim.socketID).emit("sendAttack",newDefendingCardHp);
                console.log("J'envoie la nouvelle valeur de hp pour l'attaquant: "+newDefendingCardHp);
                ioServer.to(data.user.socketID).emit("confirmedAttack",newDefendingCardHp);
            }else{
                // La carte qui defend est tuee: le defenseur perds
                ioServer.to(data.victim.socketID).emit("youLoose");
                // L'attaquant gagne
                ioServer.to(data.user.socketID).emit("youWin");
            }
        }else{
            // la carte qui recoit l'attaque n'est pas autorisee a jouer: elle est deja tuee
        }

    })

    socket.on("switchTurn", function(data){
        ioServer.to(data.turnNext.socketID).emit("sendEndTurn");
    })

});


server.listen(CONFIG.port, () => `App listenning on port ${CONFIG.port}`);