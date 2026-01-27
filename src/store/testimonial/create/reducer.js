import {
	CREATE_TESTIMONIAL,
	CREATE_TESTIMONIAL_FAILED,
	CREATE_TESTIMONIAL_SUCCESSFUL,
	DELETE_TESTIMONIAL,
	DELETE_TESTIMONIAL_FAILED,
	DELETE_TESTIMONIAL_SUCCESSFUL,
	RESET_CREATE_TESTIMONIAL_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateTestimonialReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_TESTIMONIAL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CREATE_TESTIMONIAL_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CREATE_TESTIMONIAL_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_TESTIMONIAL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_TESTIMONIAL_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_TESTIMONIAL_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CREATE_TESTIMONIAL_FLAG:
			state = {
				...state,
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

export default CreateTestimonialReducer;
