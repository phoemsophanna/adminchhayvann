import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { INDIVIDUAL_SHOW_DETAIL } from "./actionTypes";
import { fetchIndividualDetailFail, fetchIndividualDetailSuccess } from "./actions";
import { getIndividualShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchIndividualDetailSaga({ payload: { individualId } }) {
	try {
		const response = yield call(getIndividualShowDetail, { id: individualId });
		if (response.status === "success") {
			yield put(fetchIndividualDetailSuccess(response.model));
		} else {
			yield put(fetchIndividualDetailFail(response));
		}
	} catch (error) {
		yield put(fetchIndividualDetailFail(error));
	}
}

function* IndividualDetailSaga() {
	yield takeEvery(INDIVIDUAL_SHOW_DETAIL, fetchIndividualDetailSaga);
}

export default IndividualDetailSaga;
