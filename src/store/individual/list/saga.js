import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_INDIVIDUAL_LIST_FLAG, INDIVIDUAL_LIST, DELETE_INDIVIDUAL } from "./actionTypes";
import { deleteIndividualFailed, deleteIndividualSuccessful, fetchIndividualListFail, fetchIndividualListSuccess } from "./actions";
import { deleteIndividual, getIndividualList } from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetchIndividualListSaga() {
	try {
		const response = yield call(getIndividualList);
		if (response) {
			yield put(fetchIndividualListSuccess(response.data));
		} else {
			yield put(fetchIndividualListFail(response));
		}
	} catch (error) {
		yield put(fetchIndividualListFail(error));
	}
}

function* refreshIndividualListSaga() {
	try {
		const response = yield call(getIndividualList);
		if (response) {
			yield put(fetchIndividualListSuccess(response.data));
		} else {
			yield put(fetchIndividualListFail(response));
		}
	} catch (error) {
		yield put(fetchIndividualListFail(error));
	}
}

function* deleteIndividualSaga({ payload: { individualId } }) {
	try {
		const response = yield call(deleteIndividual, individualId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteIndividualSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteIndividualFailed(response.message));
		}
	} catch (error) {
		yield put(deleteIndividualFailed(error));
	}
}

function* IndividualListSaga() {
	yield takeEvery(INDIVIDUAL_LIST, fetchIndividualListSaga);
	yield takeEvery(REFRESH_INDIVIDUAL_LIST_FLAG, refreshIndividualListSaga);
	yield takeEvery(DELETE_INDIVIDUAL, deleteIndividualSaga);
}

export default IndividualListSaga;
