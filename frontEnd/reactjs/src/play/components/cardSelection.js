import React, {Component} from 'react';
import { connect } from 'react-redux';
import SelectInlineCard from './../../card/components/selectInlineCard'

class CardSelection extends Component{

	constructor(props){
		super(props);
		this.state = {
		};
		this.handleOnCardSelected=this.handleOnCardSelected.bind(this);
	}

	handleOnCardSelected(cardObject){
        
	}

	render(){
        let display;
        let renderList = <SelectInlineCard card={this.props.card}></SelectInlineCard>
        display = (
            <div className="cardSelection">
                <div className="ui grid">
                    <div className="ten wide column">
                    <h3 className="ui aligned header"> Select 4 cards</h3>
                    <table className="ui selectable celled table" id="cardListId">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Family</th>
                            <th>HP</th>
                            <th>Energy</th>
                            <th>Defence</th>
                            <th>Attack</th>
                            <th>Price</th>
                            <th>Selected</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderList}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        );
		return display;
	}
}

export default connect()(CardSelection);
