import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CREATE_USER, DELETE_USER } from "./actionTypes";
import { deleteUser, postCreateUser } from "../../../helpers/fakebackend_helper";
import { createUserFailed, createUserSuccessful, deleteUserFailed, deleteUserSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createUserSaga({ payload: { user } }) {
	try {
		const response = yield call(postCreateUser, user);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createUserSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createUserFailed(response.message));
		}
	} catch (error) {
		yield put(createUserFailed(error));
	}
}

function* deleteUserSaga({ payload: { userId } }) {
	try {
		const response = yield call(deleteUser, userId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteUserSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteUserFailed(response.message));
		}
	} catch (error) {
		yield put(deleteUserFailed(error));
	}
}

function* CreateUserMainSaga() {
	yield takeEvery(CREATE_USER, createUserSaga);
	yield takeEvery(DELETE_USER, deleteUserSaga);
}

export default CreateUserMainSaga;
