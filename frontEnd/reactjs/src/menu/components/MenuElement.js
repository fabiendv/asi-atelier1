import React, { Component } from 'react';
import { setBuyPage, setSellPage } from '../../actions';
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
    }

    render() {
        let type = this.props.type;
        let display;
        switch(type){
            case 'buy':
                display = (
                    <a className="btn btn-block btn-lg btn-primary" role="button" onClick={()=>{this.handleBuySelected()}}>
                        <i className={this.props.imgURL}></i>
                        {this.props.type}
                    </a>
                );
                break;
            case 'sell':
                display = (
                    <a className="btn btn-block btn-lg btn-primary" role="button" onClick={()=>{this.handleSellSelected()}}>
                        <i className={this.props.imgURL}></i>
                        {this.props.type}
                    </a>
                );
                break;
            case 'play':
                display = (
                    <a className="btn btn-block btn-lg btn-primary" role="button" onClick={()=>{this.handlePlaySelected()}}>
                        <i className={this.props.imgURL}></i>
                        {this.props.type}
                    </a>
                );
                break;
        }
        return display;
    }
}
export default connect()(MenuElement);