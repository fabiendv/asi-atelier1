const signupReducer=(state={hasaccount:true},action)=>{
    switch(action.type){
        case 'GO_LOGIN':
            return {hasaccount:!action.hasAccount};
        default:
            return {hasaccount:true};
    }
}
export default signupReducer;