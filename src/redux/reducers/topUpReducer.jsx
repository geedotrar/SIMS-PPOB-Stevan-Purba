import { TOP_UP_REQUEST, TOP_UP_SUCCESS, TOP_UP_FAILED } from "../actions/topUpAction";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const topUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOP_UP_REQUEST:
      return { ...state, loading: true, data: null, error: null };
    case TOP_UP_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case TOP_UP_FAILED:
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default topUpReducer;
