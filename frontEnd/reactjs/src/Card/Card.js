import React, {Component} from 'react';

class Card extends Component{

	constructor(props){
		super(props);
		this.state = {
			data: this.props.data,
			orderType: this.props.orderType
		};
	}

	render(){
		let type = this.props.displayType;
		let display 
		switch(type){
			case 'small':
				display = (
							<tr onClick={this.props.handleClick}>
	                            <td>
	                                <img className="ui avatar image" src={this.state.data.smallImgUrl}></img><span>{this.state.data.name}</span>
	                            </td>
	                            <td>{this.state.data.description}</td>
	                            <td>{this.state.data.family}</td>
	                            <td>{this.state.data.hp}</td>
	                            <td>{this.state.data.energy}</td>
	                            <td>{this.state.data.defence}</td>
	                            <td>{this.state.data.attack}</td>
	                            <td>{this.state.data.price}$</td>
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
				break;

			case 'normal':
				display = (
						<div className="ui special cards">
							<div className="card">
	                                    <div className="content">
	                                            <div className="ui grid">
	                                                <div className="three column row">
	                                                    <div className="column">
	                                                        <i className="heart outline icon"></i>
	                                                        <span id="cardHPId">{this.state.data.hp}</span> 
	                                                    </div>
	                                                    <div className="column">
	                                                            <h5>{this.state.data.family}</h5>
	                                                    </div>
	                                                    <div className="column">
	                                                        <span id="energyId">{this.state.data.energy}</span> <i className="lightning icon"></i>
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
	                                                    {this.state.data.name}
	                                                  </a>
	                                                <img id="cardImgId" className="ui centered image" src={this.state.data.imgUrl}></img>
	                                            </div>
	                                        </div>
	                                    </div>
	                                    <div className="content">
	                                        <div className="ui form tiny">
	                                            <div className="field">
	                                                <label id="cardNameId"></label>
	                                                <textarea id="cardDescriptionId" className="overflowHiden" readonly="" rows="5">{this.state.data.description}</textarea>
	                                            </div>
	                                        </div>
	                                    </div>
	                                    <div className="content">
	                                        <i className="heart outline icon"></i><span id="cardHPId"> HP {this.state.data.hp}</span> 
	                                        <div className="right floated ">
	                                                <span id="cardEnergyId">Energy {this.state.data.hp}</span>
	                                            <i className="lightning icon"></i>
	                                             
	                                        </div>
	                                    </div>
	                                    <div className="content">
	                                        <span className="right floated">
	                                                <span id="cardAttackId"> Attack {this.state.data.attack}</span> 
	                                            <i className=" wizard icon"></i>
	                                        </span>
	                                        <i className="protect icon"></i>
	                                        <span id="cardDefenceId">Defense {this.state.data.defence}</span> 
	                                    </div>
	                                    <div className="ui bottom attached button">
	                                        <i className="money icon"></i>
	                                        Actual Value <span id="cardPriceId"> {this.state.data.price}$</span>
	                                    </div>
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
