import {
	SAVE_HISTORY,
	SAVE_HISTORY_FAILED,
	SAVE_HISTORY_SUCCESSFUL,
	DELETE_HISTORY,
	DELETE_HISTORY_FAILED,
	DELETE_HISTORY_SUCCESSFUL,
	RESET_SAVE_HISTORY_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateHistoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_HISTORY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_HISTORY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_HISTORY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_HISTORY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_HISTORY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_HISTORY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_HISTORY_FLAG:
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

export default CreateHistoryReducer;
