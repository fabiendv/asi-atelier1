(function($){
    var socket = io();

    socket.emit('login', {
            
        username : Math.trunc(Math.random()*100),
        mail     : '@cpe.fr'       
    })
    socket.on('newusr', function(username){
       $('#users').append('<div class="item" id="'+username+'" data-value="jd"><i class="jd user circle icon"></i>'+username+'</div>')
    })

    socket.on('currentUser', function(username){
        $('#current-user').append('<div class="column" >'+username+'</div> ')
    })

    socket.on('deleteUser', function(user){
        document.getElementById(user.username).remove();
    })

    $( "button" ).click(function( event ) {
        var data={};
        data.message = $("textarea").val();
        data.username = $("#current-user .column:last-child").text();
        socket.emit("messageSent",data);
    });

    socket.on('newMessage',function(data){
        //console.log(JSON.stringify(color));
        $('#messages').append('<div class="ui raised segment"><a class="ui green ribbon label">'+data.username+'</a><span>'+data.hours+':'+data.minutes+'</span><p>'+data.message+'</p></div>') 
})

})(jQuery);