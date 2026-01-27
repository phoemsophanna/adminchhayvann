import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_AWARD_LIST_FLAG, AWARD_LIST } from "./actionTypes";
import { fetchAwardListFail, fetchAwardListSuccess } from "./actions";
import { getAwardList } from "../../../helpers/fakebackend_helper";

function* fetchAwardListSaga() {
	try {
		const response = yield call(getAwardList);
		if (response) {
			yield put(fetchAwardListSuccess(response.data));
		} else {
			yield put(fetchAwardListFail(response));
		}
	} catch (error) {
		yield put(fetchAwardListFail(error));
	}
}

function* refreshAwardListSaga() {
	try {
		const response = yield call(getAwardList);
		if (response) {
			yield put(fetchAwardListSuccess(response.data));
		} else {
			yield put(fetchAwardListFail(response));
		}
	} catch (error) {
		yield put(fetchAwardListFail(error));
	}
}

function* AwardListSaga() {
	yield takeEvery(AWARD_LIST, fetchAwardListSaga);
	yield takeEvery(REFRESH_AWARD_LIST_FLAG, refreshAwardListSaga);
}

export default AwardListSaga;
