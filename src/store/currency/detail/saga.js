import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CURRENCY_SHOW_DETAIL } from "./actionTypes";
import { fetchCurrencyDetailFail, fetchCurrencyDetailSuccess } from "./actions";
import { getCurrencyShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchCurrencyDetailSaga({ payload: { currencyId } }) {
	try {
		const response = yield call(getCurrencyShowDetail, { id: currencyId });
		if (response.status === "success") {
			yield put(fetchCurrencyDetailSuccess(response.model));
		} else {
			yield put(fetchCurrencyDetailFail(response));
		}
	} catch (error) {
		yield put(fetchCurrencyDetailFail(error));
	}
}

function* CurrencyDetailSaga() {
	yield takeEvery(CURRENCY_SHOW_DETAIL, fetchCurrencyDetailSaga);
}

export default CurrencyDetailSaga;
