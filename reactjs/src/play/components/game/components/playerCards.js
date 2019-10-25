import React, {Component} from 'react';
import { connect } from 'react-redux';
import Card from './../../../../card/containers/Card'

class PlayerCards extends Component{

	constructor(props){
		super(props);
		this.state = {
			cards: this.props.cards,
		};
	}

	render(){
        let renderCards =[]
        for(let c of this.props.cards){
            renderCards.push(
				<div className="four wide column centered" onClick={this.props.onCardClick.bind(this, c)}>
					<Card card={c} displayType='selectGame'></Card>
				</div>
			)
        }
		let display = (
            <div className="PlayerCards ui grid block-container">
                {renderCards}
            </div>
        );
		return display;
	}
}

export default connect()(PlayerCards);
