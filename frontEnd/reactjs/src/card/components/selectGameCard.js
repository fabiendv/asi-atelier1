import React, {Component} from 'react';
import { connect } from 'react-redux';

class SelectGameCard extends Component{

	constructor(props){
		super(props);
		this.state = {
			card: this.props.card,
		};
	}

	render(){
		let display = (
            <div className="ui special cards centered">
                <div className="selectGameCard card ui button">
                    <div className="content">
                        <h5 className="">{this.props.card.name}</h5>
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
                                <img id="cardImgId" alt="card" className="ui centered image" src={this.props.card.imgUrl}></img>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="ui">
                            <div className="field">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
		return display;
	}
}

export default connect()(SelectGameCard);
