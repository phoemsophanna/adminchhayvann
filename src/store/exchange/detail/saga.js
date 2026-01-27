import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { EXCHANGE_SHOW_DETAIL } from "./actionTypes";
import { fetchExchangeDetailFail, fetchExchangeDetailSuccess } from "./actions";
import { getExchangeShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchExchangeDetailSaga({ payload: { exchangeId } }) {
	try {
		const response = yield call(getExchangeShowDetail, { id: exchangeId });
		if (response.status === "success") {
			yield put(fetchExchangeDetailSuccess(response.model));
		} else {
			yield put(fetchExchangeDetailFail(response));
		}
	} catch (error) {
		yield put(fetchExchangeDetailFail(error));
	}
}

function* ExchangeDetailSaga() {
	yield takeEvery(EXCHANGE_SHOW_DETAIL, fetchExchangeDetailSaga);
}

export default ExchangeDetailSaga;
