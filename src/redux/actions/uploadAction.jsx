import { uploadImage as performUploadImage } from "../api/api";

export const UPLOAD_REQUEST = "UPLOAD_REQUEST";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILED = "UPLOAD_FAILED";

export const uploadRequest = () => ({
  type: UPLOAD_REQUEST,
});

export const uploadSuccess = (data) => ({
  type: UPLOAD_SUCCESS,
  payload: data,
});

export const uploadFailed = (error) => ({
  type: UPLOAD_FAILED,
  payload: error,
});

export const uploadAction = (token, image) => async (dispatch) => {
  dispatch(uploadRequest());

  try {
    const response = await performUploadImage(token, image);
    dispatch(uploadSuccess(response));
    return response;
  } catch (error) {
    dispatch(uploadFailed(error));
    throw error;
  }
};
