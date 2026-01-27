import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { FAQ_SHOW_DETAIL } from "./actionTypes";
import { fetchFaqDetailFail, fetchFaqDetailSuccess } from "./actions";
import { getFaqShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchFaqDetailSaga({ payload: { faqId } }) {
	try {
		const response = yield call(getFaqShowDetail, { id: faqId });
		if (response.status === "success") {
			yield put(fetchFaqDetailSuccess(response.model));
		} else {
			yield put(fetchFaqDetailFail(response));
		}
	} catch (error) {
		yield put(fetchFaqDetailFail(error));
	}
}

function* FaqDetailSaga() {
	yield takeEvery(FAQ_SHOW_DETAIL, fetchFaqDetailSaga);
}

export default FaqDetailSaga;
