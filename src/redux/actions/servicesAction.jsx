import { servicePayment as performServicePayment } from "../../redux/api/api";
export const PAYMENT_REQUEST = "PAYMENT_REQUEST";
export const PAYMENT_SUCCESS = "PAYMENT_SUCCESS";
export const PAYMENT_FAILED = "PAYMENT_FAILED";

export const setServices = (data) => ({
  type: "SET_SERVICES",
  payload: data,
});

export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});

export const paymentRequest = () => ({
  type: PAYMENT_REQUEST,
});
export const paymentSuccess = () => ({
  type: PAYMENT_SUCCESS,
});

export const paymentFailed = (error) => ({
  type: PAYMENT_FAILED,
  payload: error,
});

export const servicePaymentAction = (serviceCode, token) => (dispatch) => {
  dispatch(paymentRequest());

  return performServicePayment(serviceCode, token)
    .then((response) => {
      dispatch(paymentSuccess(response));
      return response;
    })
    .catch((error) => {
      dispatch(paymentFailed(error));
      throw error;
    });
};
