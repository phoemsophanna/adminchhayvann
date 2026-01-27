import {
	CREATE_TESTIMONIAL,
	CREATE_TESTIMONIAL_FAILED,
	CREATE_TESTIMONIAL_SUCCESSFUL,
	DELETE_TESTIMONIAL,
	DELETE_TESTIMONIAL_FAILED,
	DELETE_TESTIMONIAL_SUCCESSFUL,
	RESET_CREATE_TESTIMONIAL_FLAG,
} from "./actionTypes";

export const createTestimonial = (testimonial) => {
	return {
		type: CREATE_TESTIMONIAL,
		payload: { testimonial },
	};
};

export const createTestimonialSuccessful = (message) => {
	return {
		type: CREATE_TESTIMONIAL_SUCCESSFUL,
		payload: { message },
	};
};

export const createTestimonialFailed = (error) => {
	return {
		type: CREATE_TESTIMONIAL_FAILED,
		payload: { error },
	};
};

export const deleteTestimonial = (testimonialId) => {
	return {
		type: DELETE_TESTIMONIAL,
		payload: { testimonialId },
	};
};

export const deleteTestimonialSuccessful = (message) => {
	return {
		type: DELETE_TESTIMONIAL_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteTestimonialFailed = (error) => {
	return {
		type: DELETE_TESTIMONIAL_FAILED,
		payload: { error },
	};
};

export const resetCreateTestimonialFlag = () => {
	return {
		type: RESET_CREATE_TESTIMONIAL_FLAG,
	};
};
