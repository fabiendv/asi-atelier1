import{combineReducers }from'redux';
import loginReducer from './loginReducer';
import cardReducer from './cardReducer';

const globalReducer =combineReducers({
    loginReducer:loginReducer,
    cardReducer:cardReducer
});

export default globalReducer;