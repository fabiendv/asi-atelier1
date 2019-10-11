import React, {Component} from 'react';
import { connect } from 'react-redux';
import {setBuySelectedCard, setSellSelectedCard, setMainMenuPage, setBuyAction, setBuyPage, setSellPage} from './../../actions/index'
const axios = require('axios').default;

class InlineCard extends Component{

	constructor(props){
		super(props);
		this.state = {
			card: this.props.card,
		};
        this.handleOnCardSelected=this.handleOnCardSelected.bind(this);
        this.buyOrSellCard=this.buyOrSellCard.bind(this);
	}

	handleOnCardSelected(cardObject){
        if(this.props.orderType==="Buy"){
            this.props.dispatch(setBuySelectedCard(cardObject));
        }

        if(this.props.orderType==="Sell"){
            this.props.dispatch(setSellSelectedCard(cardObject));
        }
    }
    
    buyOrSellCard(cardObject){

        var that = this;

        if(this.props.orderType==="Buy"){
            // Need to buy the card

            // Check the user's money
            if(this.props.user.account>=cardObject.price){
                // Payer
                axios({
                    method: 'post',
                    baseURL: 'http://localhost:8082',
                    url:`/buy`,
                    data:
                    {
                        "user_id":`${that.props.user.id}`,
                        "card_id":`${cardObject.id}`
                    },
                    headers:{
                        'Access-Control-Allow-Origin':'*'
                    }
                  })
                  .then(function(response){;
                      
                    console.log("Buying cards: "+JSON.stringify(response));
                    var those = that;

                    axios({
                        method: 'get',
                        baseURL: 'http://localhost:8082',
                        url:`/user/${those.props.user.id}`,
                        headers:{
                            'Access-Control-Allow-Origin':'*'
                        }
                      })
                      .then(function(response){;
                          
                        console.log("Getting USER: "+JSON.stringify(response.data));
                        // Update the user's infomation
                        those.props.dispatch(setBuyAction(response.data));
                        those.props.dispatch(setMainMenuPage());
                        those.props.dispatch(setBuyPage());
                  
                      })
                      .catch(function(error){
                          console.log("error"+error);
                      });

              
                  })
                  .catch(function(error){
                      console.log("error"+error);
                      // REDIRIGER TO LOGIN - MAYBE
                  });
            }
        }

        if(this.props.orderType==="Sell"){
            // Need to sell the card

            axios({
                method: 'post',
                baseURL: 'http://localhost:8082',
                url:`/sell`,
                data:
                {
                    "user_id":`${that.props.user.id}`,
                    "card_id":`${cardObject.id}`
                },
                headers:{
                    'Access-Control-Allow-Origin':'*'
                }
              })
              .then(function(response){;
                  
                console.log("Selling cards: "+JSON.stringify(response));
                var those = that;

                axios({
                    method: 'get',
                    baseURL: 'http://localhost:8082',
                    url:`/user/${those.props.user.id}`,
                    headers:{
                        'Access-Control-Allow-Origin':'*'
                    }
                  })
                  .then(function(response){;
                      
                    console.log("Getting USER: "+JSON.stringify(response.data));
                    those.props.dispatch(setBuyAction(response.data));
                    those.props.dispatch(setMainMenuPage());
                    those.props.dispatch(setSellPage());
              
                  })
                  .catch(function(error){
                      console.log("error"+error);
                  });

          
              })
              .catch(function(error){
                  console.log("error"+error);
                  // REDIRIGER TO LOGIN - MAYBE
              });

        }


    }

	render(){
        let display;
        // console.log("THIS IS THE CARD: "+JSON.stringify(this.props.card));
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
                    <div className="ui vertical animated button" tabIndex="0" onClick={(e)=>{e.stopPropagation(); this.buyOrSellCard(this.props.card)}}>
                        <div className="hidden content">
                            {this.props.orderType}
                        </div>
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
