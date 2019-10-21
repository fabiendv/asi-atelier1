import React, { Component } from 'react';
import PlayerCardsSelect from '../components/playerCardsSelect';
import Chat from './../../../../chat/containers/chat'
import User from './../../../../user/containers/User'

class Game extends Component{

    constructor(props) {
        super(props);
        this.state = {
            player1:this.props.player1,
            player2:this.props.player2,
            player1CardSelected:this.props.player1.cardList[0],
            player2CardSelected:this.props.player2.cardList[0],
            currentPlayer: "player1"
        }
        this.handlePlayer1CardSelection = this.handlePlayer1CardSelection.bind(this);
        this.handlePlayer2CardSelection = this.handlePlayer2CardSelection.bind(this);
        this.handleAttack = this.handleAttack.bind(this);
        this.handleEndTurn = this.handleEndTurn.bind(this);
    }

    handlePlayer1CardSelection(card){
        this.setState({player1CardSelected:card});
    }

    handlePlayer2CardSelection(card){
        this.setState({player2CardSelected:card});
    }

    handleAttack(){
        //todo : action on attack button
        console.log("attack")
    }

    handleEndTurn(){
        console.log(this.state.currentPlayer + ' end of turn')
    }

    render() {
        console.log("This is my user in Game:"+JSON.stringify(this.props.user));
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
                                        <button className="ui large button" onClick={this.handleEndTurn}>End turn</button>
                                    </div>
                                    <div className="ten wide column ui fluid ">
                                        <div className="ui divider"></div>
                                    </div>
                                    <div className="three wide column">
                                        <button className="ui large button" onClick={this.handleAttack}>Attack</button>
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