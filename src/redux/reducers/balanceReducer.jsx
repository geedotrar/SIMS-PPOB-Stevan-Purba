const initialState = {
  balanceData: [],
};

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BALANCE":
      return { ...state, balanceData: action.payload };
    default:
      return state;
  }
};

export default balanceReducer;
