import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_CURRENCY_LIST_FLAG, CURRENCY_LIST } from "./actionTypes";
import { fetchCurrencyListFail, fetchCurrencyListSuccess } from "./actions";
import { getCurrencyList } from "../../../helpers/fakebackend_helper";

function* fetchCurrencyListSaga() {
	try {
		const response = yield call(getCurrencyList);
		if (response) {
			yield put(fetchCurrencyListSuccess(response.data));
		} else {
			yield put(fetchCurrencyListFail(response));
		}
	} catch (error) {
		yield put(fetchCurrencyListFail(error));
	}
}

function* refreshCurrencyListSaga() {
	try {
		const response = yield call(getCurrencyList);
		if (response) {
			yield put(fetchCurrencyListSuccess(response.data));
		} else {
			yield put(fetchCurrencyListFail(response));
		}
	} catch (error) {
		yield put(fetchCurrencyListFail(error));
	}
}

function* CurrencyListSaga() {
	yield takeEvery(CURRENCY_LIST, fetchCurrencyListSaga);
	yield takeEvery(REFRESH_CURRENCY_LIST_FLAG, refreshCurrencyListSaga);
}

export default CurrencyListSaga;
