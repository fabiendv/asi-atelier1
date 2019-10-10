import React, {Component} from 'react';
import { connect } from 'react-redux';
import {setSelectedCard, setMainMenuPage} from './../../actions/index'

class InlineCard extends Component{

	constructor(props){
		super(props);
		this.state = {
			card: this.props.card,
		};
        this.handleOnCardSelected=this.handleOnCardSelected.bind(this);
        this.buyOrSellCard=this.buyOrSellCard.bind(this);

	}

	handleOnCardSelected(cardObject){
        this.props.dispatch(setSelectedCard(cardObject));
    }
    
    buyOrSellCard(cardObject){
        if(this.props.orderType==="Buy"){
            // Need to buy the card
        }

        if(this.props.orderType==="Sell"){
            // Need to sell the card
        }

        // Return to the main view
        this.props.dispatch(setMainMenuPage());
    }

	render(){
		let display;
        display = (
            <tr onClick={()=>{this.handleOnCardSelected(this.props.card)}}>
                <td>
                    <img className="ui avatar image" src={this.state.card.smallImgUrl}></img><span>{this.state.card.name}</span>
                </td>
                <td>{this.state.card.description}</td>
                <td>{this.state.card.family}</td>
                <td>{this.state.card.hp}</td>
                <td>{this.state.card.energy}</td>
                <td>{this.state.card.defence}</td>
                <td>{this.state.card.attack}</td>
                <td>{this.state.card.price}$</td>
                <td>
                    <div className="ui vertical animated button" tabIndex="0" onClick={(e)=>{e.stopPropagation(); this.buyOrSellCard(this.props.card)}}>
                        <div className="hidden content">
                            {this.props.orderType}
                        </div>
                        <div className="visible content">
                            <i className="shop icon"></i>
                        </div>
                    </div>
                </td>
            </tr>     
        );
		return display;
	}
}

export default connect()(InlineCard);
