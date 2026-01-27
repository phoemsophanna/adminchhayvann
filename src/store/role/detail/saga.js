import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { ROLE_SHOW_DETAIL } from "./actionTypes";
import { fetchRoleDetailFail, fetchRoleDetailSuccess } from "./actions";
import { getRoleShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchRoleDetailSaga({ payload: { roleId } }) {
	try {
		const response = yield call(getRoleShowDetail, { id: roleId });
		if (response.status === "success") {
			yield put(fetchRoleDetailSuccess(response.model));
		} else {
			yield put(fetchRoleDetailFail(response));
		}
	} catch (error) {
		yield put(fetchRoleDetailFail(error));
	}
}

function* RoleDetailSaga() {
	yield takeEvery(ROLE_SHOW_DETAIL, fetchRoleDetailSaga);
}

export default RoleDetailSaga;
