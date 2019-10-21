import React, {Component} from 'react';
import $ from 'jquery';
import Select from 'react-select';

const socket = require('socket.io-client')('http://localhost:1338');

class Chat extends Component{

	constructor(props){
		super(props);
		this.state = {
			userConnectedList:[],
			talkingTo:"",
			firstTime: true
		};
		this.sendMessage = this.sendMessage.bind(this);
	}

	sendMessage(){
		var data={};
		window.$ = $;
		data.message = $("textarea").val();
		data.username = this.props.user.login;
		// data.target = document.getElementById("users").getElementsByClassName("active selected")[0].id;
		data.target = this.state.talkingTo;
		socket.emit("messageSent",data);
		$("textarea").val('');
	}
	
	componentWillMount(){
		console.log("I am: "+JSON.stringify(this.props.user));
		socket.emit('login', {
			username : this.props.user.login,
			mail     : '@cpe.fr',  
			usercolor:''  
		});
	}

	handleChangeUser = selectedUser => {
		this.setState(
		  { selectedUser },
		  () => {
			  console.log(`Option selected:`, selectedUser);
			  this.state.talkingTo = selectedUser.label;
		  }
		);
	  };

	render(){
		var that = this;
		console.log("This is the log: "+ JSON.stringify(this.state.userConnectedList));
		socket.on('newusr', function(user){
			 // Do not add the current user to the list
			 if(that.props.user.login!=user.username){
				console.log("There is a new user: "+JSON.stringify(user));
				that.state.userConnectedList.push({label:user.username,value:user.socketId});
			 }

			// $('#users').append('<div class="dropdown-item" id="'+user.username+'" data-value="jd"}><i class="jd user circle icon"></i>'+user.username+'</div>')
		});
	
		socket.on('currentUser', function(user){
			// console.log("I am in currentUser: "+JSON.stringify(user));
			// $('#current-user').append('<div class="column">'+user.username+'</div> ')
		});
	
		socket.on('deleteUser', function(user){
			// document.getElementById(user.username).remove();
		});	
	
		socket.on('newMessage',function(data){
			console.log('There is a new message');
			if(that.state.firstTime){
				if(data.username == that.props.user.login){
					console.log("From me!");
					$('#messages').append('<div class="ui raised segment"><a class="ui ribbon label" style="background-color:'+data.color+'">'+data.username+'</a><span>'+data.hours+':'+data.minutes+'</span><p>'+data.message+'</p></div>')        
				}else{
					console.log("From someonelse!");
					$('#messages').append('<div class="ui raised segment"><a class="ui right ribbon label" style="background-color:'+data.color+'">'+data.username+'</a><span>'+data.hours+':'+data.minutes+'</span><p>'+data.message+'</p></div>')
				} 
				that.state.firstTime = false;

			}else{
				that.state.firstTime=true;
			}

		});

		return (
            <div className="chat">
                <div className="ui segment">
                    <div className="ui five column grid">
                        <div className="" style={{paddingTop: '1em', paddingBottom: '1em', paddingLeft:'0px', width:'100%'}}>
                            <div className="ui segment">
                                <div className="ui top attached label">
                                    <div className="ui two column grid">
                                        <div className="column">
											Chat
										</div>
										{/* <div className="column">
												<div className="ui two column grid" id="current-user">
														<div className="column">
															<i className="user circle icon"></i>
														</div>
														{this.props.user.login}
												</div>
										</div> */}
                                    </div>
                                </div>
                        	</div>

							<Select
								// value={selectedOption}
								onChange={this.handleChangeUser}
								options={this.state.userConnectedList}
								placeholder="Select User"
							/>
							
                            <div className="ui segment" id="messages">

                            </div>
                            <div className="ui form">
                                <div className="field">
                                    <textarea rows="2"></textarea>
                                </div>
                            </div>
                            <button className="fluid ui right labeled icon button" onClick={()=>{this.sendMessage()}}>
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
