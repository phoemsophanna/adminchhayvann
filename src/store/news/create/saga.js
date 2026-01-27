import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_NEWS, DELETE_NEWS } from "./actionTypes";
import { deleteNews, postCreateNews } from "../../../helpers/fakebackend_helper";
import { createNewsFailed, createNewsSuccessful, deleteNewsFailed, deleteNewsSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createNewsSaga({ payload: { news, history } }) {
	try {
		const response = yield call(postCreateNews, news);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createNewsSuccessful(response.message));
			history("/news-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createNewsFailed(response.message));
		}
	} catch (error) {
		yield put(createNewsFailed(error));
	}
}

function* deleteNewsSaga({ payload: { newsId } }) {
	try {
		const response = yield call(deleteNews, newsId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteNewsSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteNewsFailed(response.message));
		}
	} catch (error) {
		yield put(deleteNewsFailed(error));
	}
}

function* CreateNewsMainSaga() {
	yield takeEvery(SAVE_NEWS, createNewsSaga);
	yield takeEvery(DELETE_NEWS, deleteNewsSaga);
}

export default CreateNewsMainSaga;
