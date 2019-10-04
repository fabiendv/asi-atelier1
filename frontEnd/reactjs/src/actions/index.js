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
