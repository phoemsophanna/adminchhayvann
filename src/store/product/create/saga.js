import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_PRODUCT, DELETE_PRODUCT } from "./actionTypes";
import { deleteProduct, postCreateProduct } from "../../../helpers/fakebackend_helper";
import { createProductFailed, createProductSuccessful, deleteProductFailed, deleteProductSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createProductSaga({ payload: { product, history } }) {
	try {
		const response = yield call(postCreateProduct, product);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createProductSuccessful(response.message));
			history("/product-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createProductFailed(response.message));
		}
	} catch (error) {
		yield put(createProductFailed(error));
	}
}

function* deleteProductSaga({ payload: { productId } }) {
	try {
		const response = yield call(deleteProduct, productId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteProductSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteProductFailed(response.message));
		}
	} catch (error) {
		yield put(deleteProductFailed(error));
	}
}

function* CreateProductMainSaga() {
	yield takeEvery(SAVE_PRODUCT, createProductSaga);
	yield takeEvery(DELETE_PRODUCT, deleteProductSaga);
}

export default CreateProductMainSaga;
