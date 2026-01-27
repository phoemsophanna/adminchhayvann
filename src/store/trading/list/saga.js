import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_TRADING_LIST_FLAG, TRADING_LIST } from "./actionTypes";
import { fetchTradingListFail, fetchTradingListSuccess } from "./actions";
import { getTradingList } from "../../../helpers/fakebackend_helper";

function* fetchTradingListSaga() {
	try {
		const response = yield call(getTradingList);
		if (response) {
			yield put(fetchTradingListSuccess(response.data));
		} else {
			yield put(fetchTradingListFail(response));
		}
	} catch (error) {
		yield put(fetchTradingListFail(error));
	}
}

function* refreshTradingListSaga() {
	try {
		const response = yield call(getTradingList);
		if (response) {
			yield put(fetchTradingListSuccess(response.data));
		} else {
			yield put(fetchTradingListFail(response));
		}
	} catch (error) {
		yield put(fetchTradingListFail(error));
	}
}

function* TradingListSaga() {
	yield takeEvery(TRADING_LIST, fetchTradingListSaga);
	yield takeEvery(REFRESH_TRADING_LIST_FLAG, refreshTradingListSaga);
}

export default TradingListSaga;
