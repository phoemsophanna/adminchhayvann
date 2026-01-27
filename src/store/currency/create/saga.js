import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_CURRENCY, DELETE_CURRENCY } from "./actionTypes";
import { deleteCurrency, postCreateCurrency } from "../../../helpers/fakebackend_helper";
import { createCurrencyFailed, createCurrencySuccessful, deleteCurrencyFailed, deleteCurrencySuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createCurrencySaga({ payload: { currency, history } }) {
	try {
		const response = yield call(postCreateCurrency, currency);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createCurrencySuccessful(response.message));
			history("/currency-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createCurrencyFailed(response.message));
		}
	} catch (error) {
		yield put(createCurrencyFailed(error));
	}
}

function* deleteCurrencySaga({ payload: { currencyId } }) {
	try {
		const response = yield call(deleteCurrency, currencyId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteCurrencySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteCurrencyFailed(response.message));
		}
	} catch (error) {
		yield put(deleteCurrencyFailed(error));
	}
}

function* CreateCurrencyMainSaga() {
	yield takeEvery(SAVE_CURRENCY, createCurrencySaga);
	yield takeEvery(DELETE_CURRENCY, deleteCurrencySaga);
}

export default CreateCurrencyMainSaga;
