import React, {Component} from 'react';
import $ from 'jquery';

const socket = require('socket.io-client')('http://localhost:1338');

class Chat extends Component{

	constructor(props){
		super(props);
		this.state = {
		};
	}

	// componentWillMount(){
	// 	let that = this;
	// 	window.$ = $;
    //     that.setState({view:"wait"});
	// 	let username = document.getElementById;
	// 	console.log("I AM IN WILLMOUNT");
    //     let socket = require('socket.io-client')('http://localhost:1338');
	// 	socket.emit('login', {
	// 		username : Math.trunc(Math.random()*100),
	// 		mail     : '@cpe.fr',  
	// 		usercolor:''  
	// 	});
	
	// 	socket.on('newusr', function(user){
	// 		console.log("There is a new user: "+JSON.stringify(user));
	// 	   $('#users').append('<div class="item" id="'+user.username+'" data-value="jd"><i class="jd user circle icon"></i>'+user.username+'</div>')
	// 	});
	
	// 	socket.on('currentUser', function(user){
	// 		console.log("I am in currentUser: "+JSON.stringify(user));
	// 		$('#current-user').append('<div class="column">'+user.username+'</div> ')
	// 	});
	
	// 	socket.on('deleteUser', function(user){
	// 		document.getElementById(user.username).remove();
	// 	});
	
	// 	$( "button" ).click(function( event ) {
	// 		var data={};
	// 		data.message = $("textarea").val();
	// 		data.username = $("#current-user .column:last-child").text();
	// 		data.target = document.getElementById("users").getElementsByClassName("active selected")[0].id;
	// 		socket.emit("messageSent",data);
	// 		$("textarea").val('');
	// 	});
	
	
	// 	socket.on('newMessage',function(data){
	// 		if(data.username == $("#current-user .column:last-child").text()){
	// 			$('#messages').append('<div class="ui raised segment"><a class="ui ribbon label" style="background-color:'+data.color+'">'+data.username+'</a><span>'+data.hours+':'+data.minutes+'</span><p>'+data.message+'</p></div>')        
	// 		}else{
	// 			$('#messages').append('<div class="ui raised segment"><a class="ui right ribbon label" style="background-color:'+data.color+'">'+data.username+'</a><span>'+data.hours+':'+data.minutes+'</span><p>'+data.message+'</p></div>')
	// 		} 
	// 	});
    // }

	render(){
		window.$ = $;
		socket.emit('login', {
			username : Math.trunc(Math.random()*100),
			mail     : '@cpe.fr',  
			usercolor:''  
		});
		socket.on('newusr', function(user){
			console.log("There is a new user: "+JSON.stringify(user));
		   $('#users').append('<div class="item" id="'+user.username+'" data-value="jd"><i class="jd user circle icon"></i>'+user.username+'</div>')
		});
	
		socket.on('currentUser', function(user){
			console.log("I am in currentUser: "+JSON.stringify(user));
			$('#current-user').append('<div class="column">'+user.username+'</div> ')
		});
	
		socket.on('deleteUser', function(user){
			document.getElementById(user.username).remove();
		});

			
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
		});
		return (
            <div className="chat">
                <div className="ui segment">
                    <div className="ui five column grid">
                        <div className="column">
                            <div className="ui segment">
                                <div className="ui top attached label">
                                    <div className="ui two column grid">
                                        <div className="column">
											Chat
										</div>
										<div className="column">
												<div className="ui two column grid" id="current-user">
														<div className="column">
															<i className="user circle icon"></i>
														</div>
												</div>
										</div>
                                    </div>
                                </div>
                        	</div>
                            <div className="ui fluid search selection dropdown" id="usersConnected">
                                    <input type="hidden" name="country"/>
                                    <i className="dropdown icon"></i>
                                    <div className="default text">
										Select User
									</div>
                                    <div className="menu" id="users">
                                    </div>
                            </div>
                            <div className="ui segment" id="messages">

                            </div>
                            <div className="ui form">
                                <div className="field">
                                    <textarea rows="2"></textarea>
                                </div>
                            </div>
                            <button className="fluid ui right labeled icon button">
                                <i className="right arrow icon"></i>
                                Send
                            </button>
                        </div>
                    </div>
            </div>
        </div>
        );
	}
}

export default Chat;
