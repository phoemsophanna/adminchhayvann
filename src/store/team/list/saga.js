import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_TEAM_LIST_FLAG, TEAM_LIST } from "./actionTypes";
import { fetchTeamListFail, fetchTeamListSuccess } from "./actions";
import { getTeamList } from "../../../helpers/fakebackend_helper";

function* fetchTeamListSaga() {
	try {
		const response = yield call(getTeamList);
		if (response) {
			yield put(fetchTeamListSuccess(response.data));
		} else {
			yield put(fetchTeamListFail(response));
		}
	} catch (error) {
		yield put(fetchTeamListFail(error));
	}
}

function* refreshTeamListSaga() {
	try {
		const response = yield call(getTeamList);
		if (response) {
			yield put(fetchTeamListSuccess(response.data));
		} else {
			yield put(fetchTeamListFail(response));
		}
	} catch (error) {
		yield put(fetchTeamListFail(error));
	}
}

function* TeamListSaga() {
	yield takeEvery(TEAM_LIST, fetchTeamListSaga);
	yield takeEvery(REFRESH_TEAM_LIST_FLAG, refreshTeamListSaga);
}

export default TeamListSaga;
