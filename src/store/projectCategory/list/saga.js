import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_PROJECT_CATEGORY_LIST_FLAG, PROJECT_CATEGORY_LIST } from "./actionTypes";
import { fetchProjectCategoryListFail, fetchProjectCategoryListSuccess } from "./actions";
import { getProjectCategoryList } from "../../../helpers/fakebackend_helper";

function* fetchProjectCategoryListSaga() {
	try {
		const response = yield call(getProjectCategoryList);
		if (response) {
			yield put(fetchProjectCategoryListSuccess(response.data));
		} else {
			yield put(fetchProjectCategoryListFail(response));
		}
	} catch (error) {
		yield put(fetchProjectCategoryListFail(error));
	}
}

function* refreshProjectCategoryListSaga() {
	try {
		const response = yield call(getProjectCategoryList);
		if (response) {
			yield put(fetchProjectCategoryListSuccess(response.data));
		} else {
			yield put(fetchProjectCategoryListFail(response));
		}
	} catch (error) {
		yield put(fetchProjectCategoryListFail(error));
	}
}

function* ProjectCategoryListSaga() {
	yield takeEvery(PROJECT_CATEGORY_LIST, fetchProjectCategoryListSaga);
	yield takeEvery(REFRESH_PROJECT_CATEGORY_LIST_FLAG, refreshProjectCategoryListSaga);
}

export default ProjectCategoryListSaga;
