const loginReducer=(state={hasaccount:true},action)=>{
    console.log("ACTION"+JSON.stringify(action));
    switch(action.type){
        case 'GO_SIGNUP':
            return {hasaccount:!action.hasAccount};
        default:
            return {hasaccount:true};
    }
}
export default loginReducer;