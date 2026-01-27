import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CREATE_CATEGORY, DELETE_CATEGORY } from "./actionTypes";
import { deleteCategory, postCreateCategory } from "../../../helpers/fakebackend_helper";
import { createCategoryFailed, createCategorySuccessful, deleteCategoryFailed, deleteCategorySuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createCategorySaga({ payload: { category } }) {
	try {
		const response = yield call(postCreateCategory, category);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createCategorySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createCategoryFailed(response.message));
		}
	} catch (error) {
		yield put(createCategoryFailed(error));
	}
}

function* deleteCategorySaga({ payload: { categoryId } }) {
	try {
		const response = yield call(deleteCategory, categoryId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteCategorySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteCategoryFailed(response.message));
		}
	} catch (error) {
		yield put(deleteCategoryFailed(error));
	}
}

function* CreateCategoryMainSaga() {
	yield takeEvery(CREATE_CATEGORY, createCategorySaga);
	yield takeEvery(DELETE_CATEGORY, deleteCategorySaga);
}

export default CreateCategoryMainSaga;
