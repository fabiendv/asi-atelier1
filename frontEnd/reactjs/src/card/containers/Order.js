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
      // cards:[{"id":8,"name":"name6","description":"description6","family":"family6","affinity":"affinity6","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":98.01631,"defence":66.39604,"attack":49.8273,"price":111.0,"userId":null,"storeId":null},{"id":9,"name":"name0","description":"description0","family":"family0","affinity":"affinity0","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":37.266636,"defence":59.13797,"attack":27.992838,"price":111.0,"userId":null,"storeId":null},{"id":10,"name":"name6","description":"description6","family":"family6","affinity":"affinity6","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":45.595394,"defence":91.1853,"attack":13.563395,"price":111.0,"userId":null,"storeId":null},{"id":11,"name":"name6","description":"description6","family":"family6","affinity":"affinity6","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":9.096569,"defence":12.186277,"attack":33.486973,"price":111.0,"userId":14,"storeId":null},{"id":12,"name":"name6","description":"description6","family":"family6","affinity":"affinity6","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":19.894445,"defence":36.333508,"attack":26.213676,"price":111.0,"userId":7,"storeId":null},{"id":15,"name":"name8","description":"description8","family":"family8","affinity":"affinity8","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":61.121063,"defence":15.3771105,"attack":49.561405,"price":111.0,"userId":14,"storeId":null},{"id":16,"name":"name0","description":"description0","family":"family0","affinity":"affinity0","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":73.38144,"defence":77.99005,"attack":11.871308,"price":111.0,"userId":14,"storeId":null},{"id":17,"name":"name4","description":"description4","family":"family4","affinity":"affinity4","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":42.053543,"defence":95.95266,"attack":25.378727,"price":111.0,"userId":14,"storeId":null}]
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
          // REDIRIGER TO LOGIN - MAYBE
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