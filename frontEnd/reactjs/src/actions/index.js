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

export const setSelectedCard=(cardObject)=>{
    return{
        type: 'UPDATE_SELECTED_CARD',
        obj: cardObject
    };
}
