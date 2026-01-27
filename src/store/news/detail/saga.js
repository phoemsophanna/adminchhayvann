import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { NEWS_SHOW_DETAIL } from "./actionTypes";
import { fetchNewsDetailFail, fetchNewsDetailSuccess } from "./actions";
import { getNewsShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchNewsDetailSaga({ payload: { newsId } }) {
	try {
		const response = yield call(getNewsShowDetail, { id: newsId });
		if (response.status === "success") {
			yield put(fetchNewsDetailSuccess(response.model));
		} else {
			yield put(fetchNewsDetailFail(response));
		}
	} catch (error) {
		yield put(fetchNewsDetailFail(error));
	}
}

function* NewsDetailSaga() {
	yield takeEvery(NEWS_SHOW_DETAIL, fetchNewsDetailSaga);
}

export default NewsDetailSaga;
