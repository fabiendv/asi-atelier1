export const setSignupPage=(hasAccount)=>{
    return {
        type: 'GO_SIGNUP',
        hasAccount: hasAccount
    };
}

export const setLoginPage=(hasAccount)=>{
    return {
        type: 'GO_LOGIN',
        hasAccount: hasAccount
    };
}

export const setSelectedCard=(cardObject)=>{
    return{
        type: 'UPDATE_SELECTED_CARD',
        obj: cardObject
    };
}
