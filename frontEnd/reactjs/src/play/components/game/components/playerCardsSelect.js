import React, {Component} from 'react';
import { connect } from 'react-redux';
import PlayerCards from './playerCards'
import Card from './../../../../card/containers/Card' 

class PlayerCardsSelect extends Component{

	constructor(props){
		super(props);
		this.state = {
            cards: this.props.cards,
            cardSelected: this.props.cards[0]
        };
        this.HandleCardSelect = this.HandleCardSelect.bind(this);
    }
    
    HandleCardSelect(card){
        this.setState({cardSelected:card});
        this.props.onCardSelect(card);
    }

	render(){
		let display = (
            <div className="PlayerCardsSelect ui grid middle aligned">
                <div className="twelve wide column">
                    <PlayerCards cards={this.props.cards} onCardClick={this.HandleCardSelect}></PlayerCards>
                </div>
                <div className="four wide column">
                    <Card card={this.state.cardSelected} displayType="normal"></Card>
                </div>
            </div>
        );
		return display;
	}
}

export default connect()(PlayerCardsSelect);
