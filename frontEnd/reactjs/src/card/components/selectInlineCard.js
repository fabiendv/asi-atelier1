import React, {Component} from 'react';
import { connect } from 'react-redux';

class SelectInlineCard extends Component{

	constructor(props){
		super(props);
		this.state = {
			card: this.props.card,
		};
		this.handleOnCardSelected=this.handleOnCardSelected.bind(this);
	}

	handleOnCardSelected(cardObject){
        
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
                    <div className="form-check">
                        <input type="checkbox" class="form-check-input" ></input>
                    </div>
                </td>
            </tr>     
        );
		return display;
	}
}

export default connect()(SelectInlineCard);
