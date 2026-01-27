import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { AWARD_SHOW_DETAIL } from "./actionTypes";
import { fetchAwardDetailFail, fetchAwardDetailSuccess } from "./actions";
import { getAwardShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchAwardDetailSaga({ payload: { awardId } }) {
	try {
		const response = yield call(getAwardShowDetail, { id: awardId });
		if (response.status === "success") {
			yield put(fetchAwardDetailSuccess(response.model));
		} else {
			yield put(fetchAwardDetailFail(response));
		}
	} catch (error) {
		yield put(fetchAwardDetailFail(error));
	}
}

function* AwardDetailSaga() {
	yield takeEvery(AWARD_SHOW_DETAIL, fetchAwardDetailSaga);
}

export default AwardDetailSaga;
