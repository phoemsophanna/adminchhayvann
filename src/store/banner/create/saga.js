import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_BANNER, DELETE_BANNER } from "./actionTypes";
import { deleteBanner, postCreateBanner } from "../../../helpers/fakebackend_helper";
import { createBannerFailed, createBannerSuccessful, deleteBannerFailed, deleteBannerSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createBannerSaga({ payload: { banner, history } }) {
	try {
		const response = yield call(postCreateBanner, banner);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createBannerSuccessful(response.message));
			history("/banner-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createBannerFailed(response.message));
		}
	} catch (error) {
		yield put(createBannerFailed(error));
	}
}

function* deleteBannerSaga({ payload: { bannerId } }) {
	try {
		const response = yield call(deleteBanner, bannerId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteBannerSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteBannerFailed(response.message));
		}
	} catch (error) {
		yield put(deleteBannerFailed(error));
	}
}

function* CreateBannerMainSaga() {
	yield takeEvery(SAVE_BANNER, createBannerSaga);
	yield takeEvery(DELETE_BANNER, deleteBannerSaga);
}

export default CreateBannerMainSaga;
