import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { PRODUCT_SHOW_DETAIL } from "./actionTypes";
import { fetchProductDetailFail, fetchProductDetailSuccess } from "./actions";
import { getProductShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchProductDetailSaga({ payload: { productId } }) {
	try {
		const response = yield call(getProductShowDetail, { id: productId });
		if (response.status === "success") {
			yield put(fetchProductDetailSuccess(response.model));
		} else {
			yield put(fetchProductDetailFail(response));
		}
	} catch (error) {
		yield put(fetchProductDetailFail(error));
	}
}

function* ProductDetailSaga() {
	yield takeEvery(PRODUCT_SHOW_DETAIL, fetchProductDetailSaga);
}

export default ProductDetailSaga;
