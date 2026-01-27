import {
	CREATE_CAREER,
	CREATE_CAREER_FAILED,
	CREATE_CAREER_SUCCESSFUL,
	DELETE_CAREER,
	DELETE_CAREER_FAILED,
	DELETE_CAREER_SUCCESSFUL,
	RESET_CREATE_CAREER_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateCareerReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_CAREER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CREATE_CAREER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CREATE_CAREER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_CAREER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_CAREER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_CAREER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CREATE_CAREER_FLAG:
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

export default CreateCareerReducer;
