import React, {Component} from 'react';
import { connect } from 'react-redux';
import Card from './../../card/containers/Card'
import NotificationAlert from 'react-notification-alert';

class CardSelection extends Component{

	constructor(props){
		super(props);
		this.state = {
            
        };
        
        
    }
    
    startGame(){
        let checkCounter = 0;
        let listCardChecked = document.getElementsByClassName("form-check-input");
        let listIndex = [];

        for(let i=0; i<listCardChecked.length;i++){
            if(listCardChecked[i].checked === true){
                checkCounter++;
                listIndex.push(i);
            }
        }
        if (checkCounter === 4){
            this.props.startGameHandler(listIndex);
        }else{
            console.log(checkCounter + "notif erreur");

            const options = {
                place: 'tr',
                message: (
                    <div>
                        <div>
                            Please select exactly <b> 4 cards </b> from your deck.
                        </div>
                    </div>
                ),
                type: "danger",
                icon: "now-ui-icons ui-1_bell-53",
                autoDismiss: 7
            }

            this.refs.notify.notificationAlert(options);
        }

    }

	render(){
        let display;
        let renderList = [];
        for (let i in this.props.card){
            renderList.push(<Card card={this.props.card[i]} displayType="selectInline"></Card>)
        }
        display = (
            <div className="cardSelection">
                <NotificationAlert ref="notify" />
                <div className="ui grid block-container">
                    <div className="ten wide column">
                    <h3 className="ui aligned header"> Select 4 cards</h3>
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
                            <th>Selected</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderList}
                        </tbody>
                    </table>
                    </div>
                </div>
                <div>
                    <br></br>
                    <button onClick={() => this.startGame()}type="button" className="btn  btn-custom">Start game</button>
                </div>
            </div>
        );
		return display;
	}
}

export default connect()(CardSelection);
