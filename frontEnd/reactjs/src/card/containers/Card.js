import React, {Component} from 'react';
import { connect } from 'react-redux';
import InlineCard from '../components/InlineCard'
import SelectedCardDisplay from '../components/SelectedCardDisplay'
import SelectInlineCard from './../components/selectInlineCard'
import SelectGameCard from './../components/selectGameCard'

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
		let display;
		switch(type){
			case 'small':
				display = (<InlineCard orderType={this.props.orderType} card={this.props.card} user={this.props.user}></InlineCard>);
				break;
			case 'normal':
				display = (<SelectedCardDisplay card={this.props.card}></SelectedCardDisplay>);
				break;
			case 'selectInline':
				display = (<SelectInlineCard card={this.props.card}></SelectInlineCard>)
				break;
			case 'selectGame':
				display = (<SelectGameCard card={this.props.card}></SelectGameCard>)
			default:
				console.log("Error: type d'affichage non disponible " + type);
		}
		return display;
	}
}

export default connect()(Card);
