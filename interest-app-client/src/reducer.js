const row = (state, action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return {
        id: action.id,
        currencyCode: 'USD'
      }
    case 'CHANGE_ROW_CURRENCY':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        currencyCode: action.currencyCode 
      };
    default:
      return state;
  }
}

const rows = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return [
        ...state,
        row(undefined, action)
      ];
    case 'CHANGE_ROW_CURRENCY':
      return state.map(r => row(r, action));
    default:
      return state;
  }
}

const mainValue = (state = 1, action) => {
  if (action.type === 'CHANGE_MAIN_VALUE') {
    return action.mainValue
  } else {
    return state;
  }
}
const mainCurrencyCode = (state = 1, action) => {
  if (action.type === 'CHANGE_MAIN_CURRENCY') {
    return action.mainCurrencyCode
  } else {
    return state;
  }
}
const mainInterest = (state = 1, action) => {
  if (action.type === 'CHANGE_MAIN_INTEREST') {
    return action.mainInterest
  } else {
    return state;
  }
}

export default (state = {}, action) => {
  return {
    rows: rows(
      state.rows,
      action
    ),
    mainValue: mainValue(
      state.mainValue,
      action
    ),
    mainInterest: mainInterest(
      state.mainInterest,
      action
    ),
    mainCurrencyCode: mainCurrencyCode(
      state. mainCurrencyCode,
      action
    )
  }
}
// export default (state = {}, action) => {
//   switch (action.type) {
//     case 'CHANGE_MAIN_CURRENCY':
//       return Object.assign({}, state, {
//         currencyCode: action.currencyCode
//         });
//     case 'CHANGE_MAIN_VALUE':
//       return Object.assign({}, state, {
//         value: action.value
//       });
//     case 'CHANGE_MAIN_INTEREST':
//       return Object.assign({}, state, {
//         interest: action.interest
//       });
//     case 'ADD_ROW':
//       return [
//         ...state,
//         addRow(undefined, action)
//       ];
//     case 'REMOVE_ROW':
//       return 

//     default:
//       return state;
//   }
// }