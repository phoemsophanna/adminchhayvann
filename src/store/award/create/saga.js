import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_AWARD, DELETE_AWARD } from "./actionTypes";
import { deleteAward, postCreateAward } from "../../../helpers/fakebackend_helper";
import { createAwardFailed, createAwardSuccessful, deleteAwardFailed, deleteAwardSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createAwardSaga({ payload: { award, history } }) {
	try {
		const response = yield call(postCreateAward, award);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createAwardSuccessful(response.message));
			history("/award-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createAwardFailed(response.message));
		}
	} catch (error) {
		yield put(createAwardFailed(error));
	}
}

function* deleteAwardSaga({ payload: { awardId } }) {
	try {
		const response = yield call(deleteAward, awardId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteAwardSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteAwardFailed(response.message));
		}
	} catch (error) {
		yield put(deleteAwardFailed(error));
	}
}

function* CreateAwardMainSaga() {
	yield takeEvery(SAVE_AWARD, createAwardSaga);
	yield takeEvery(DELETE_AWARD, deleteAwardSaga);
}

export default CreateAwardMainSaga;
