import React, { Component } from 'react';
import PlayerCardsSelect from '../components/playerCardsSelect';
import Chat from './../../../../chat/containers/chat'
import User from './../../../../user/containers/User'

//let socket = require('socket.io-client')('http://localhost:1337');

class Game extends Component{

    constructor(props) {
        super(props);
        this.state = {
            player1:this.props.player1,
            player2:this.props.player2,
            player1CardSelected:this.props.player1.cardList[0],
            player2CardSelected:this.props.player2.cardList[0],
            currentPlayerIsPlayer1: true,
            socket: this.props.socket
        }
        this.handlePlayer1CardSelection = this.handlePlayer1CardSelection.bind(this);
        this.handlePlayer2CardSelection = this.handlePlayer2CardSelection.bind(this);
        this.sendAttack = this.sendAttack.bind(this);
        this.sendEndTurn = this.sendEndTurn.bind(this);
    }

    handlePlayer1CardSelection(card){
        this.setState({player1CardSelected:card});
    }

    handlePlayer2CardSelection(card){
        this.setState({player2CardSelected:card});
    }

    sendAttack(){
        // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
        if(this.props.user.id==this.props.player1.id){
            // Si c'est au tour du joueur 1 de jouer
            if(this.state.currentPlayerIsPlayer1){
                console.log("JATTAQUE");
                // Envoyer la valeur de l'attaque de la carte selectionnee
                this.state.socket.emit('attack', {
                    victim : this.props.player2,
                    user: this.props.player1,
                    attackValue : this.state.player1CardSelected.attack,
                });
                this.state.currentPlayerIsPlayer1 = false;
            }else{}
        }else{
            // Si c'est au joueur 2 de jouer
            if(!this.state.currentPlayerIsPlayer1){
                console.log("JATTAQUE");
                // Envoyer la valeur de l'attaque de la carte selectionnee
                this.state.socket.emit('attack', {
                    victim : this.props.player1,
                    attackValue : this.state.player2CardSelected.attack,
                });
                this.state.currentPlayerIsPlayer1 = true;
            }else{}
        }
    }

    sendEndTurn(){
        // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
        if(this.props.user.id==this.props.player1.id){
            // Si c'est au tour du joueur 1 de jouer
            if(this.state.currentPlayerIsPlayer1){
                console.log("JE PASSE MON TOUR");
                this.state.socket.emit('switchTurn', {
                    turnNext : this.state.player2,
                });
                this.state.currentPlayerIsPlayer1 = false;
            }
        }else{
            // Si c'est au joueur 2 de jouer
            if(!this.state.currentPlayerIsPlayer1){
                console.log("JE PASSE MON TOUR");
                this.state.socket.emit('switchTurn', {
                    turnNext : this.state.player1,
                });
                this.state.currentPlayerIsPlayer1 = true;
            }
        }
    }

    render() {
        console.log("This is my user in Game:"+JSON.stringify(this.props.user));
        var that = this;
        // Mon adversaire m'attaque
        this.state.socket.on('sendAttack', function(attackValue){
            console.log("I AM IN HANDLE ATTACK");
            // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
            if(that.props.user.id===that.state.player1.id){
                console.log("Le joueur 2 m'a attaque de:"+attackValue);
            }else{
                console.log("Le joueur 1 m'a attaque de:"+attackValue);
            }
            that.state.currentPlayerIsPlayer1 = !that.state.currentPlayerIsPlayer1;

        });

        // Mon adversaire passe son tour
        this.state.socket.on('sendEndTurn', function(){
            console.log("I AM IN HANDLE END TURN");
            // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
            if(that.props.user.id===that.state.player1.id){
                console.log("Le joueur 2 a passe son tour");
            }else{
                console.log("Le joueur 1 a passe son tour");
            }		
            that.state.currentPlayerIsPlayer1 = !that.state.currentPlayerIsPlayer1;

        });

        return (
                <div className="ui fluid">
                    <div className="ui grid">
                        <div className="four wide column">
                            <Chat user={this.props.user}></Chat>
                        </div>
                        <div className="twelve wide column">
                            <div className="row player1">
                                <div className="ui center aligned fluid container">
                                    <div className="ui grid">
                                        <div className="three wide column">
                                            <User display_type="AVATAR" login={this.props.player1.login}></User>
                                        </div>
                                        <div className="thirteen wide column">
                                            <PlayerCardsSelect 
                                                cards={this.state.player1.cardList} 
                                                onCardSelect={this.handlePlayer1CardSelection}
                                            ></PlayerCardsSelect>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row actionButtons ui center aligned fluid container">
                                <div className="ui grid">
                                    <div className="three wide column">
                                        <button className="ui large button" onClick={this.sendEndTurn}>End turn</button>
                                    </div>
                                    <div className="ten wide column ui fluid ">
                                        <div className="ui divider"></div>
                                    </div>
                                    <div className="three wide column">
                                        <button className="ui large button" onClick={this.sendAttack}>Attack</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row player2">
                                <div className="ui center aligned fluid container">
                                    <div className="ui grid">
                                        <div className="three wide column">
                                            <User display_type="AVATAR" login={this.props.player2.login}></User>
                                        </div>
                                        <div className="thirteen wide column">
                                            <PlayerCardsSelect 
                                                cards={this.state.player2.cardList}
                                                onCardSelect={this.handlePlayer2CardSelection}
                                            ></PlayerCardsSelect>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        );

    }

}
export default Game;