import {
  FILE_STORAGE,
  FILE_STORAGE_FAILED,
  FILE_STORAGE_SUCCESSFUL,
  RESET_FILE_STORAGE_FLAG,
} from "./actionTypes";

const initialState = {
  uploadError: null,
  message: null,
  loading: false,
  file: null,
  success: false,
  error: false,
};

const FileStorage = (state = initialState, action) => {
  switch (action.type) {
    case FILE_STORAGE:
      state = {
        ...state,
        loading: true,
        uploadError: null,
      };
      break;
    case FILE_STORAGE_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        file: action.payload,
        success: true,
        uploadError: null,
      };
      break;
    case FILE_STORAGE_FAILED:
      state = {
        ...state,
        file: null,
        loading: false,
        uploadError: action.payload,
        error: true,
      };
      break;
    case RESET_FILE_STORAGE_FLAG:
      state = {
        ...state,
        success: false,
        error: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default FileStorage;
