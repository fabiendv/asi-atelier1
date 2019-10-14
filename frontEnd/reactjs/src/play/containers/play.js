import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardSelection from './../components/cardSelection'
import WaitRoom from "./../components/waitRoom"
import Game from "../components/game/containers/game"

class Play extends Component {
    constructor(props){
        super(props);
        this.state = {
            view:"cardSelection",
            player1:null,
            player2:null
        };

        this.startGameHandler=this.startGameHandler.bind(this);
    }

    startGameHandler(listIndex){
        let player = this.props.user
        let cardList = [];
        listIndex.forEach((index) => {
            cardList.push(player.cardList[index])
        })
        player.cardList = cardList;

        let that = this;
        that.setState({view:"wait"});
        //let username = document.getElementById
        let socket = require('socket.io-client')('http://localhost:1337');
        socket.emit("newPlayerIsWaiting",player);

        socket.on("launchGame",function(player1, player2){
            that.setState({
                view:"game",
                player1:player1,
                player2:player2
            });
        });
    }

    render(){
        let view
        if (this.props.view == undefined){
            view = this.state.view;
        }
        else{
            view = this.props.view;
        }

        let render
        switch(view){
            case "cardSelection":
                render = (<CardSelection card={this.props.user.cardList} startGameHandler={this.startGameHandler}></CardSelection>)
                break;
            case "wait":
                render = (<WaitRoom />)
                break;
            case "game":
                console.log('players:')
                console.log(this.state.player1)
                console.log(this.state.player2)
                render = (<Game player1={this.state.player1} player2={this.state.player2}/>)
                break;
            default:
                console.log("Error: this view doesn't exist !");
        }

        return(
            <div className="play">
                {render}
            </div>
        )
    }
}

export default connect()(Play);