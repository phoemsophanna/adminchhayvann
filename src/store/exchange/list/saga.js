import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_EXCHANGE_LIST_FLAG, EXCHANGE_LIST } from "./actionTypes";
import { fetchExchangeListFail, fetchExchangeListSuccess } from "./actions";
import { getExchangeList } from "../../../helpers/fakebackend_helper";

function* fetchExchangeListSaga() {
	try {
		const response = yield call(getExchangeList);
		if (response) {
			yield put(fetchExchangeListSuccess(response.data));
		} else {
			yield put(fetchExchangeListFail(response));
		}
	} catch (error) {
		yield put(fetchExchangeListFail(error));
	}
}

function* refreshExchangeListSaga() {
	try {
		const response = yield call(getExchangeList);
		if (response) {
			yield put(fetchExchangeListSuccess(response.data));
		} else {
			yield put(fetchExchangeListFail(response));
		}
	} catch (error) {
		yield put(fetchExchangeListFail(error));
	}
}

function* ExchangeListSaga() {
	yield takeEvery(EXCHANGE_LIST, fetchExchangeListSaga);
	yield takeEvery(REFRESH_EXCHANGE_LIST_FLAG, refreshExchangeListSaga);
}

export default ExchangeListSaga;
