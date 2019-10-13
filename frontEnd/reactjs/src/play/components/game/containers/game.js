import React, { Component } from 'react';
import PlayerCardsSelect from '../components/playerCardsSelect';

class Game extends Component{

    constructor(props) {
        super(props);
        this.state = {
            player1:this.props.player1,
            player2:this.props.player2
        }
    }

    render() {

        return (
                <div className="center-container">
                    <PlayerCardsSelect cards={this.state.player1.cardList}></PlayerCardsSelect>
                </div>
            
        );

    }

}
export default Game;