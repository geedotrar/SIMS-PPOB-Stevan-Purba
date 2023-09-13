const initialState = {
  historyData: [],
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HISTORY":
      return { ...state, historyData: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
