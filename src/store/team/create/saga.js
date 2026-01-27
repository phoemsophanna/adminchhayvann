import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_TEAM, DELETE_TEAM } from "./actionTypes";
import { deleteTeam, postCreateTeam } from "../../../helpers/fakebackend_helper";
import { createTeamFailed, createTeamSuccessful, deleteTeamFailed, deleteTeamSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createTeamSaga({ payload: { team, history } }) {
	try {
		const response = yield call(postCreateTeam, team);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createTeamSuccessful(response.message));
			history("/team-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createTeamFailed(response.message));
		}
	} catch (error) {
		yield put(createTeamFailed(error));
	}
}

function* deleteTeamSaga({ payload: { teamId } }) {
	try {
		const response = yield call(deleteTeam, teamId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteTeamSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteTeamFailed(response.message));
		}
	} catch (error) {
		yield put(deleteTeamFailed(error));
	}
}

function* CreateTeamMainSaga() {
	yield takeEvery(SAVE_TEAM, createTeamSaga);
	yield takeEvery(DELETE_TEAM, deleteTeamSaga);
}

export default CreateTeamMainSaga;
