import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_TRADING, DELETE_TRADING } from "./actionTypes";
import { deleteTrading, postCreateTrading } from "../../../helpers/fakebackend_helper";
import { createTradingFailed, createTradingSuccessful, deleteTradingFailed, deleteTradingSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createTradingSaga({ payload: { trading } }) {
	try {
		const response = yield call(postCreateTrading, trading);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createTradingSuccessful(response.message));
			// history("/trading-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createTradingFailed(response.message));
		}
	} catch (error) {
		yield put(createTradingFailed(error));
	}
}

function* deleteTradingSaga({ payload: { tradingId } }) {
	try {
		const response = yield call(deleteTrading, tradingId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteTradingSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteTradingFailed(response.message));
		}
	} catch (error) {
		yield put(deleteTradingFailed(error));
	}
}

function* CreateTradingMainSaga() {
	yield takeEvery(SAVE_TRADING, createTradingSaga);
	yield takeEvery(DELETE_TRADING, deleteTradingSaga);
}

export default CreateTradingMainSaga;
