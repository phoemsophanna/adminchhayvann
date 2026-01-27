import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_PAGE_BANNER_LIST_FLAG, PAGE_BANNER_LIST } from "./actionTypes";
import { fetchPageBannerListFail, fetchPageBannerListSuccess } from "./actions";
import { getPageBannerList } from "../../../helpers/fakebackend_helper";

function* fetchPageBannerListSaga() {
	try {
		const response = yield call(getPageBannerList);
		if (response) {
			yield put(fetchPageBannerListSuccess(response.data));
		} else {
			yield put(fetchPageBannerListFail(response));
		}
	} catch (error) {
		yield put(fetchPageBannerListFail(error));
	}
}

function* refreshPageBannerListSaga() {
	try {
		const response = yield call(getPageBannerList);
		if (response) {
			yield put(fetchPageBannerListSuccess(response.data));
		} else {
			yield put(fetchPageBannerListFail(response));
		}
	} catch (error) {
		yield put(fetchPageBannerListFail(error));
	}
}

function* pageBannerListSaga() {
	yield takeEvery(PAGE_BANNER_LIST, fetchPageBannerListSaga);
	yield takeEvery(REFRESH_PAGE_BANNER_LIST_FLAG, refreshPageBannerListSaga);
}

export default pageBannerListSaga;
