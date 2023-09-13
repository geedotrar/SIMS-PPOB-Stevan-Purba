const initialState = {
  token: null,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload, isAuthenticated: true };
    case "SET_LOGOUT":
      return { ...state, token: null, isAuthenticated: false };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
