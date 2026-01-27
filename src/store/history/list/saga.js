import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_HISTORY_LIST_FLAG, HISTORY_LIST } from "./actionTypes";
import { fetchHistoryListFail, fetchHistoryListSuccess } from "./actions";
import { getHistoryList } from "../../../helpers/fakebackend_helper";

function* fetchHistoryListSaga() {
	try {
		const response = yield call(getHistoryList);
		if (response) {
			yield put(fetchHistoryListSuccess(response.data));
		} else {
			yield put(fetchHistoryListFail(response));
		}
	} catch (error) {
		yield put(fetchHistoryListFail(error));
	}
}

function* refreshHistoryListSaga() {
	try {
		const response = yield call(getHistoryList);
		if (response) {
			yield put(fetchHistoryListSuccess(response.data));
		} else {
			yield put(fetchHistoryListFail(response));
		}
	} catch (error) {
		yield put(fetchHistoryListFail(error));
	}
}

function* HistoryListSaga() {
	yield takeEvery(HISTORY_LIST, fetchHistoryListSaga);
	yield takeEvery(REFRESH_HISTORY_LIST_FLAG, refreshHistoryListSaga);
}

export default HistoryListSaga;
