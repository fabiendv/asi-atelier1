import{combineReducers }from'redux';
import loginReducer from './loginReducer';
// import signupReducer from'./signupReducer';

const globalReducer =combineReducers({
    loginReducer:loginReducer,
    // signupReducer:signupReducer
});

export default globalReducer;