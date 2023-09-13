import { register as performRegistration } from "../../redux/api/api";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const registrationRequest = () => ({
  type: REGISTRATION_REQUEST,
});

export const registrationSuccess = (data) => ({
  type: REGISTRATION_SUCCESS,
  payload: data,
});

export const registrationFailed = (error) => ({
  type: REGISTRATION_FAILED,
  payload: error,
});

export const registrationAction = (email, password, firstName, lastName) => async (dispatch) => {
  dispatch(registrationRequest());

  return performRegistration(email, password, firstName, lastName)
    .then((response) => {
      dispatch(registrationSuccess(response));
      return response;
    })
    .catch((error) => {
      dispatch(registrationFailed(error));
      throw error;
    });
};
