import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_TESTIMONIAL_LIST_FLAG, TESTIMONIAL_LIST } from "./actionTypes";
import { fetchTestimonialListFail, fetchTestimonialListSuccess } from "./actions";
import { getTestimonialList } from "../../../helpers/fakebackend_helper";

function* fetchTestimonialListSaga() {
	try {
		const response = yield call(getTestimonialList);
		if (response) {
			yield put(fetchTestimonialListSuccess(response.data));
		} else {
			yield put(fetchTestimonialListFail(response));
		}
	} catch (error) {
		yield put(fetchTestimonialListFail(error));
	}
}

function* refreshTestimonialListSaga() {
	try {
		const response = yield call(getTestimonialList);
		if (response) {
			yield put(fetchTestimonialListSuccess(response.data));
		} else {
			yield put(fetchTestimonialListFail(response));
		}
	} catch (error) {
		yield put(fetchTestimonialListFail(error));
	}
}

function* TestimonialListSaga() {
	yield takeEvery(TESTIMONIAL_LIST, fetchTestimonialListSaga);
	yield takeEvery(REFRESH_TESTIMONIAL_LIST_FLAG, refreshTestimonialListSaga);
}

export default TestimonialListSaga;
