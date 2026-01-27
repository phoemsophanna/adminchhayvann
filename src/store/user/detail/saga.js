import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { USER_SHOW_DETAIL } from "./actionTypes";
import { fetchUserDetailFail, fetchUserDetailSuccess } from "./actions";
import { getUserShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchUserDetailSaga({ payload: { userId } }) {
	try {
		const response = yield call(getUserShowDetail, { id: userId });
		if (response.status === "success") {
			yield put(fetchUserDetailSuccess(response.model));
		} else {
			yield put(fetchUserDetailFail(response));
		}
	} catch (error) {
		yield put(fetchUserDetailFail(error));
	}
}

function* UserDetailSaga() {
	yield takeEvery(USER_SHOW_DETAIL, fetchUserDetailSaga);
}

export default UserDetailSaga;
