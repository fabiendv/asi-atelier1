(function($){
    var socket = io();
    var messages = [];

    socket.emit('login', {
            
        username : Math.trunc(Math.random()*100),
        mail     : '@cpe.fr',  
        usercolor:''  
    })

    socket.on('newusr', function(user){
       $('#users').append('<div class="item" id="'+user.username+'" data-value="jd"><i class="jd user circle icon"></i>'+user.username+'</div>')
    })

    socket.on('currentUser', function(user){
        $('#current-user').append('<div class="column">'+user.username+'</div> ')
    })

    socket.on('deleteUser', function(user){
        document.getElementById(user.username).remove();
    })

    $( "button" ).click(function( event ) {
        var data={};
        data.message = $("textarea").val();
        data.username = $("#current-user .column:last-child").text();
        data.target = document.getElementById("users").getElementsByClassName("active selected")[0].id;
        socket.emit("messageSent",data);
        $("textarea").val('');
        
    });


    socket.on('newMessage',function(data){
        if(data.username == $("#current-user .column:last-child").text()){
            $('#messages').append('<div class="ui raised segment"><a class="ui ribbon label" style="background-color:'+data.color+'">'+data.username+'</a><span>'+data.hours+':'+data.minutes+'</span><p>'+data.message+'</p></div>')        
        }else{
            $('#messages').append('<div class="ui raised segment"><a class="ui right ribbon label" style="background-color:'+data.color+'">'+data.username+'</a><span>'+data.hours+':'+data.minutes+'</span><p>'+data.message+'</p></div>')
        } 
    })

})(jQuery);