import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { HISTORY_SHOW_DETAIL } from "./actionTypes";
import { fetchHistoryDetailFail, fetchHistoryDetailSuccess } from "./actions";
import { getHistoryShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchHistoryDetailSaga({ payload: { historyId } }) {
	try {
		const response = yield call(getHistoryShowDetail, { id: historyId });
		if (response.status === "success") {
			yield put(fetchHistoryDetailSuccess(response.model));
		} else {
			yield put(fetchHistoryDetailFail(response));
		}
	} catch (error) {
		yield put(fetchHistoryDetailFail(error));
	}
}

function* HistoryDetailSaga() {
	yield takeEvery(HISTORY_SHOW_DETAIL, fetchHistoryDetailSaga);
}

export default HistoryDetailSaga;
