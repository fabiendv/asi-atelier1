import React, { Component } from 'react';
import PlayerCardsSelect from '../components/playerCardsSelect';
import Chat from './../../../../chat/containers/chat'
import User from './../../../../user/containers/User'
import { connect } from 'react-redux';
import { setMainMenuPage, updateUser } from '../../../../actions';
import NotificationAlert from 'react-notification-alert';
import Swal from 'sweetalert2';

        
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
        this.setHome=this.setHome.bind(this);
        this.updateInfoGame=this.updateInfoGame.bind(this);
        this.popUpWin = this.popUpWin.bind(this);
        this.youWin = this.youWin.bind(this);
        this.popUpLoose = this.popUpLoose.bind(this);

        var that = this;

        // Mon adversaire m'attaque
        this.state.socket.on('sendAttack', function(newMyCardSelectedHp){
            // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
            if(that.props.user.id===that.state.player1.id){
                console.log("=================================");
                console.log("Le joueur 2 m'a attaque. Il me reste: "+newMyCardSelectedHp+" hp sur ma carte.");
                that.updateInfoGame("danger",`Outch! You received an attack: you have ${newMyCardSelectedHp} hp left!`);
                // On met a jour les valeurs de nos cartes
                var newMyCardSelected = that.state.player1CardSelected;
                newMyCardSelected.hp = newMyCardSelectedHp;
                console.log(JSON.stringify(newMyCardSelected));
                that.setState({
                    player1CardSelected: newMyCardSelected,
                })
                var newMyCardList = [];
                newMyCardList.push(newMyCardSelected);
                that.setState(prevState => {
                    let player1 = Object.assign({}, prevState.player1);
                    player1.cardList = newMyCardList;
                    return {player1};
                });
                console.log("LISTE UDPATED: "+JSON.stringify(that.state.player1.cardList));
                console.log(JSON.stringify(that.state.player1CardSelected));

            }else{
                console.log("=================================");
                console.log("Le joueur 1 m'a attaque. Il me reste: "+newMyCardSelectedHp+" hp sur ma carte.");
                that.updateInfoGame("danger",`Outch! You received an attack: you have ${newMyCardSelectedHp} hp left!`);
                // On met a jour les valeurs de nos cartes
                newMyCardSelected = that.state.player2CardSelected;
                newMyCardSelected.hp = newMyCardSelectedHp;
                console.log(JSON.stringify(newMyCardSelected));
                that.setState({
                    player2CardSelected: newMyCardSelected,
                });
                newMyCardList = [];
                newMyCardList.push(newMyCardSelected);
                that.setState(prevState => {
                    let player2 = Object.assign({}, prevState.player2);
                    player2.cardList = newMyCardList;
                    return {player2};
                });
                console.log("LISTE UDPATED: "+JSON.stringify(that.state.player2.cardList));
                console.log(JSON.stringify(that.state.player2CardSelected));

            }
        });

        // Je recois la confirmation de mon attaque
        this.state.socket.on('confirmedAttack', function(newMyCardSelectedHp){
            // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
            if(that.props.user.id===that.state.player1.id){
                console.log("Je suis le playeur 1. J'ai recu la confirmation de mon attaque.");
                that.updateInfoGame("success",`You sent your attack. There are ${newMyCardSelectedHp} hp left!`);
                // On met a jour les valeurs de la carte
                var newOppositePlayerCardSelected = that.state.player1CardSelected;
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
                that.updateInfoGame("success",`You sent your attack. There are ${newMyCardSelectedHp} hp left!`);
                // On met a jour les valeurs de la carte
                newOppositePlayerCardSelected = that.state.player2CardSelected;
                newOppositePlayerCardSelected.hp = newMyCardSelectedHp;
                that.setState({
                    player1CardSelected: newOppositePlayerCardSelected,
                });
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
                that.updateInfoGame("info","Time to play!");
                that.setState({
                    currentPlayerIsPlayer1: true,
                })
            }else{
                console.log("Le joueur 1 a fini son tour.");
                that.updateInfoGame("info","Time to play!");
                that.setState({
                    currentPlayerIsPlayer1: false,
                })            
            }		

        });

        this.state.socket.on('youLoose', function(){
            // L'utilisateur a perdu
            that.popUpLoose();
        })

        this.state.socket.on('youWin', function(){
            that.youWin();
        })

        // Le serveur nous informe qu'une socket s'est deconnectee. On check si c'est notre adversaire.
        this.state.socket.on('someoneHasBeenDeconnected', function(idDisconnected){
            if(that.props.user.id===that.props.player1.id){
                // Je suis le joueur 1, je check si l'id deconnected est celle du joueur 2
                if(idDisconnected===that.props.player2.socketID){
                    that.youWin();
                }
            }else{
                // Je suis le joueur 2, je check si l'id deconnected est celle du joueur 1
                if(idDisconnected===that.props.player1.socketID){
                    that.youWin();
                }
            }
        })


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

    updateInfoGame(infoType,messageSent){
        const options = {
            place: 'tc',
            message: (
                <div>
                    <div>
                        {messageSent}
                    </div>
                </div>
            ),
            type: infoType,
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 7
        }
        try{
            this.refs.notify.notificationAlert(options);
        }
        catch(err){
            console.log('notification error : ' + err);
        }
    }

    youWin(){
        var that = this;
        // L'utilisateur a gagne
        // Credit $1000 to the bank account via axios
        axios({
            method: 'put',
            baseURL: 'http://localhost:8082',
            url:`/user/${that.props.user.id}`,
            data:
            {
                surname:that.props.user.surName,
                lastname:that.props.user.lastName,
                login:that.props.user.login,
                pwd:that.props.user.pwd,
                account:that.props.user.account+1000,
                img:that.props.user.img,

            },
            headers:{
                'Access-Control-Allow-Origin':'*'
            }
            })
            .then(function(response){;
                console.log("Credit the money RESPONSE: "+JSON.stringify(response));

                console.log("Credit the money: "+JSON.stringify(response.data));
                
                var those = that;
                axios({
                    method: 'get',
                    baseURL: 'http://localhost:8082',
                    url:`/user/${those.props.user.id}`, 
                }).then(function(response){
                    // Update the user
                    those.props.dispatch(updateUser(response.data));
                    // Popup avec firework
                    those.popUpWin();
                }).catch(function(error){
                    console.log("error: "+error);
                })
                
            })
            .catch(function(error){
                console.log("Credit the money error: "+error);
                // REDIRIGER TO LOGIN - MAYBE
            });
    
        // Redirect to the home page
        that.setHome();
    }

    popUpWin(){
        Swal.fire({
            title: 'Congratulations !',
            text: 'You won your game!',
            imageUrl: 'https://i.ibb.co/VQxZKJC/trophy.png',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'trophy',
            confirmButtonColor: '#2c2c2c',
            confirmButtonText: 'Return to the home page',
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif")
            center left
            round
          `
          }).then((result) => {
                    if (result.value) {
                        this.props.dispatch(setMainMenuPage());
                    }
            })
    }

    popUpLoose(){

        Swal.fire({
            type: 'error',
            title: 'Too bad ...',
            text: 'You lost your game!',
            confirmButtonColor: '#2c2c2c',
            confirmButtonText: 'Return to the home page',
            backdrop: `
            rgba(0,0,123,0.4)
            url("https://media.giphy.com/media/psmj4cmTGQQ0We0Uyf/giphy.gif")
            center left
            no-repeat
          `
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(setMainMenuPage());
            }
          })

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
                    this.updateInfoGame("info","You sent all your attacks.");
                }
            }else{
                this.updateInfoGame("info","Please wait. It is not your turn to play.");
            }
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
                    this.updateInfoGame("info","You sent all your attacks.");
                }
            }else{
                this.updateInfoGame("info","Please wait. It is not your turn to play.");
            }
        }
    }

    sendEndTurn(){
        // Si l'utilisateur est joueur 1, Sinon l'utilisateur est le joueur 2
        if(this.props.user.id===this.props.player1.id){
            // Si c'est au tour du joueur 1 de jouer
            if(this.state.currentPlayerIsPlayer1){
                this.state.socket.emit('switchTurn', {
                    turnNext : this.state.player2,
                });
                // On change la personne qui doit jouer
                // On reset la valeur du nombre d'attaque
                this.setState({
                    currentPlayerIsPlayer1: false,
                    numberOfAttacks: this.props.user.cardList.length
                });
                this.updateInfoGame("info","You skipped your turn.");
            }else{
                this.updateInfoGame("info","Please wait. It is not your turn to play.");
            }
        }else{
            // Si c'est au joueur 2 de jouer
            if(!this.state.currentPlayerIsPlayer1){
                this.state.socket.emit('switchTurn', {
                    turnNext : this.state.player1,
                });
                // On change la personne qui doit jouer
                // On reset la valeur du nombre d'attaque
                this.setState({
                    currentPlayerIsPlayer1: true,
                    numberOfAttacks: this.props.user.cardList.length
                });
                this.updateInfoGame("info","You skipped your turn.");
            }else{
                this.updateInfoGame("info","Please wait. It is not your turn to play.");
            }
        }
    }

    render() {

        console.log("=====================");
        console.log("LISTE UDPATED BEFORE RENDER FOR PLAYER 1: "+JSON.stringify(this.state.player1.cardList));
        console.log("LISTE UDPATED BEFORE RENDER FOR PLAYER 2: "+JSON.stringify(this.state.player2.cardList));
        console.log("=====================");

        return (
            <div className="container-fluid">
                <div className="ui fluid block-container play">
                    <NotificationAlert ref="notify" />
                    <div className="ui grid">
                        <div className="four wide column">
                            <Chat user={this.props.user}></Chat>
                        </div>
                        <div className="twelve wide column">
                            <div className="row player1">
                                <div className="ui center aligned fluid container">
                                    <div className="ui grid middle aligned">
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
                                    <div className="ui grid middle aligned">
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
            </div>
        );

    }

}
export default connect()(Game);