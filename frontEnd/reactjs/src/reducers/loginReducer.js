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
        default:
            return {hasaccount:true,islogged:undefined,};
    }
}
export default loginReducer;