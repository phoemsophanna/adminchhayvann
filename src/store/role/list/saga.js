import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_ROLE_LIST_FLAG, ROLE_LIST } from "./actionTypes";
import { fetchRoleListFail, fetchRoleListSuccess } from "./actions";
import { getRoleList } from "../../../helpers/fakebackend_helper";

function* fetchRoleListSaga() {
	try {
		const response = yield call(getRoleList);
		if (response) {
			yield put(fetchRoleListSuccess(response.data));
		} else {
			yield put(fetchRoleListFail(response));
		}
	} catch (error) {
		yield put(fetchRoleListFail(error));
	}
}

function* refreshRoleListSaga() {
	try {
		const response = yield call(getRoleList);
		if (response) {
			yield put(fetchRoleListSuccess(response.data));
		} else {
			yield put(fetchRoleListFail(response));
		}
	} catch (error) {
		yield put(fetchRoleListFail(error));
	}
}

function* RoleListSaga() {
	yield takeEvery(ROLE_LIST, fetchRoleListSaga);
	yield takeEvery(REFRESH_ROLE_LIST_FLAG, refreshRoleListSaga);
}

export default RoleListSaga;
