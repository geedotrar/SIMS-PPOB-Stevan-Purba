// topUpActions.js
import { topUp as performTopUp } from "../../redux/api/api"; // Import your top-up API function

export const TOP_UP_REQUEST = "TOP_UP_REQUEST";
export const TOP_UP_SUCCESS = "TOP_UP_SUCCESS";
export const TOP_UP_FAILED = "TOP_UP_FAILED";

export const topUpRequest = () => ({
  type: TOP_UP_REQUEST,
});

export const topUpSuccess = (data) => ({
  type: TOP_UP_SUCCESS,
  payload: data,
});

export const topUpFailed = (error) => ({
  type: TOP_UP_FAILED,
  payload: error,
});

export const topUp = (topUpAmount, token) => (dispatch) => {
  dispatch(topUpRequest());

  return performTopUp(topUpAmount, token)
    .then((response) => {
      dispatch(topUpSuccess(response));
      return response;
    })
    .catch((error) => {
      dispatch(topUpFailed(error));
      throw error;
    });
};
