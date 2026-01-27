import {
	RESET_TESTIMONIAL_SHOW_DETAIL_FLAG,
	TESTIMONIAL_SHOW_DETAIL,
	TESTIMONIAL_SHOW_DETAIL_FAILED,
	TESTIMONIAL_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchTestimonialDetail = (testimonialId) => {
	return {
		type: TESTIMONIAL_SHOW_DETAIL,
		payload: { testimonialId },
	};
};

export const fetchTestimonialDetailSuccess = (testimonial) => {
	return {
		type: TESTIMONIAL_SHOW_DETAIL_SUCCESSFUL,
		payload: { testimonial },
	};
};

export const fetchTestimonialDetailFail = (error) => {
	return {
		type: TESTIMONIAL_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetTestimonialShowDetail = () => {
	return {
		type: RESET_TESTIMONIAL_SHOW_DETAIL_FLAG,
	};
};
