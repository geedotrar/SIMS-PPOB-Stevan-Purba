const initialState = {
  bannerData: [],
  error: null,
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BANNER_DATA":
      return { ...state, bannerData: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default bannerReducer;
