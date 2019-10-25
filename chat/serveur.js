
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io');
var ioServer = io(server);
const CONFIG = require('./config');
var express = require('express');
var randomColor = require('randomcolor');
const stompit = require('stompit');

app.use(express.static(CONFIG.publicDir));

const connectOptions = {
    'host': 'localhost',
    'port': 61613,
    'connectHeaders':{
        'host': '/',
        'login': 'admin',
        'passcode': 'admin'
    }
};

var users={};
var chats={};

ioServer.on('connection', function(socket){
    var me;
    var color;
    
    console.log('Nouvelle socket detectee: '+socket.id);

    socket.on('login', function(user){

        console.log('Nouvel user connecte: '+JSON.stringify(user));

        me=user;
        me.usercolor = randomColor();
        me.socketId = socket.id;
        console.log('users: ');
        console.log(users);
       
        /** Ajouter cet utilisateur à la liste d'utilisateurs en ligne */
        users[me.id]=me;

         //** Emettre la nouvelle liste pour tous les utilisateurs */
        ioServer.emit('updateYourTable', users);
    })

    // Lorsqu'un utilisateur se deconnecte: on l'enleve du tableau
    socket.on('logout',function(){
        if(me){
            delete users[me.id];
            //** Emettre la nouvelle liste pour tous les utilisateurs */
            ioServer.emit('updateYourTable',users);
        }
    })

    // Lorsqu'un utilisateur se deconnecte: on l'enleve du tableau
    socket.on('disconnect',function(){
        if(me){
            delete users[me.id];
            //** Emettre la nouvelle liste pour tous les utilisateurs */
            ioServer.emit('updateYourTable',users);
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
        data.date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        data.time = date.getHours() + "." + date.getMinutes() + "." + date.getSeconds();

        let me = users[data.id];
        let target = users[data.target];
        let chatLog;
        for (let i in chats){
            let chat = chats[i];
            if ((chat.userOneId === me.id.toString() && chat.userTwoId === target.id.toString())
                || (chat.userOneId === target.id.toString() && chat.userTwoId === me.id.toString())){
                    // le log existe deja
                    chatLog = chat;
            }
        }

        if (chatLog == undefined){
            // creation d'un log dans la DB
            console.log("unknow chatlog");
            let headersIn = {'destination': 'chatIn.queue'};
            stompit.connect(connectOptions, (error, client) => {
                if (error) {
                    console.log("err")
                    return console.error(error);
                }
                const frame = client.send(headersIn);
                frame.write('{"id":"","userOneId":"'+me.id+'","userTwoId":"'+target.id+'"}');
                frame.end();    
                client.disconnect();
            });
        }
        else{
            console.log(chatLog);
            //log du nouveau message
            let headersIn = {'destination': 'chatIn.queue'};
            stompit.connect(connectOptions, (error, client) => {
                if (error) {
                    return console.error(error);
                }
                const frame = client.send(headersIn);
                frame.write('{"id":"'+chatLog.id+'","username":"'+me.username+'","message":"'+data.message+'","date":"'+data.date+'","time":"'+data.time+'"}');
                frame.end();    
                client.disconnect();
            });
        }
        // Ecoute de message sur la queue de reponse
        headersOut = {'destination': 'chatOut.queue'};
        stompit.connect(connectOptions, (error, client) => {
            if (error) {
                return console.error(error);    
            }    
            client.subscribe(headersOut, (error, message) => {
                if (error) {
                    return console.error(error);        
                }        
                message.readString('utf-8', (error, body) => {
                    if (error) {
                        return console.error(error);            
                    }
                    console.log('received message: ' + body);

                    if (JSON.parse(body).data === ""){
                        chatLog = JSON.parse(body);
                        chats[chatLog.id]=chatLog; 

                        //log du nouveau message
                        let headersIn = {'destination': 'chatIn.queue'};
                        stompit.connect(connectOptions, (error, client) => {
                            if (error) {
                                return console.error(error);
                            }
                            const frame = client.send(headersIn);
                            frame.write('{"id":"'+chatLog.id+'","username":"'+me.username+'","message":"'+data.message+'","date":"'+data.date+'","time":"'+data.time+'"}');
                            frame.end();    
                            client.disconnect();
                        });
                    }
                    else{
                        //no change in the log
                        console.log('null');
                    }
                });    
            });
        });

        // Broadcast example
        //ioServer.emit("newMessage",data); 
        
        //from https://dev.to/moz5691/socketio-for-simple-chatting---1k8nconsole.log
        ioServer.to(target.socketId).to(me.socketId).emit("newMessage",data);
    })

});

server.listen(CONFIG.port, () => `App listenning on port ${CONFIG.port}`);


