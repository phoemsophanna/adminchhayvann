import {
	REFRESH_TESTIMONIAL_LIST_FLAG,
	RESET_TESTIMONIAL_LIST_FLAG,
	TESTIMONIAL_LIST,
	TESTIMONIAL_LIST_FAILED,
	TESTIMONIAL_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchTestimonialList = () => {
	return {
		type: TESTIMONIAL_LIST,
	};
};

export const fetchTestimonialListSuccess = (testimonials) => {
	return {
		type: TESTIMONIAL_LIST_SUCCESSFUL,
		payload: { testimonials },
	};
};

export const fetchTestimonialListFail = (error) => {
	return {
		type: TESTIMONIAL_LIST_FAILED,
		payload: { error },
	};
};

export const resetTestimonialList = () => {
	return {
		type: RESET_TESTIMONIAL_LIST_FLAG,
	};
};

export const refreshTestimonialList = () => {
	return {
		type: REFRESH_TESTIMONIAL_LIST_FLAG,
	};
};
