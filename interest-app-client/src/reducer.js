export default (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_MAIN_CURRENCY':
      return Object.assign({}, state, {
        currencyCode: action.currencyCode
        });
    case 'CHANGE_MAIN_VALUE':
      return Object.assign({}, state, {
        value: action.value
      });
    case 'CHANGE_MAIN_INTEREST':
      return Object.assign({}, state, {
        interest: action.interest
      });
    default:
      return state;
  }
}
