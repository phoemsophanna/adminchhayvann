import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { TESTIMONIAL_SHOW_DETAIL } from "./actionTypes";
import { fetchTestimonialDetailFail, fetchTestimonialDetailSuccess } from "./actions";
import { getTestimonialShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchTestimonialDetailSaga({ payload: { testimonialId } }) {
	try {
		const response = yield call(getTestimonialShowDetail, { id: testimonialId });
		if (response.status === "success") {
			yield put(fetchTestimonialDetailSuccess(response.model));
		} else {
			yield put(fetchTestimonialDetailFail(response));
		}
	} catch (error) {
		yield put(fetchTestimonialDetailFail(error));
	}
}

function* TestimonialDetailSaga() {
	yield takeEvery(TESTIMONIAL_SHOW_DETAIL, fetchTestimonialDetailSaga);
}

export default TestimonialDetailSaga;
