import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { PROJECT_CATEGORY_SHOW_DETAIL } from "./actionTypes";
import { fetchProjectCategoryDetailFail, fetchProjectCategoryDetailSuccess } from "./actions";
import { getProjectCategoryShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchProjectCategoryDetailSaga({ payload: { projectCategoryId } }) {
	try {
		const response = yield call(getProjectCategoryShowDetail, { id: projectCategoryId });
		if (response.status === "success") {
			yield put(fetchProjectCategoryDetailSuccess(response.model));
		} else {
			yield put(fetchProjectCategoryDetailFail(response));
		}
	} catch (error) {
		yield put(fetchProjectCategoryDetailFail(error));
	}
}

function* ProjectCategoryDetailSaga() {
	yield takeEvery(PROJECT_CATEGORY_SHOW_DETAIL, fetchProjectCategoryDetailSaga);
}

export default ProjectCategoryDetailSaga;
