import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CREATE_CAREER, DELETE_CAREER } from "./actionTypes";
import { deleteCareer, postCreateCareer } from "../../../helpers/fakebackend_helper";
import { createCareerFailed, createCareerSuccessful, deleteCareerFailed, deleteCareerSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createCareerSaga({ payload: { career, history } }) {
	try {
		const response = yield call(postCreateCareer, career);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createCareerSuccessful(response.message));
			history("/career-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createCareerFailed(response.message));
		}
	} catch (error) {
		yield put(createCareerFailed(error));
	}
}

function* deleteCareerSaga({ payload: { careerId } }) {
	try {
		const response = yield call(deleteCareer, careerId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteCareerSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteCareerFailed(response.message));
		}
	} catch (error) {
		yield put(deleteCareerFailed(error));
	}
}

function* CreateCareerMainSaga() {
	yield takeEvery(CREATE_CAREER, createCareerSaga);
	yield takeEvery(DELETE_CAREER, deleteCareerSaga);
}

export default CreateCareerMainSaga;
