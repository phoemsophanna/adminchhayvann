import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_NEWS_LIST_FLAG, NEWS_LIST } from "./actionTypes";
import { fetchNewsListFail, fetchNewsListSuccess } from "./actions";
import { getNewsList } from "../../../helpers/fakebackend_helper";

function* fetchNewsListSaga() {
	try {
		const response = yield call(getNewsList);
		if (response) {
			yield put(fetchNewsListSuccess(response.data));
		} else {
			yield put(fetchNewsListFail(response));
		}
	} catch (error) {
		yield put(fetchNewsListFail(error));
	}
}

function* refreshNewsListSaga() {
	try {
		const response = yield call(getNewsList);
		if (response) {
			yield put(fetchNewsListSuccess(response.data));
		} else {
			yield put(fetchNewsListFail(response));
		}
	} catch (error) {
		yield put(fetchNewsListFail(error));
	}
}

function* NewsListSaga() {
	yield takeEvery(NEWS_LIST, fetchNewsListSaga);
	yield takeEvery(REFRESH_NEWS_LIST_FLAG, refreshNewsListSaga);
}

export default NewsListSaga;
