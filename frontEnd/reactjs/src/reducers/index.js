import{combineReducers }from'redux';
import loginReducer from './loginReducer';
// import signupReducer from'./signupReducer';
import cardReducer from './cardReducer';

const globalReducer =combineReducers({
    loginReducer:loginReducer,
    // signupReducer:signupReducer
    cardReducer:cardReducer
});

export default globalReducer;