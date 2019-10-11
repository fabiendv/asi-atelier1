const loginReducer=(state={},action)=>{
    switch(action.type){
        case 'GO_SIGNUP':
            return {
                hasaccount:action.hasAccount
            };
        case 'GO_LOGIN':
            return {
                hasaccount:action.hasAccount,
                islogged:action.isLogged
            };
        case 'SET_USERSESSION':
            return {
                hasaccount:action.hasAccount,
                islogged:action.isLogged,
                user:action.user,
                buyCard:action.buyCard,
                sellCard:action.sellCard,
                play:action.play
            }
        case 'SET_BUYACTION':
            return {
                hasaccount:action.hasAccount,
                islogged:action.isLogged,
                user:action.user,
                buyCard:action.buyCard,
                sellCard:action.sellCard,
                play:action.play
            }
        case 'GO_MAINMENU':
                return{
                    hasaccount:action.hasAccount,
                    islogged:action.isLogged,
                    buyCard:action.buyCard,
                    sellCard:action.sellCard,
                    play:action.play
                };
        case 'GO_BUY':
            return{
                hasaccount:action.hasAccount,
                islogged:action.isLogged,
                buyCard:action.buyCard,
                sellCard:action.sellCard,
                play:action.play
            };
        case 'GO_SELL':
            return{
                hasaccount:action.hasAccount,
                islogged:action.isLogged,
                buyCard:action.buyCard,
                sellCard:action.sellCard,
                play:action.play
            };
        case 'GO_PLAY':
            return{
                hasaccount:action.hasAccount,
                islogged:action.isLogged,
                buyCard:action.buyCard,
                sellCard:action.sellCard,
                play:action.play
            };
        case 'UPDATE_BUY_SELECTED_CARD':
            return{
                hasaccount:true,
                islogged:true,
                buyCard:true,
                sellCard:false,
                play:false,
            };
        case 'UPDATE_SELL_SELECTED_CARD':
            return{
                hasaccount:true,
                islogged:true,
                buyCard:false,
                sellCard:true,
                play:false,
            };
        default:
            return {hasaccount:true,islogged:undefined,};
    }
}
export default loginReducer;