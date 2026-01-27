import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CREATE_FAQ, DELETE_FAQ } from "./actionTypes";
import { deleteFaq, postCreateFaq } from "../../../helpers/fakebackend_helper";
import { createFaqFailed, createFaqSuccessful, deleteFaqFailed, deleteFaqSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createFaqSaga({ payload: { faq } }) {
	try {
		const response = yield call(postCreateFaq, faq);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createFaqSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createFaqFailed(response.message));
		}
	} catch (error) {
		yield put(createFaqFailed(error));
	}
}

function* deleteFaqSaga({ payload: { faqId } }) {
	try {
		const response = yield call(deleteFaq, faqId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteFaqSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteFaqFailed(response.message));
		}
	} catch (error) {
		yield put(deleteFaqFailed(error));
	}
}

function* CreateFaqMainSaga() {
	yield takeEvery(CREATE_FAQ, createFaqSaga);
	yield takeEvery(DELETE_FAQ, deleteFaqSaga);
}

export default CreateFaqMainSaga;
