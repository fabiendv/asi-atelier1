import React, {Component} from 'react';
import { connect } from 'react-redux';
import {setSelectedCard} from './../../actions/index'

class InlineCard extends Component{

	constructor(props){
		super(props);
		this.state = {
			card: this.props.card,
		};
		this.handleOnCardSelected=this.handleOnCardSelected.bind(this);
	}

	handleOnCardSelected(cardObject){
        this.props.dispatch(setSelectedCard(cardObject));
	}

	render(){
		let display 
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
                    <div className="ui vertical animated button" tabIndex="0">
                        <div className="hidden content">{this.state.orderType}</div>
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
