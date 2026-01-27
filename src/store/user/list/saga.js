import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_USER_LIST_FLAG, USER_LIST } from "./actionTypes";
import { fetchUserListFail, fetchUserListSuccess } from "./actions";
import { getUserList } from "../../../helpers/fakebackend_helper";

function* fetchUserListSaga() {
	try {
		const response = yield call(getUserList);
		if (response) {
			yield put(fetchUserListSuccess(response.data));
		} else {
			yield put(fetchUserListFail(response));
		}
	} catch (error) {
		yield put(fetchUserListFail(error));
	}
}

function* refreshUserListSaga() {
	try {
		const response = yield call(getUserList);
		if (response) {
			yield put(fetchUserListSuccess(response.data));
		} else {
			yield put(fetchUserListFail(response));
		}
	} catch (error) {
		yield put(fetchUserListFail(error));
	}
}

function* UserListSaga() {
	yield takeEvery(USER_LIST, fetchUserListSaga);
	yield takeEvery(REFRESH_USER_LIST_FLAG, refreshUserListSaga);
}

export default UserListSaga;
