import React, {Component} from 'react';
import { connect } from 'react-redux';

class SelectedCardDisplay extends Component{

	constructor(props){
		super(props);
		this.state = {
			card: this.props.card,
		};
	}

	render(){
		let display = (
            <div className="ui special cards">
                <div className="card">
                    <div className="content">
                        <div className="ui grid">
                            <div className="three column row">
                                <div className="column">
                                    <i className="heart outline icon"></i>
                                    <span id="cardHPId">{this.props.card.hp}</span> 
                                </div>
                                <div className="column">
                                        <h5>{this.props.card.family}</h5>
                                </div>
                                <div className="column">
                                    <span id="energyId">{this.props.card.energy}</span> <i className="lightning icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="image imageCard">

                        <div className="blurring dimmable image">
                            <div className="ui inverted dimmer">
                                <div className="content">
                                    <div className="center">
                                        <div className="ui primary button"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="ui fluid image">
                                <a className="ui left corner label" href="">
                                    {this.props.card.name}
                                    </a>
                                <img id="cardImgId" className="ui centered image" src={this.props.card.imgUrl}></img>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="ui form tiny">
                            <div className="field">
                                <label id="cardNameId"></label>
                                <textarea id="cardDescriptionId" className="overflowHiden" readonly="" rows="5">{this.props.card.description}</textarea>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <i className="heart outline icon"></i><span id="cardHPId"> HP {this.props.card.hp}</span> 
                        <div className="right floated ">
                                <span id="cardEnergyId">Energy {this.props.card.energy}</span>
                            <i className="lightning icon"></i>
                                
                        </div>
                    </div>
                    <div className="content">
                        <span className="right floated">
                                <span id="cardAttackId"> Attack {this.props.card.attack}</span> 
                            <i className=" wizard icon"></i>
                        </span>
                        <i className="protect icon"></i>
                        <span id="cardDefenceId">Defense {this.props.card.defence}</span> 
                    </div>
                    <div className="ui bottom attached button">
                        <i className="money icon"></i>
                        Actual Value <span id="cardPriceId"> {this.props.card.price}$</span>
                    </div>
                </div>
            </div>
        );
		return display;
	}
}

export default connect()(SelectedCardDisplay);
