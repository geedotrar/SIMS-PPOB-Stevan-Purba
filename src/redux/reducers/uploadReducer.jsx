import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAILED } from "../actions/uploadAction";

const initialState = {
  uploading: false,
  uploadSuccess: null,
  uploadError: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return { ...state, uploading: true, uploadSuccess: null, uploadError: null };
    case UPLOAD_SUCCESS:
      return { ...state, uploading: false, uploadSuccess: action.payload, uploadError: null };
    case UPLOAD_FAILED:
      return { ...state, uploading: false, uploadSuccess: null, uploadError: action.payload };
    default:
      return state;
  }
};

export default uploadReducer;
