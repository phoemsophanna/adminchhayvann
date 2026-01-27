import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_PARTNER, DELETE_PARTNER } from "./actionTypes";
import { deletePartner, postCreatePartner } from "../../../helpers/fakebackend_helper";
import {
	createPartnerFailed,
	createPartnerSuccessful,
	deletePartnerFailed,
	deletePartnerSuccessful,
} from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createPartnerSaga({ payload: { partner } }) {
	try {
		const response = yield call(postCreatePartner, partner);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createPartnerSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createPartnerFailed(response.message));
		}
	} catch (error) {
		yield put(createPartnerFailed(error));
	}
}

function* deletePartnerSaga({ payload: { partnerId } }) {
	try {
		const response = yield call(deletePartner, partnerId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deletePartnerSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deletePartnerFailed(response.message));
		}
	} catch (error) {
		yield put(deletePartnerFailed(error));
	}
}

function* CreatePartnerMainSaga() {
	yield takeEvery(SAVE_PARTNER, createPartnerSaga);
	yield takeEvery(DELETE_PARTNER, deletePartnerSaga);
}

export default CreatePartnerMainSaga;
