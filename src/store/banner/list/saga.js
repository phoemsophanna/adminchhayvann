import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_BANNER_LIST_FLAG, BANNER_LIST } from "./actionTypes";
import { fetchBannerListFail, fetchBannerListSuccess } from "./actions";
import { getBannerList } from "../../../helpers/fakebackend_helper";

function* fetchBannerListSaga() {
	try {
		const response = yield call(getBannerList);
		if (response) {
			yield put(fetchBannerListSuccess(response.data));
		} else {
			yield put(fetchBannerListFail(response));
		}
	} catch (error) {
		yield put(fetchBannerListFail(error));
	}
}

function* refreshBannerListSaga() {
	try {
		const response = yield call(getBannerList);
		if (response) {
			yield put(fetchBannerListSuccess(response.data));
		} else {
			yield put(fetchBannerListFail(response));
		}
	} catch (error) {
		yield put(fetchBannerListFail(error));
	}
}

function* BannerListSaga() {
	yield takeEvery(BANNER_LIST, fetchBannerListSaga);
	yield takeEvery(REFRESH_BANNER_LIST_FLAG, refreshBannerListSaga);
}

export default BannerListSaga;
