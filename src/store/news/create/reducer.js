import {
	SAVE_NEWS,
	SAVE_NEWS_FAILED,
	SAVE_NEWS_SUCCESSFUL,
	DELETE_NEWS,
	DELETE_NEWS_FAILED,
	DELETE_NEWS_SUCCESSFUL,
	RESET_SAVE_NEWS_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateNewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_NEWS:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_NEWS_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_NEWS_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_NEWS:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_NEWS_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_NEWS_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_NEWS_FLAG:
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

export default CreateNewsReducer;
