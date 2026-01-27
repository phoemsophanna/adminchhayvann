import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { BANNER_SHOW_DETAIL } from "./actionTypes";
import { fetchBannerDetailFail, fetchBannerDetailSuccess } from "./actions";
import { getBannerShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchBannerDetailSaga({ payload: { bannerId } }) {
	try {
		const response = yield call(getBannerShowDetail, { id: bannerId });
		if (response.status === "success") {
			yield put(fetchBannerDetailSuccess(response.model));
		} else {
			yield put(fetchBannerDetailFail(response));
		}
	} catch (error) {
		yield put(fetchBannerDetailFail(error));
	}
}

function* BannerDetailSaga() {
	yield takeEvery(BANNER_SHOW_DETAIL, fetchBannerDetailSaga);
}

export default BannerDetailSaga;
