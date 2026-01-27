import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { FILE_STORAGE } from "./actionTypes";
import { fileStorageFailed, fileStorageSuccessful } from "./actions";

import { postFileStorage } from "../../helpers/fakebackend_helper";

// Is user register successfull then direct plot user in redux.
function* fileStorage({ payload: { body } }) {
  try {
    const response = yield call(postFileStorage, body);
    console.log(response, "Hello");
    // if (response.message === "success") {
    //   yield put(fileStorageSuccessful(response));
    // } else {
    //   yield put(fileStorageFailed(response));
    // }
  } catch (error) {
    yield put(fileStorageFailed(error));
  }
}

export function* watchFileStorage() {
  yield takeEvery(FILE_STORAGE, fileStorage);
}

function* FileStorageSaga() {
  yield all([fork(watchFileStorage)]);
}

export default FileStorageSaga;
