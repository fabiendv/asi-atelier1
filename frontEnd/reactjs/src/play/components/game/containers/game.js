import React, { Component } from 'react';
import PlayerCardsSelect from '../components/playerCardsSelect';
import Chat from './../../../../chat/containers/chat'
import User from './../../../../user/containers/User'
import { connect } from 'react-redux';
import { setMainMenuPage } from '../../../../actions';
const axios = require('axios').default;

class Game extends Component{

    constructor(props) {
        super(props);
        this.state = {
            player1:this.props.player1,
            player2:this.props.player2,
            player1CardSelected:this.props.player1.cardList[0],
            player2CardSelected:this.props.player2.cardList[0],
            currentPlayerIsPlayer1: true,
            socket: this.props.socket,
            numberOfAttacks: this.props.user.cardList.length
        }
        this.handlePlayer1CardSelection = this.handlePlayer1CardSelection.bind(this);
        this.handlePlayer2CardSelection = this.handlePlayer2CardSelection.bind(this);
        this.sendAttack = this.sendAttack.bind(this);
        this.sendEndTurn = this.sendEndTurn.bind(this);
        this.isMyTurnToPlay = this.isMyTurnToPlay.bind(this);
        this.setHome=this.setHome.bind(this);
    }

    handlePlayer1CardSelection(card){
        this.setState({player1CardSelected:card});
    }

    handlePlayer2CardSelection(card){
        this.setState({player2CardSelected:card});
    }

    setHome(){
        this.props.dispatch(setMainMenuPage());
    }

    isMyTurnToPlay(){
        // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
        if(this.props.user.id===this.props.player1.id){
            // Si c'est au tour du joueur 1 de jouer
            if(this.state.currentPlayerIsPlayer1){
                // Je suis joueur 1, et c'est a moi de jouer
                return true;
            }else{
                return false;
            }
        }else{
            if(!this.state.currentPlayerIsPlayer1){
                // je suis joueur 2 et c'est a moi de jouer
                return true;
            }else{
                return false;
            }
        }
    }

    sendAttack(){
        // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
        if(this.props.user.id===this.props.player1.id){
            // Si c'est au tour du joueur 1 de jouer
            if(this.state.currentPlayerIsPlayer1){
                // Si il reste des attaques disponibles
                if(this.state.numberOfAttacks>0){
                    var newValueOfAttacks = this.state.numberOfAttacks-1;
                    this.setState({
                        numberOfAttacks: newValueOfAttacks
                    });
                    console.log("JATTAQUE. Il me reste "+newValueOfAttacks+" attaques.");
                    // Envoyer la valeur de l'attaque de la carte selectionnee
                    console.log("J'attaque sur cette card: "+JSON.stringify(this.state.player2CardSelected));
                    this.state.socket.emit('attack', {
                        user: this.props.player1,
                        victim : this.props.player2,
                        attackingCard : this.state.player1CardSelected,
                        defendingCard : this.state.player2CardSelected,
                    });
                }else{
                    // Ce joueur ne peut plus attaquer
                    console.log("J'ai utilise toutes mes attaques. je ne peux plus attaquer. Je dois passer mon tour.");
                }
            }else{}
        }else{
            // Si c'est au joueur 2 de jouer
            if(!this.state.currentPlayerIsPlayer1){
                // Si il reste des attaques disponibles
                if(this.state.numberOfAttacks>0){
                    newValueOfAttacks = this.state.numberOfAttacks-1;
                    this.setState({
                        numberOfAttacks: newValueOfAttacks
                    });
                    console.log("JATTAQUE. Il me reste "+newValueOfAttacks+" attaques.");
                    console.log("J'attaque sur cette card: "+JSON.stringify(this.state.player1CardSelected));

                    // Envoyer la valeur de l'attaque de la carte selectionnee
                    this.state.socket.emit('attack', {
                        user: this.props.player2,
                        victim : this.props.player1,
                        attackingCard : this.state.player2CardSelected,
                        defendingCard : this.state.player1CardSelected,
                    });
                }else{
                    // Ce joueur ne peut plus attaquer
                    console.log("J'ai utilise toutes mes attaques. je ne peux plus attaquer. Je dois passer mon tour.");
                }
            }else{}
        }
    }

    sendEndTurn(){
        // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
        if(this.props.user.id===this.props.player1.id){
            // Si c'est au tour du joueur 1 de jouer
            if(this.state.currentPlayerIsPlayer1){
                console.log("JE PASSE MON TOUR");
                this.state.socket.emit('switchTurn', {
                    turnNext : this.state.player2,
                });
                // On change la personne qui doit jouer
                // On reset la valeur du nombre d'attaque
                this.setState({
                    currentPlayerIsPlayer1: false,
                    numberOfAttacks: this.props.user.cardList.length
                })
            }
        }else{
            // Si c'est au joueur 2 de jouer
            if(!this.state.currentPlayerIsPlayer1){
                console.log("JE PASSE MON TOUR");
                this.state.socket.emit('switchTurn', {
                    turnNext : this.state.player1,
                });
                // On change la personne qui doit jouer
                // On reset la valeur du nombre d'attaque
                this.setState({
                    currentPlayerIsPlayer1: true,
                    numberOfAttacks: this.props.user.cardList.length
                })
            }
        }
    }

    render() {
        // console.log("This is my user in Game:"+JSON.stringify(this.props.user));
        var that = this;

        // Mon adversaire m'attaque
        this.state.socket.on('sendAttack', function(newMyCardSelectedHp){
            // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
            if(that.props.user.id===that.state.player1.id){
                console.log("=================================");
                console.log("Le joueur 2 m'a attaque. Il me reste: "+newMyCardSelectedHp+" hp sur ma carte.");
                // On met a jour les valeurs de nos cartes
                var newMyCardSelected = that.state.player1CardSelected;
                newMyCardSelected.hp = newMyCardSelectedHp;
                //console.log(JSON.stringify(newMyCardSelected));
                that.setState({
                    player1CardSelected: newMyCardSelected,
                });
                var newMyCardList = [];
                newMyCardList.push(newMyCardSelected);
                that.setState(prevState => {
                    let player1 = Object.assign({}, prevState.player1);
                    player1.cardList = newMyCardList;
                    return {player1};
                });
                console.log("LISTE UDPATED: "+JSON.stringify(that.state.player1.cardList));
 
                //console.log(JSON.stringify(that.state.player1CardSelected));

            }else{
                console.log("=================================");
                console.log("Le joueur 1 m'a attaque. Il me reste: "+newMyCardSelectedHp+" hp sur ma carte.");
                // On met a jour les valeurs de nos cartes
                newMyCardSelected = that.state.player2CardSelected;
                newMyCardSelected.hp = newMyCardSelectedHp;
                //console.log(JSON.stringify(newMyCardSelected));
                that.setState({
                    player2CardSelected: newMyCardSelected,
                })
                that.setState(prevState => {
                    let player2 = Object.assign({}, prevState.player2);
                    player2.cardList[0] = newMyCardSelected;
                    return {player2};
                });
                newMyCardList = [];
                newMyCardList.push(newMyCardSelected);
                that.setState(prevState => {
                    let player2 = Object.assign({}, prevState.player2);
                    player2.cardList = newMyCardList;
                    return {player2};
                });
                console.log("LISTE UDPATED: "+JSON.stringify(that.state.player2.cardList));
                // On met a jour les valeurs ainsi que l'affichae
                //console.log(JSON.stringify(that.state.player2CardSelected));

            }
        });

        // Je recois la confirmation de mon attaque
        this.state.socket.on('confirmedAttack', function(newMyCardSelectedHp){
            // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
            if(that.props.user.id===that.state.player1.id){
                console.log("Je suis le playeur 1. J'ai recu la confirmation de mon attaque.");
                // On met a jour les valeurs de la carte
                var newOppositePlayerCardSelected = that.state.player2CardSelected;
                newOppositePlayerCardSelected.hp = newMyCardSelectedHp;
                that.setState({
                    player2CardSelected: newOppositePlayerCardSelected,
                });
                var newMyCardList = [];
                newMyCardList.push(newOppositePlayerCardSelected);
                that.setState(prevState => {
                    let player2 = Object.assign({}, prevState.player2);
                    player2.cardList = newMyCardList;
                    return {player2};
                });
            }else{
                console.log("Je suis le playeur 2. J'ai recu la confirmation de mon attaque.");
                // On met a jour les valeurs de la carte
                newOppositePlayerCardSelected = that.state.player1CardSelected;
                newOppositePlayerCardSelected.hp = newMyCardSelectedHp;
                that.setState({
                    player1CardSelected: newOppositePlayerCardSelected,
                })
                newMyCardList = [];
                newMyCardList.push(newOppositePlayerCardSelected);
                that.setState(prevState => {
                    let player1 = Object.assign({}, prevState.player1);
                    player1.cardList = newMyCardList;
                    return {player1};
                });
            }
        });

        // Mon adversaire passe son tour
        this.state.socket.on('sendEndTurn', function(){
            // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
            if(that.props.user.id===that.state.player1.id){
                console.log("Le joueur 2 a fini son tour.");
                that.setState({
                    currentPlayerIsPlayer1: true,
                })
            }else{
                console.log("Le joueur 1 a fini son tour.");
                that.setState({
                    currentPlayerIsPlayer1: false,
                })            
            }		
        });

        this.state.socket.on('youLoose', function(){
            console.log("J'ai perdu");
            // TODO: - Popup looser

            // Redirect to the home page
            this.setHome();
        })

        this.state.socket.on('youWin', function(){
            console.log("J'ai Gagne");
            // TODO: - Popup avec firework

            // Credit $1000 to the bank account via axios
            // TODO: test
            axios({
                method: 'put',
                baseURL: 'http://localhost:8082',
                url:`/user/${this.props.user.id}`,
                data:
                {
                    account:this.props.user.account+1000,
                },
                headers:{
                    'Access-Control-Allow-Origin':'*'
                }
              })
              .then(function(response){;
                  
                console.log("Credit the money: "+JSON.stringify(response));
          
              })
              .catch(function(error){
                  console.log("Credit the money error: "+error);
                  // REDIRIGER TO LOGIN - MAYBE
              });
        
            // Redirect to the home page
            this.setHome();
        })
        console.log("=====================");
        console.log("LISTE UDPATED BEFORE RENDER FOR PLAYER 1: "+JSON.stringify(this.state.player1.cardList));
        console.log("LISTE UDPATED BEFORE RENDER FOR PLAYER 2: "+JSON.stringify(this.state.player2.cardList));
        console.log("=====================");


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
export default connect()(Game);