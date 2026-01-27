import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CREATE_TESTIMONIAL, DELETE_TESTIMONIAL } from "./actionTypes";
import { deleteTestimonial, postCreateTestimonial } from "../../../helpers/fakebackend_helper";
import { createTestimonialFailed, createTestimonialSuccessful, deleteTestimonialFailed, deleteTestimonialSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createTestimonialSaga({ payload: { testimonial } }) {
	try {
		const response = yield call(postCreateTestimonial, testimonial);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createTestimonialSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createTestimonialFailed(response.message));
		}
	} catch (error) {
		yield put(createTestimonialFailed(error));
	}
}

function* deleteTestimonialSaga({ payload: { testimonialId } }) {
	try {
		const response = yield call(deleteTestimonial, testimonialId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteTestimonialSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteTestimonialFailed(response.message));
		}
	} catch (error) {
		yield put(deleteTestimonialFailed(error));
	}
}

function* CreateTestimonialMainSaga() {
	yield takeEvery(CREATE_TESTIMONIAL, createTestimonialSaga);
	yield takeEvery(DELETE_TESTIMONIAL, deleteTestimonialSaga);
}

export default CreateTestimonialMainSaga;
