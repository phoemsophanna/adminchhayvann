import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { APPLICATION_SHOW_DETAIL } from "./actionTypes";
import { fetchApplicationDetailFail, fetchApplicationDetailSuccess } from "./actions";
import { getApplicationShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchApplicationDetailSaga({ payload: { applicationId } }) {
	try {
		const response = yield call(getApplicationShowDetail, { id: applicationId });
		if (response.status === "success") {
			yield put(fetchApplicationDetailSuccess(response.application));
		} else {
			yield put(fetchApplicationDetailFail(response));
		}
	} catch (error) {
		yield put(fetchApplicationDetailFail(error));
	}
}

function* ApplicationDetailSaga() {
	yield takeEvery(APPLICATION_SHOW_DETAIL, fetchApplicationDetailSaga);
}

export default ApplicationDetailSaga;
