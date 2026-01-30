import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_PRODUCT_LIST_FLAG, PRODUCT_LIST } from "./actionTypes";
import { fetchProductListFail, fetchProductListSuccess } from "./actions";
import { getProductList } from "../../../helpers/fakebackend_helper";

function* fetchProductListSaga() {
	try {
		const response = yield call(getProductList);
		if (response) {
			yield put(fetchProductListSuccess(response.products));
		} else {
			yield put(fetchProductListFail(response));
		}
	} catch (error) {
		yield put(fetchProductListFail(error));
	}
}

function* refreshProductListSaga() {
	try {
		const response = yield call(getProductList);
		if (response) {
			yield put(fetchProductListSuccess(response.data));
		} else {
			yield put(fetchProductListFail(response));
		}
	} catch (error) {
		yield put(fetchProductListFail(error));
	}
}

function* ProductListSaga() {
	yield takeEvery(PRODUCT_LIST, fetchProductListSaga);
	yield takeEvery(REFRESH_PRODUCT_LIST_FLAG, refreshProductListSaga);
}

export default ProductListSaga;
