import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_CATEGORY_LIST_FLAG, CATEGORY_LIST } from "./actionTypes";
import { fetchCategoryListFail, fetchCategoryListSuccess } from "./actions";
import { getCategoryList } from "../../../helpers/fakebackend_helper";

function* fetchCategoryListSaga({payload: {type}}) {
	try {
		const response = yield call(getCategoryList, {type: type});
		if (response) {
			yield put(fetchCategoryListSuccess(response.data));
		} else {
			yield put(fetchCategoryListFail(response));
		}
	} catch (error) {
		yield put(fetchCategoryListFail(error));
	}
}

function* refreshCategoryListSaga({payload: {type}}) {
	try {
		const response = yield call(getCategoryList, {type: type});
		if (response) {
			yield put(fetchCategoryListSuccess(response.data));
		} else {
			yield put(fetchCategoryListFail(response));
		}
	} catch (error) {
		yield put(fetchCategoryListFail(error));
	}
}

function* CategoryListSaga() {
	yield takeEvery(CATEGORY_LIST, fetchCategoryListSaga);
	yield takeEvery(REFRESH_CATEGORY_LIST_FLAG, refreshCategoryListSaga);
}

export default CategoryListSaga;
