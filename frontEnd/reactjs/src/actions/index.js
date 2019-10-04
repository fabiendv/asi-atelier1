export const setSignupPage=(hasAccount)=>{
    return {
        type: 'GO_SIGNUP',
        hasAccount: hasAccount
    };
}


// export const setSelectedPart=(part_obj)=>{
//     return {
//         type: 'UPDATE_SELECTED_PART',
//         obj:part_obj
//     };
// }