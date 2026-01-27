import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { PAGE_BANNER_SHOW_DETAIL } from "./actionTypes";
import { fetchPageBannerDetailFail, fetchPageBannerDetailSuccess } from "./actions";
import { getPageBannerShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchPageBannerDetailSaga({ payload: { pageBannerId } }) {
	try {
		const response = yield call(getPageBannerShowDetail, { id: pageBannerId });
		if (response.status === "success") {
			yield put(fetchPageBannerDetailSuccess(response.model));
		} else {
			yield put(fetchPageBannerDetailFail(response));
		}
	} catch (error) {
		yield put(fetchPageBannerDetailFail(error));
	}
}

function* PageBannerDetailSaga() {
	yield takeEvery(PAGE_BANNER_SHOW_DETAIL, fetchPageBannerDetailSaga);
}

export default PageBannerDetailSaga;
