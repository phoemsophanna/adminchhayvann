import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_CORPORATE_LIST_FLAG, CORPORATE_LIST, DELETE_CORPORATE } from "./actionTypes";
import { deleteCorporateFailed, deleteCorporateSuccessful, fetchCorporateListFail, fetchCorporateListSuccess } from "./actions";
import { deleteCorporate, getCorporateList } from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetchCorporateListSaga() {
	try {
		const response = yield call(getCorporateList);
		if (response) {
			yield put(fetchCorporateListSuccess(response.data));
		} else {
			yield put(fetchCorporateListFail(response));
		}
	} catch (error) {
		yield put(fetchCorporateListFail(error));
	}
}

function* refreshCorporateListSaga() {
	try {
		const response = yield call(getCorporateList);
		if (response) {
			yield put(fetchCorporateListSuccess(response.data));
		} else {
			yield put(fetchCorporateListFail(response));
		}
	} catch (error) {
		yield put(fetchCorporateListFail(error));
	}
}

function* deleteCorporateSaga({ payload: { corporateId } }) {
	try {
		const response = yield call(deleteCorporate, corporateId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteCorporateSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteCorporateFailed(response.message));
		}
	} catch (error) {
		yield put(deleteCorporateFailed(error));
	}
}

function* CorporateListSaga() {
	yield takeEvery(CORPORATE_LIST, fetchCorporateListSaga);
	yield takeEvery(REFRESH_CORPORATE_LIST_FLAG, refreshCorporateListSaga);
	yield takeEvery(DELETE_CORPORATE, deleteCorporateSaga);
}

export default CorporateListSaga;
