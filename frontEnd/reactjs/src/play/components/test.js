import React, { Component } from 'react';
import NotificationAlert from 'react-notification-alert';

var options = {};
options = {
    place: 'tl',
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

class Test extends Component {
    myFunc(){
        this.refs.notify.notificationAlert(options);

        /*for (...){
            if(document.getElementById("myCheck").checked === true){
                checkCounter++;
            }
        }   
        if(checkCounter === 4){
            return true;
        }else{
            return false;
        }
        */


        
    }
  render() {
    return (
      <div>
          <NotificationAlert ref="notify" />
        <button onClick={() => this.myFunc()}>Hey</button>
      </div>
    );
  }
}

export default Test;