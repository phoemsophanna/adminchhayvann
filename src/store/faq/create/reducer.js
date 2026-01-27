import {
	CREATE_FAQ,
	CREATE_FAQ_FAILED,
	CREATE_FAQ_SUCCESSFUL,
	DELETE_FAQ,
	DELETE_FAQ_FAILED,
	DELETE_FAQ_SUCCESSFUL,
	RESET_CREATE_FAQ_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateFaqReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_FAQ:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CREATE_FAQ_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CREATE_FAQ_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_FAQ:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_FAQ_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_FAQ_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CREATE_FAQ_FLAG:
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

export default CreateFaqReducer;
