export const createAccount=(hasAccount)=>{
    return {
        type: 'GO_SIGNUP',
        hasAccount: hasAccount,
    };
}

export const setLoginPage = (hasAccount, isLogged)=>{
    return {
        type: 'GO_LOGIN',
        hasAccount: hasAccount,
        isLogged: isLogged
    };
}

export const setMainMenuPage = ()=>{
    return{
        type: 'GO_MAINMENU',
        hasAccount: true,
        isLogged: true,
        buyCard:false,
        sellCard:false,
        play:false
    }
}

export const setBuyPage = ()=>{
    return{
        type: 'GO_BUY',
        hasAccount: true,
        isLogged: true,
        buyCard:true,
        sellCard:false,
        play:false
    }
}

export const setSellPage = ()=>{
    return{
        type: 'GO_SELL',
        hasAccount: true,
        isLogged: true,
        buyCard:false,
        sellCard:true,
        play:false
    }
}

export const setSelectedCard=(cardObject)=>{
    return{
        type: 'UPDATE_SELECTED_CARD',
        obj: cardObject
    };
}
