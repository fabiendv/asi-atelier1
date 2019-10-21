import React, { Component } from 'react';
import { setBuyPage, setSellPage, setPlayPage } from '../../actions';
import { connect } from 'react-redux';

class MenuElement extends Component{

    constructor(props) {
        super(props);
        this.state = {
            type : props.type,
            imgURL : props.imgURL,
            link : props.link
        };
        this.handleBuySelected=this.handleBuySelected.bind(this);
        this.handleSellSelected=this.handleSellSelected.bind(this);
        this.handlePlaySelected=this.handlePlaySelected.bind(this);
    }

    handleBuySelected(){
        console.log("Buy selected");
        this.props.dispatch(setBuyPage());
    }

    handleSellSelected(){
        console.log("Sell selected");
        this.props.dispatch(setSellPage());
    }

    handlePlaySelected(){
        console.log("Play selected");
        this.props.dispatch(setPlayPage());
    }

    render() {
        let type = this.props.type;
        let display;
        switch(type){
            case 'buy':
                display = (
                    <button className="btn btn-block btn-lg btn-custom"  onClick={()=>{this.handleBuySelected()}}>
                        <i className={this.props.imgURL}></i>
                        <span className="text-button">{this.props.type}</span>
                    </button>
                );
                break;
            case 'sell':
                display = (
                    <button className="btn btn-block btn-lg btn-custom"  onClick={()=>{this.handleSellSelected()}}>
                        <i className={this.props.imgURL}></i>
                        <span className="text-button">{this.props.type}</span>
                    </button>
                );
                break;
            case 'play':
                display = (
                    <button className="btn btn-block btn-lg btn-custom"  onClick={()=>{this.handlePlaySelected()}}>
                        <i className={this.props.imgURL}></i>
                        <span className="text-button">{this.props.type}</span>
                    </button>
                );
                break;
            default:
        }
        return display;
    }
}
export default connect()(MenuElement);