import React, {Component} from 'react';
class Card extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: "",
			description: "",
			family: "",
			affinity: "",
			imgUrl: "",
			smallImgUrl: "",
			energy: "",
			hp: "",
			defence: "",
			attack: "",
			price: ""
		};
	}

	render(){
		let type = this.props.type;
		let display 
		switch(type){
			case 'small':
				break;
			case 'normal':
				display = (
						<div className="card">
                                    <div className="content">
                                            <div className="ui grid">
                                                <div className="three column row">
                                                    <div className="column">
                                                        <i className="heart outline icon"></i><span id="cardHPId">{this.state.hp}</span> 
                                                    </div>
                                                    <div className="column">
                                                            <h5>{this.state.family}</h5>
                                                    </div>
                                                    <div className="column">
                                                        <span id="energyId">{this.state.energy}</span> <i className="lightning icon"></i>
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
                                                <a className="ui left corner label">
                                                    {this.state.name}
                                                  </a>
                                                <img id="cardImgId" className="ui centered image" src={this.state.imgUrl}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div className="ui form tiny">
                                            <div className="field">
                                                <label id="cardNameId"></label>
                                                <textarea id="cardDescriptionId" className="overflowHiden" readonly="" rows="5">{this.state.description}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <i className="heart outline icon"></i><span id="cardHPId"> HP {this.state.hp}</span> 
                                        <div className="right floated ">
                                                <span id="cardEnergyId">Energy {this.state.hp}</span>
                                            <i className="lightning icon"></i>
                                             
                                        </div>
                                    </div>
                                    <div className="content">
                                        <span className="right floated">
                                                <span id="cardAttackId"> Attack {this.state.attack}</span> 
                                            <i className=" wizard icon"></i>
                                        </span>
                                        <i className="protect icon"></i>
                                        <span id="cardDefenceId">Defense {this.state.defense}</span> 
                                    </div>
                                    <div className="ui bottom attached button">
                                        <i className="money icon"></i>
                                        Actual Value <span id="cardPriceId"> {this.state.price}$</span>
                                    </div>
                                </div>
					);
				break;
			default:
				console.log("Error: type d'affichage non disponible " + type);
		}
		return display;
	}
}
export default Card;
