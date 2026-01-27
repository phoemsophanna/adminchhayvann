import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_CAREER_LIST_FLAG, CAREER_LIST } from "./actionTypes";
import { fetchCareerListFail, fetchCareerListSuccess } from "./actions";
import { getCareerList } from "../../../helpers/fakebackend_helper";

function* fetchCareerListSaga() {
	try {
		const response = yield call(getCareerList);
		if (response) {
			yield put(fetchCareerListSuccess(response.data));
		} else {
			yield put(fetchCareerListFail(response));
		}
	} catch (error) {
		yield put(fetchCareerListFail(error));
	}
}

function* refreshCareerListSaga() {
	try {
		const response = yield call(getCareerList);
		if (response) {
			yield put(fetchCareerListSuccess(response.data));
		} else {
			yield put(fetchCareerListFail(response));
		}
	} catch (error) {
		yield put(fetchCareerListFail(error));
	}
}

function* CareerListSaga() {
	yield takeEvery(CAREER_LIST, fetchCareerListSaga);
	yield takeEvery(REFRESH_CAREER_LIST_FLAG, refreshCareerListSaga);
}

export default CareerListSaga;
