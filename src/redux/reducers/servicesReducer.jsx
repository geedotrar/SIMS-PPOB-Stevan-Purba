import { PAYMENT_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAILED } from "../actions/servicesAction";

const initialState = {
  servicesData: [],
  error: null,
  paymentSuccess: false,
  PaymentRequest: false,
  paymentError: null,
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVICES":
      return { ...state, servicesData: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case PAYMENT_REQUEST:
      return { ...state, loading: true, data: null, error: null };
    case PAYMENT_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case PAYMENT_FAILED:
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default servicesReducer;
