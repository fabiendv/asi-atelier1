import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardSelection from './../components/cardSelection'
import WaitRoom from "./../components/waitRoom"

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

    startGameHandler(){
        console.log("start");
        this.setState({view:"wait"});
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
                render = (<CardSelection card={this.card} startGameHandler={this.startGameHandler}></CardSelection>)
                break;
            case "wait":
                render = (<WaitRoom />)
                break;
            case "game":
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