import React, { Component } from 'react';
import { setBuyPage, setSellPage, setPlayPage } from '../../actions';
import { connect } from 'react-redux';
import NotificationAlert from 'react-notification-alert';

const axios = require('axios').default;

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
        this.updateInfo=this.updateInfo.bind(this);
    }

    updateInfo(infoType,messageSent){
        const options = {
            place: 'tc',
            message: (
                <div>
                    <div>
                        {messageSent}
                    </div>
                </div>
            ),
            type: infoType,
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 7
        }
        this.refs.notify.notificationAlert(options);
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
        console.log("Play selected. User money: "+JSON.stringify(this.props.user));
        var that = this;

        // Test si l'utilisateur a $50 pour lancer une partie
        if(this.props.user.account>=50){
            // Retirer $50 a l'utilisateur
            axios({
                method: 'put',
                baseURL: 'http://localhost:8082',
                url:`/user/${that.props.user.id}`,
                data:
                {
                    surname:that.props.user.surName,
                    lastname:that.props.user.lastName,
                    login:that.props.user.login,
                    pwd:that.props.user.pwd,
                    account:that.props.user.account-50,
                    img:that.props.user.img,
                },
                headers:{
                    'Access-Control-Allow-Origin':'*'
                }
                })
                .then(function(response){;
                    that.props.dispatch(setPlayPage());
                })
                .catch(function(error){
                    console.log("Credit the money error: "+error);
                    // REDIRIGER TO LOGIN - MAYBE
                });

        }else{
            // l'utilisateur n'a pas les sous
            this.updateInfo("danger","Vous n'avez pas la somme requise sur votre compte.")
        }
    }

    render() {
        let type = this.props.type;
        let display;
        switch(type){
            case 'buy':
                display = (
                    <button className="btn btn-block btn-lg btn-custom"  onClick={()=>{this.handleBuySelected()}}>
                        <i className={this.props.imgURL}></i>
                        <span className="text-button">{this.props.type}</span>
                    </button>
                );
                break;
            case 'sell':
                display = (
                    <button className="btn btn-block btn-lg btn-custom"  onClick={()=>{this.handleSellSelected()}}>
                        <i className={this.props.imgURL}></i>
                        <span className="text-button">{this.props.type}</span>
                    </button>
                );
                break;
            case 'play':
                display = (
                    <div>
                        <NotificationAlert ref="notify" />
                        <button className="btn btn-block btn-lg btn-custom"  onClick={()=>{this.handlePlaySelected()}}>
                            <i className={this.props.imgURL}></i>
                            <span className="text-button">{this.props.type} - $50</span>
                        </button>
                    </div>
                );
                break;
            default:
        }
        return display;
    }
}
export default connect()(MenuElement);