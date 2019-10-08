import React, {Component} from 'react';
import Card from './Card.js'

class Order extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      orderType: this.props.orderType,
      selectedCard: 0
    };
    this.cards ={ 
          "0": {
          "name": "Superman",
          "description": "desc",
          "family": "DC",
          "affinity": "",
          "imgUrl": "https://static.hitek.fr/img/actualite/2017/06/27/i_deadpool-2.jpg",
          "smallImgUrl": "https://vignette.wikia.nocookie.net/lego/images/4/48/76096_Minifigure_04.jpg/revision/latest/scale-to-width-down/250?cb=20190729133554",
          "energy": "10",
          "hp": "10",
          "defence": "2",
          "attack": "5",
          "price": "1000"
        },
        "1": {
          "name": "Batman",
          "description": "desc",
          "family": "fam",
          "affinity": "afini",
          "imgUrl": "https://static.hitek.fr/img/actualite/2017/06/27/i_deadpool-2.jpg",
          "smallImgUrl": "https://static.fnac-static.com/multimedia/Images/8F/8F/7D/66/6716815-1505-1540-1/tsp20171122191008/Lego-lgtob12b-lego-batman-movie-lampe-torche-batman.jpg",
          "energy": "10",
          "hp": "10",
          "defence": "2",
          "attack": "5",
          "price": "1000"
        }
      }
    this.handleClick=this.handleClick.bind(this);
    };

  handleClick(e){
    this.setState({selectedCard:e.target.parentNode.rowIndex})
  }


  render() {
    let table = [];
    for (let i in this.cards){
      table.push(<Card displayType='small' orderType={this.state.orderType} data={this.cards[i]} handleClick={this.handleClick}></Card>);
    }

    return (
      <div className="ui grid">
        <div className="ten wide column">
          <h3 className="ui aligned header"> My Card List</h3>
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
        <div className=" five wide column">
          <Card displayType='normal' orderType={this.state.orderType} data={this.cards[this.state.selectedCard]} ></Card>
        </div>
      </div>
    ); 
  }

}

export default Order;