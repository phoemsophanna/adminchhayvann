import {
	REFRESH_TESTIMONIAL_LIST_FLAG,
	RESET_TESTIMONIAL_LIST_FLAG,
	TESTIMONIAL_LIST,
	TESTIMONIAL_LIST_FAILED,
	TESTIMONIAL_LIST_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	testimonials: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const TestimonialListReducer = (state = initialState, action) => {
	switch (action.type) {
		case TESTIMONIAL_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case TESTIMONIAL_LIST_SUCCESSFUL:
			state = {
				...state,
				testimonials: action.payload.testimonials,
				message: "Fetch testimonial successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case TESTIMONIAL_LIST_FAILED:
			state = {
				...state,
				testimonials: [],
				message: "Fetch testimonial failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_TESTIMONIAL_LIST_FLAG:
			state = {
				...state,
				testimonials: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_TESTIMONIAL_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				testimonials: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default TestimonialListReducer;
