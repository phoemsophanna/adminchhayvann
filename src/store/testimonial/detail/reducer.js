import {
	RESET_TESTIMONIAL_SHOW_DETAIL_FLAG,
	TESTIMONIAL_SHOW_DETAIL,
	TESTIMONIAL_SHOW_DETAIL_FAILED,
	TESTIMONIAL_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	testimonial: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const TestimonialDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case TESTIMONIAL_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case TESTIMONIAL_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				testimonial: action.payload.testimonial,
				message: "Fetch testimonial successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case TESTIMONIAL_SHOW_DETAIL_FAILED:
			state = {
				...state,
				testimonial: null,
				message: "Fetch testimonial failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_TESTIMONIAL_SHOW_DETAIL_FLAG:
			state = {
				...state,
				testimonial: null,
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default TestimonialDetailReducer;
