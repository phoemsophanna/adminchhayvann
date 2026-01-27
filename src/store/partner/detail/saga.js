import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { PARTNER_SHOW_DETAIL } from "./actionTypes";
import { fetchPartnerDetailFail, fetchPartnerDetailSuccess } from "./actions";
import { getPartnerShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchPartnerDetailSaga({ payload: { partnerId } }) {
	try {
		const response = yield call(getPartnerShowDetail, { id: partnerId });
		if (response.status === "success") {
			yield put(fetchPartnerDetailSuccess(response.model));
		} else {
			yield put(fetchPartnerDetailFail(response));
		}
	} catch (error) {
		yield put(fetchPartnerDetailFail(error));
	}
}

function* PartnerDetailSaga() {
	yield takeEvery(PARTNER_SHOW_DETAIL, fetchPartnerDetailSaga);
}

export default PartnerDetailSaga;
