import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_APPLICATION_LIST_FLAG, APPLICATION_LIST, DELETE_APPLICATION } from "./actionTypes";
import { deleteApplicationFailed, deleteApplicationSuccessful, fetchApplicationListFail, fetchApplicationListSuccess } from "./actions";
import { deleteApplication, getApplicationList } from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetchApplicationListSaga() {
	try {
		const response = yield call(getApplicationList);
		if (response) {
			yield put(fetchApplicationListSuccess(response.application));
		} else {
			yield put(fetchApplicationListFail(response));
		}
	} catch (error) {
		yield put(fetchApplicationListFail(error));
	}
}

function* refreshApplicationListSaga() {
	try {
		const response = yield call(getApplicationList);
		if (response) {
			yield put(fetchApplicationListSuccess(response.application));
		} else {
			yield put(fetchApplicationListFail(response));
		}
	} catch (error) {
		yield put(fetchApplicationListFail(error));
	}
}

function* deleteApplicationSaga({ payload: { applicationId } }) {
	try {
		const response = yield call(deleteApplication, applicationId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteApplicationSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteApplicationFailed(response.message));
		}
	} catch (error) {
		yield put(deleteApplicationFailed(error));
	}
}

function* ApplicationListSaga() {
	yield takeEvery(APPLICATION_LIST, fetchApplicationListSaga);
	yield takeEvery(REFRESH_APPLICATION_LIST_FLAG, refreshApplicationListSaga);
	yield takeEvery(DELETE_APPLICATION, deleteApplicationSaga);
}

export default ApplicationListSaga;
