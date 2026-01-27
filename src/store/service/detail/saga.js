import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SERVICE_SHOW_DETAIL } from "./actionTypes";
import { fetchServiceDetailFail, fetchServiceDetailSuccess } from "./actions";
import { getServiceShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchServiceDetailSaga({ payload: { serviceId } }) {
	try {
		const response = yield call(getServiceShowDetail, { id: serviceId });
		if (response.status === "success") {
			yield put(fetchServiceDetailSuccess(response.model));
		} else {
			yield put(fetchServiceDetailFail(response));
		}
	} catch (error) {
		yield put(fetchServiceDetailFail(error));
	}
}

function* ServiceDetailSaga() {
	yield takeEvery(SERVICE_SHOW_DETAIL, fetchServiceDetailSaga);
}

export default ServiceDetailSaga;
