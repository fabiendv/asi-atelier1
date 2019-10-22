
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io');
var ioServer = io(server);
const CONFIG = require('./config');
var express = require('express');
var randomColor = require('randomcolor');
const stompit = require('stompit');

app.use(express.static(CONFIG.publicDir));

const connectOptions = {'host': 'localhost','port': 61616};

var users={};
var chats={};

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
        users[me.id]=me;

        //** Mettre le nom de l'utilisateur local */
        socket.emit('currentUser',me);
    })


    socket.on('disconnect',function(){
        if(me){
            delete users[me.id];
            ioServer.emit("deleteUser",me);
        }
    })

    socket.on('messageSent',function(data){

        console.log('Gotcha. I send a message.');

        console.log("This is my data:"+JSON.stringify(data));
        console.log("this is my user:"+JSON.stringify(users));
        data.color = users[data.id].usercolor;
        date = new Date();
        data.hours = date.getHours();
        data.minutes = date.getMinutes();

        // TODO: Need to send the data to ActiveMQ in order to save the historic in a log file via SpringBoot
        let me = users[data.id];
        let target = users[data.target];
        let chatLog;
        for (let chat in chats){
            if ((chat.userOneId == me.id && chat.userTwoId == target.id)
                || (chat.userOneId == target.id && chat.userTwoId == me.id)){
                    // le log existe deja
                    chatLog = chat;
            }
        }

        if (chatLog == undefined){
            // creation d'un log dans la DB
            let headers = {'destination': 'chatIn.queue'};
            stompit.connect(connectOptions, (error, client) => {
                if (error) {
                    returnconsole.error(error);
                }
                const frame = client.send(headers);
                frame.write('{"id":"","userOneId":"'+me.id+'","userTwoId":"'+target.id+'"}');
                frame.end();    
                client.disconnect();
            });
            // recupere le nouveau log
            headers = {'destination': 'chatOut.queue'};
            stompit.connect(connectOptions, (error, client) => {
                if (error) {
                    return console.error(error);    
                }    
                client.subscribe(headers, (error, message) => {
                    if (error) {
                        return console.error(error);        
                    }        
                    message.readString('utf-8', (error, body) => {
                        if (error) {
                            return console.error(error);            
                        }
                        console.log('received chatLog: ' + body); 
                        chatLog = JSON.parse(body);
                        chats[chatLog.id]=chatLog;       
                    });    
                });
            });
        }

        //log du nouveau message
        let headers = {'destination': 'chatIn.queue'};
            stompit.connect(connectOptions, (error, client) => {
                if (error) {
                    returnconsole.error(error);
                }
                const frame = client.send(headers);
                frame.write('{"id":"'+chatLog.id+'","username":"'+me.username+'","message":"'+data.message+'"}');
                frame.end();    
                client.disconnect();
            });
        

        // Broadcast example
        //ioServer.emit("newMessage",data); 
        
        //from https://dev.to/moz5691/socketio-for-simple-chatting---1k8nconsole.log
        ioServer.to(users[data.target].socketId).to(users[data.id].socketId).emit("newMessage",data);
    })

});

server.listen(CONFIG.port, () => `App listenning on port ${CONFIG.port}`);


