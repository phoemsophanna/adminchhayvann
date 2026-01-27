import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CATEGORY_SHOW_DETAIL } from "./actionTypes";
import { fetchCategoryDetailFail, fetchCategoryDetailSuccess } from "./actions";
import { getCategoryShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchCategoryDetailSaga({ payload: { categoryId } }) {
	try {
		const response = yield call(getCategoryShowDetail, { id: categoryId });
		if (response.status === "success") {
			yield put(fetchCategoryDetailSuccess(response.model));
		} else {
			yield put(fetchCategoryDetailFail(response));
		}
	} catch (error) {
		yield put(fetchCategoryDetailFail(error));
	}
}

function* CategoryDetailSaga() {
	yield takeEvery(CATEGORY_SHOW_DETAIL, fetchCategoryDetailSaga);
}

export default CategoryDetailSaga;
