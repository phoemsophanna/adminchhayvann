import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CREATE_PAGE_BANNER, DELETE_PAGE_BANNER } from "./actionTypes";
import { deletePageBanner, postCreatePageBanner } from "../../../helpers/fakebackend_helper";
import { createPageBannerFailed, createPageBannerSuccessful, deletePageBannerFailed, deletePageBannerSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createPageBannerSaga({ payload: { pageBanner } }) {
	try {
		const response = yield call(postCreatePageBanner, pageBanner);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createPageBannerSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createPageBannerFailed(response.message));
		}
	} catch (error) {
		yield put(createPageBannerFailed(error));
	}
}

function* deletePageBannerSaga({ payload: { pageBannerId } }) {
	try {
		const response = yield call(deletePageBanner, pageBannerId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deletePageBannerSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deletePageBannerFailed(response.message));
		}
	} catch (error) {
		yield put(deletePageBannerFailed(error));
	}
}

function* CreatePageBannerMainSaga() {
	yield takeEvery(CREATE_PAGE_BANNER, createPageBannerSaga);
	yield takeEvery(DELETE_PAGE_BANNER, deletePageBannerSaga);
}

export default CreatePageBannerMainSaga;
