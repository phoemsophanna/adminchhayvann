import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_PROJECT_CATEGORY, DELETE_PROJECT_CATEGORY } from "./actionTypes";
import { deleteProjectCategory, postCreateProjectCategory } from "../../../helpers/fakebackend_helper";
import {
	createProjectCategoryFailed,
	createProjectCategorySuccessful,
	deleteProjectCategoryFailed,
	deleteProjectCategorySuccessful,
} from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createProjectCategorySaga({ payload: { projectCategory } }) {
	try {
		const response = yield call(postCreateProjectCategory, projectCategory);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createProjectCategorySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createProjectCategoryFailed(response.message));
		}
	} catch (error) {
		yield put(createProjectCategoryFailed(error));
	}
}

function* deleteProjectCategorySaga({ payload: { projectCategoryId } }) {
	try {
		const response = yield call(deleteProjectCategory, projectCategoryId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteProjectCategorySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteProjectCategoryFailed(response.message));
		}
	} catch (error) {
		yield put(deleteProjectCategoryFailed(error));
	}
}

function* CreateProjectCategoryMainSaga() {
	yield takeEvery(SAVE_PROJECT_CATEGORY, createProjectCategorySaga);
	yield takeEvery(DELETE_PROJECT_CATEGORY, deleteProjectCategorySaga);
}

export default CreateProjectCategoryMainSaga;
