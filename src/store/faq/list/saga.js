import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_FAQ_LIST_FLAG, FAQ_LIST } from "./actionTypes";
import { fetchFaqListFail, fetchFaqListSuccess } from "./actions";
import { getFaqList } from "../../../helpers/fakebackend_helper";

function* fetchFaqListSaga() {
	try {
		const response = yield call(getFaqList);
		if (response) {
			yield put(fetchFaqListSuccess(response.data));
		} else {
			yield put(fetchFaqListFail(response));
		}
	} catch (error) {
		yield put(fetchFaqListFail(error));
	}
}

function* refreshFaqListSaga() {
	try {
		const response = yield call(getFaqList);
		if (response) {
			yield put(fetchFaqListSuccess(response.data));
		} else {
			yield put(fetchFaqListFail(response));
		}
	} catch (error) {
		yield put(fetchFaqListFail(error));
	}
}

function* FaqListSaga() {
	yield takeEvery(FAQ_LIST, fetchFaqListSaga);
	yield takeEvery(REFRESH_FAQ_LIST_FLAG, refreshFaqListSaga);
}

export default FaqListSaga;
