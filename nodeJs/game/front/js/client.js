var socket = io();

document.getElementById("play").addEventListener('click',function(){
    var username = Math.trunc(Math.random()*100);
    console.log(username);
    socket.emit("newPlayerIsWaiting",username);
})