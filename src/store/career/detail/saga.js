import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CAREER_SHOW_DETAIL } from "./actionTypes";
import { fetchCareerDetailFail, fetchCareerDetailSuccess } from "./actions";
import { getCareerShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchCareerDetailSaga({ payload: { careerId } }) {
	try {
		const response = yield call(getCareerShowDetail, { id: careerId });
		if (response.status === "success") {
			yield put(fetchCareerDetailSuccess(response.model));
		} else {
			yield put(fetchCareerDetailFail(response));
		}
	} catch (error) {
		yield put(fetchCareerDetailFail(error));
	}
}

function* CareerDetailSaga() {
	yield takeEvery(CAREER_SHOW_DETAIL, fetchCareerDetailSaga);
}

export default CareerDetailSaga;
