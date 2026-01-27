import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { TEAM_SHOW_DETAIL } from "./actionTypes";
import { fetchTeamDetailFail, fetchTeamDetailSuccess } from "./actions";
import { getTeamShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchTeamDetailSaga({ payload: { teamId } }) {
	try {
		const response = yield call(getTeamShowDetail, { id: teamId });
		if (response.status === "success") {
			yield put(fetchTeamDetailSuccess(response.model));
		} else {
			yield put(fetchTeamDetailFail(response));
		}
	} catch (error) {
		yield put(fetchTeamDetailFail(error));
	}
}

function* TeamDetailSaga() {
	yield takeEvery(TEAM_SHOW_DETAIL, fetchTeamDetailSaga);
}

export default TeamDetailSaga;
