import { REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILED } from "../actions/registrasiAction";

const initialState = {
  registrationSuccess: false,
  registrationRequest: false,
  registrationError: null,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return { ...state, loading: true, data: null, error: null };
    case REGISTRATION_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case REGISTRATION_FAILED:
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export default registrationReducer;
