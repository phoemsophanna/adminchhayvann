import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CORPORATE_SHOW_DETAIL } from "./actionTypes";
import { fetchCorporateDetailFail, fetchCorporateDetailSuccess } from "./actions";
import { getCorporateShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchCorporateDetailSaga({ payload: { corporateId } }) {
	try {
		const response = yield call(getCorporateShowDetail, { id: corporateId });
		if (response.status === "success") {
			yield put(fetchCorporateDetailSuccess(response.model));
		} else {
			yield put(fetchCorporateDetailFail(response));
		}
	} catch (error) {
		yield put(fetchCorporateDetailFail(error));
	}
}

function* CorporateDetailSaga() {
	yield takeEvery(CORPORATE_SHOW_DETAIL, fetchCorporateDetailSaga);
}

export default CorporateDetailSaga;
