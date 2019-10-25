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
			firstTimeList: true,
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.initSocket = this.initSocket.bind(this);
		this.initSocket();
	}

	initSocket(){
		var that = this;
	
		/**
		 * param: dictionary of connected users
		 * remove the actual user from the list and replace the userConnectedList
		 */
		socket.on('updateYourTable', function(dictUsers){
			
			let newUserList = [];
			for (let k in dictUsers){
				if (dictUsers[k].id != that.props.user.id){
					newUserList.push({id:dictUsers[k].id,label:dictUsers[k].username,value:dictUsers[k].socketId})
				}
			}

			that.setState(
				{
					userConnectedList: newUserList
				}
			);
		});
	
		// Un nouveau message nous est envoye
		socket.on('newMessage',function(data){
			console.log('There is a new received message.');
			if(data.id === that.props.user.id){
				$('#messages').append('<div class="ui raised segment"><a class="ui ribbon label" style="background-color:'+data.color+'">'+data.username+'</a><span>'+data.hours+':'+data.minutes+'</span><p>'+data.message+'</p></div>')        
			}else{
				console.log("From someonelse!");
				$('#messages').append('<div class="ui raised segment"><a class="ui right ribbon label" style="background-color:'+data.color+'">'+data.username+'</a><span>'+data.hours+':'+data.minutes+'</span><p>'+data.message+'</p></div>')
			}
			var messagesContainer = document.getElementById("messages");
			messagesContainer.scrollTop = messagesContainer.scrollHeight
		});
	}

	sendMessage(){
		var data={};
		window.$ = $;

		// Recupere les valeurs (message, userID, userLogin, et target)
		data.message = $("textarea").val();
		data.id = this.props.user.id;
		data.username = this.props.user.login;
		data.target = this.state.talkingTo;

		// Envoyer le message au serveur
		socket.emit("messageSent",data);

		// Effacer le message ecrit
		$("textarea").val('');
	}
	
	componentWillMount(){
		// Envoyer les informations au serveur pour informer d'une connexion
		socket.emit('login', {
			id : this.props.user.id,
			username : this.props.user.login,
			mail     : '@cpe.fr',  
			usercolor:''  
		});
	}

	handleChangeUser = selectedUser => {
		// Change la valeur de l'id de la personne a qui l'utilisateur veut parler.
		this.setState(
		  { selectedUser },
		  () => {
			  console.log(`Option selected:`, selectedUser);
			  this.setState({
				  talkingTo: selectedUser.id
			  })
		  }
		);
	  };

	render(){
		// Il devrait avoir au moins un utilisateur avant de render() le componant
		if(this.state.userConnectedList.length>0){

			// Initialise la premiere personne de la liste lors de la premiere connection
			if(this.state.firstTimeList){
				this.setState({
					talkingTo: this.state.userConnectedList[0].id,
					firstTimeList: false
				})
			}

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
															{this.props.user.id}
													</div>
											</div> */}
										</div>
									</div>
								</div>
								
								{/* Add select componant for futur dev */}
								<Select
									// value={selectedOption}
									defaultValue={this.state.userConnectedList[0].value}
									onChange={this.handleChangeUser}
									options={this.state.userConnectedList}
									// placeholder="Select User"
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
		}else{
			// On ne retourne que personne n'est connecte pour parler
			return (<div className="chat">
			<div className="ui segment">
				<div className="ui five column grid">
					<div className="" style={{paddingTop: '1em', paddingBottom: '1em', paddingLeft:'0px', width:'100%'}}>
						<div className="ui segment">
							<div className="ui top attached label">
								<div className="ui two column grid">
									<div className="column">
										Chat unavailable
									</div>
								</div>
							</div>
						</div>
												
						<div className="ui segment" id="messages">
							You are the only user connected
						</div>
	
					</div>
				</div>
		</div>
	</div>);
		}

	}
}

export default Chat;
