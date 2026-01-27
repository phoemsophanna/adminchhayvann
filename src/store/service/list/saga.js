import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_SERVICE_LIST_FLAG, SERVICE_LIST } from "./actionTypes";
import { fetchServiceListFail, fetchServiceListSuccess } from "./actions";
import { getServiceList } from "../../../helpers/fakebackend_helper";

function* fetchServiceListSaga() {
	try {
		const response = yield call(getServiceList);
		if (response) {
			yield put(fetchServiceListSuccess(response.data));
		} else {
			yield put(fetchServiceListFail(response));
		}
	} catch (error) {
		yield put(fetchServiceListFail(error));
	}
}

function* refreshServiceListSaga() {
	try {
		const response = yield call(getServiceList);
		if (response) {
			yield put(fetchServiceListSuccess(response.data));
		} else {
			yield put(fetchServiceListFail(response));
		}
	} catch (error) {
		yield put(fetchServiceListFail(error));
	}
}

function* ServiceListSaga() {
	yield takeEvery(SERVICE_LIST, fetchServiceListSaga);
	yield takeEvery(REFRESH_SERVICE_LIST_FLAG, refreshServiceListSaga);
}

export default ServiceListSaga;
