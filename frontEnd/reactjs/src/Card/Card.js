import React, {Component} from 'react';
import { connect } from 'react-redux';
import InlineCard from './Component/InlineCard'
import SelectedCardDisplay from './Component/SelectedCardDisplay'

class Card extends Component{

	constructor(props){
		super(props);
		this.state = {
			card: this.props.card,
			orderType: this.props.orderType
		};
	}

	render(){
		let type = this.props.displayType;
		let display 
		switch(type){
			case 'small':
				display = (<InlineCard card={this.props.card}></InlineCard>);
				break;

			case 'normal':
				display = (<SelectedCardDisplay card={this.props.card}></SelectedCardDisplay>);
				break;
			default:
				console.log("Error: type d'affichage non disponible " + type);
		}
		return display;
	}
}

export default connect()(Card);
