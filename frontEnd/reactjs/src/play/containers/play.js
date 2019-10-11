import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardSelection from './../components/cardSelection'
import WaitRoom from "./../components/waitRoom"
import Game from "./../components/game"

class Play extends Component {
    constructor(props){
        super(props);
        this.state = {
            view:"cardSelection"
        };
        this.card = {
            name:"nom",
            description:"desc",
            family:"fam",
            hp:"10",
            energy:"20",
            defence:"15",
            attack:"02",
            price:"100",
            smallImgUrl:"https://vignette.wikia.nocookie.net/lego/images/4/48/76096_Minifigure_04.jpg/revision/latest/scale-to-width-down/250?cb=20190729133554"
        }

        this.startGameHandler=this.startGameHandler.bind(this);
    }

    test(){
            // // Payer
            // axios({
            //     method: 'post',
            //     baseURL: 'http://localhost:8082',
            //     url:`/buy`,
            //     data:
            //     {
            //         "user_id":`${that.props.user.id}`,
            //         "card_id":`${cardObject.id}`
            //     },
            //     headers:{
            //         'Access-Control-Allow-Origin':'*'
            //     }
            //     })
            //     .then(function(response){;
                    
            //     console.log("Buying cards: "+JSON.stringify(response));
            //     var those = that;

            //     axios({
            //         method: 'get',
            //         baseURL: 'http://localhost:8082',
            //         url:`/user/${those.props.user.id}`,
            //         headers:{
            //             'Access-Control-Allow-Origin':'*'
            //         }
            //         })
            //         .then(function(response){;
                        
            //         console.log("Getting USER: "+JSON.stringify(response.data));
            //         // Update the user's infomation
            //         those.props.dispatch(setBuyAction(response.data));
            //         those.props.dispatch(setMainMenuPage());
            //         those.props.dispatch(setBuyPage());
                
            //         })
            //         .catch(function(error){
            //             console.log("error"+error);
            //         });

            
            //     })
            //     .catch(function(error){
            //         console.log("error"+error);
            //         // REDIRIGER TO LOGIN - MAYBE
            //     });
    }

    startGameHandler(listIndex){
        let that = this;
        that.setState({view:"wait"});
        //let username = document.getElementById
        let socket = require('socket.io-client')('http://localhost:1337');
        socket.emit("newPlayerIsWaiting",that.props.user);

        socket.on("launchGame",function(){
            that.setState({view:"game"});
        });
    }

    render(){
        let view
        if (this.props.view == undefined){
            view = this.state.view;
        }
        else{
            view = this.props.view;
        }

        let render
        switch(view){
            case "cardSelection":
                render = (<CardSelection card={this.props.user.cardList} startGameHandler={this.startGameHandler}></CardSelection>)
                break;
            case "wait":
                render = (<WaitRoom />)
                break;
            case "game":
                render = (<Game />)
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