import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { TRADING_SHOW_DETAIL } from "./actionTypes";
import { fetchTradingDetailFail, fetchTradingDetailSuccess } from "./actions";
import { getTradingShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchTradingDetailSaga({ payload: { tradingId } }) {
	try {
		const response = yield call(getTradingShowDetail, { id: tradingId });
		if (response.status === "success") {
			yield put(fetchTradingDetailSuccess(response.model));
		} else {
			yield put(fetchTradingDetailFail(response));
		}
	} catch (error) {
		yield put(fetchTradingDetailFail(error));
	}
}

function* TradingDetailSaga() {
	yield takeEvery(TRADING_SHOW_DETAIL, fetchTradingDetailSaga);
}

export default TradingDetailSaga;
