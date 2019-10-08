(function($){

    var socket = io();

    socket.emit('login', {
            
        username : Math.random()*100,
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

    socket.on('newMessage',function(message){
        console.log(message.hours);
    })

})(jQuery);