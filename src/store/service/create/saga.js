import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_SERVICE, DELETE_SERVICE } from "./actionTypes";
import { deleteService, postCreateService } from "../../../helpers/fakebackend_helper";
import { createServiceFailed, createServiceSuccessful, deleteServiceFailed, deleteServiceSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createServiceSaga({ payload: { service, history } }) {
	try {
		const response = yield call(postCreateService, service);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createServiceSuccessful(response.message));
			history("/service-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createServiceFailed(response.message));
		}
	} catch (error) {
		yield put(createServiceFailed(error));
	}
}

function* deleteServiceSaga({ payload: { serviceId } }) {
	try {
		const response = yield call(deleteService, serviceId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteServiceSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteServiceFailed(response.message));
		}
	} catch (error) {
		yield put(deleteServiceFailed(error));
	}
}

function* CreateServiceMainSaga() {
	yield takeEvery(SAVE_SERVICE, createServiceSaga);
	yield takeEvery(DELETE_SERVICE, deleteServiceSaga);
}

export default CreateServiceMainSaga;
