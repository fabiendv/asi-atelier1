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

export const setUserSession = (element)=>{
    return{
        type: 'SET_USERSESSION',
        user: element,
        hasAccount: true,
        isLogged: true,
        buyCard:false,
        sellCard:false,
        play:false
    }
}

export const setBuyAction = (element)=>{
    return{
        type: 'SET_BUYACTION',
        user: element,
        hasAccount: true,
        isLogged: true,
        buyCard:true,
        sellCard:false,
        play:false
    }
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

export const setPlayPage = ()=>{
    return{
        type: 'GO_PLAY',
        hasAccount: true,
        isLogged: true,
        buyCard:false,
        sellCard:false,
        play:true
    }
}

export const setBuySelectedCard=(cardObject)=>{
    return{
        type: 'UPDATE_BUY_SELECTED_CARD',
        obj: cardObject
    };
}

export const setSellSelectedCard=(cardObject)=>{
    return{
        type: 'UPDATE_SELL_SELECTED_CARD',
        obj: cardObject
    };
}