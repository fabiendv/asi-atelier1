const cardReducer= (state={},action) => {
    switch (action.type) {
        case 'UPDATE_BUY_SELECTED_CARD':
            return action.obj;
        case 'UPDATE_SELL_SELECTED_CARD':
            return action.obj;
    default:
      return state;
    }
}

export default cardReducer;