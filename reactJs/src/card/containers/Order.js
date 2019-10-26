import React, {Component} from 'react';
import Card from './Card.js'
import { connect } from 'react-redux';
const axios = require('axios').default;

class Order extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      orderType: this.props.orderType,
      selectedCard: 1,
      card:[]
    };
 
  }

  componentWillMount() {
    let that = this;
    if(this.state.orderType==="Buy"){
      // Get cards to buy
      axios({
        method: 'get',
        baseURL: 'http://localhost:8082',
        url:`/cards_to_sell`,
        headers:{
            'Access-Control-Allow-Origin':'*'
        }
      })
      .then(function(response){;
          that.setState({ cards: response.data });
          that.cards = that.state.cards;   
      })
      .catch(function(error){
          console.log("error"+error);
      });
    }else{
      // Get cards to sell 
      axios({
        method: 'get',
        baseURL: 'http://localhost:8082',
        url:`/user/${that.props.user.id}`,
        headers:{
            'Access-Control-Allow-Origin':'*'
        }
      })
      .then(function(response){;
          
        that.setState({ cards: response.data.cardList });
        that.cards = that.state.cards;   

      })
      .catch(function(error){
          console.log("error"+error);
      });
    }

  }

  render() {

    if(this.state.cards){
      if(this.state.cards.length === 0){
        return null;
      }else{
        
        let table = [];
        let selectedCardRender;

        // console.log('this.state.cards'+JSON.stringify(this.state.cards));

        for (let i in this.state.cards){
  
          // Add all cards in the display line
          table.push(<Card displayType='small' orderType={this.state.orderType} card={this.state.cards[i]} user={this.props.user}></Card>);

          // Find the associated selected card to display on the right
          if (this.props.selectedCard===undefined){
            selectedCardRender = (<Card displayType='normal' orderType={this.state.orderType} card={this.state.cards[0]} ></Card>)
          }
          else if(this.props.selectedCard===this.state.cards[i].id){
            selectedCardRender = (<Card displayType='normal' orderType={this.state.orderType} card={this.state.cards[i]} ></Card>)
          }

        }
  
        return(
         
          <div className="ui grid block-container">
            <div className="ten wide column centered" id="cardListIdContainer">
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
                    <th></th>
                </tr>
                </thead>
                <tbody>
                  {table}
                </tbody>
              </table>
            </div>
            <div className="five wide column centered">
              {selectedCardRender}
            </div>
            </div>
            
        );
      }
    }else{
      return null;
    }
    
  }

}

const mapState = (state, ownprops) => {
  return {
    selectedCard: state.cardReducer.id
  }
}

export default connect(mapState)(Order);