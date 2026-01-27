import {
  FILE_STORAGE,
  FILE_STORAGE_FAILED,
  FILE_STORAGE_SUCCESSFUL,
  RESET_FILE_STORAGE_FLAG,
} from "./actionTypes";

export const fileStorage = (file) => {
  return {
    type: FILE_STORAGE,
    payload: { file },
  };
};

export const fileStorageSuccessful = (msg) => {
  return {
    type: FILE_STORAGE_SUCCESSFUL,
    payload: msg,
  };
};

export const fileStorageFailed = (error) => {
  return {
    type: FILE_STORAGE_FAILED,
    payload: error,
  };
};

export const resetFileStorageFlag = () => {
  return {
    type: RESET_FILE_STORAGE_FLAG,
  };
};
