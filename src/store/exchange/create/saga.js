import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_EXCHANGE, DELETE_EXCHANGE } from "./actionTypes";
import { deleteExchange, postCreateExchange } from "../../../helpers/fakebackend_helper";
import { createExchangeFailed, createExchangeSuccessful, deleteExchangeFailed, deleteExchangeSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createExchangeSaga({ payload: { exchange, history } }) {
	try {
		const response = yield call(postCreateExchange, exchange);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createExchangeSuccessful(response.message));
			history("/exchange-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createExchangeFailed(response.message));
		}
	} catch (error) {
		yield put(createExchangeFailed(error));
	}
}

function* deleteExchangeSaga({ payload: { exchangeId } }) {
	try {
		const response = yield call(deleteExchange, exchangeId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteExchangeSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteExchangeFailed(response.message));
		}
	} catch (error) {
		yield put(deleteExchangeFailed(error));
	}
}

function* CreateExchangeMainSaga() {
	yield takeEvery(SAVE_EXCHANGE, createExchangeSaga);
	yield takeEvery(DELETE_EXCHANGE, deleteExchangeSaga);
}

export default CreateExchangeMainSaga;
