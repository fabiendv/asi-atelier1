import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardSelection from './../components/cardSelection'
import WaitRoom from "./../components/waitRoom"
import Game from "../components/game/containers/game"

class Play extends Component {
    constructor(props){
        super(props);
        this.state = {
            view:"cardSelection",
            player1:null,
            player2:null,
            // cards:[{"id":8,"name":"name6","description":"description6","family":"family6","affinity":"affinity6","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":98.01631,"defence":66.39604,"attack":49.8273,"price":111.0,"userId":null,"storeId":null},{"id":9,"name":"name0","description":"description0","family":"family0","affinity":"affinity0","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":37.266636,"defence":59.13797,"attack":27.992838,"price":111.0,"userId":null,"storeId":null},{"id":10,"name":"name6","description":"description6","family":"family6","affinity":"affinity6","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":45.595394,"defence":91.1853,"attack":13.563395,"price":111.0,"userId":null,"storeId":null},{"id":11,"name":"name6","description":"description6","family":"family6","affinity":"affinity6","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":9.096569,"defence":12.186277,"attack":33.486973,"price":111.0,"userId":14,"storeId":null},{"id":12,"name":"name6","description":"description6","family":"family6","affinity":"affinity6","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":19.894445,"defence":36.333508,"attack":26.213676,"price":111.0,"userId":7,"storeId":null},{"id":15,"name":"name8","description":"description8","family":"family8","affinity":"affinity8","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":61.121063,"defence":15.3771105,"attack":49.561405,"price":111.0,"userId":14,"storeId":null},{"id":16,"name":"name0","description":"description0","family":"family0","affinity":"affinity0","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":73.38144,"defence":77.99005,"attack":11.871308,"price":111.0,"userId":14,"storeId":null},{"id":17,"name":"name4","description":"description4","family":"family4","affinity":"affinity4","imgUrl":"http://medias.3dvf.com/news/sitegrab/gits2045.jpg","smallImgUrl":"https://cdn.animenewsnetwork.com/thumbnails/fit600x1000/cms/feature/89858/05.jpg","energy":100.0,"hp":42.053543,"defence":95.95266,"attack":25.378727,"price":111.0,"userId":14,"storeId":null}]
        };

        this.startGameHandler=this.startGameHandler.bind(this);
    }

    startGameHandler(listIndex){
        let that = this;
        that.setState({view:"wait"});
        //let username = document.getElementById
        let socket = require('socket.io-client')('http://localhost:1337');
        socket.emit("newPlayerIsWaiting",that.props.user);

        socket.on("launchGame",function(player1, player2){
            that.setState({
                view:"game",
                player1:player1,
                player2:player2
            });
        });
    }

    render(){
        let view
        if (this.props.view === undefined){
            view = this.state.view;
        }
        else{
            view = this.props.view;
        }

        let render
        switch(view){
            case "cardSelection":
                render = (<CardSelection card={this.props.user.cardList} startGameHandler={this.startGameHandler}></CardSelection>)
                /*render = (<CardSelection card={this.state.cards} startGameHandler={this.startGameHandler}></CardSelection>)*/
                break;
            case "wait":
                render = (<WaitRoom />)
                break;
            case "game":
                render = (<Game user={this.props.user} player1={this.state.player1} player2={this.state.player2}/>)
                break;
            default:
                console.log("Error: this view doesn't exist !");
        }

        return(
            <div className="play">
                {render}
            </div>
        )
    }
}

export default connect()(Play);