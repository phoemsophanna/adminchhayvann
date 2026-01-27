import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_HISTORY, DELETE_HISTORY } from "./actionTypes";
import { deleteHistory, postCreateHistory } from "../../../helpers/fakebackend_helper";
import { createHistoryFailed, createHistorySuccessful, deleteHistoryFailed, deleteHistorySuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createHistorySaga({ payload: { history, historys } }) {
	try {
		const response = yield call(postCreateHistory, history);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createHistorySuccessful(response.message));
			historys("/history-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createHistoryFailed(response.message));
		}
	} catch (error) {
		yield put(createHistoryFailed(error));
	}
}

function* deleteHistorySaga({ payload: { historyId } }) {
	try {
		const response = yield call(deleteHistory, historyId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteHistorySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteHistoryFailed(response.message));
		}
	} catch (error) {
		yield put(deleteHistoryFailed(error));
	}
}

function* CreateHistoryMainSaga() {
	yield takeEvery(SAVE_HISTORY, createHistorySaga);
	yield takeEvery(DELETE_HISTORY, deleteHistorySaga);
}

export default CreateHistoryMainSaga;
