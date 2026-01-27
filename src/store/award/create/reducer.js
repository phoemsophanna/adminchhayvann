import {
	SAVE_AWARD,
	SAVE_AWARD_FAILED,
	SAVE_AWARD_SUCCESSFUL,
	DELETE_AWARD,
	DELETE_AWARD_FAILED,
	DELETE_AWARD_SUCCESSFUL,
	RESET_SAVE_AWARD_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateAwardReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_AWARD:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_AWARD_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_AWARD_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_AWARD:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_AWARD_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_AWARD_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_AWARD_FLAG:
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

export default CreateAwardReducer;
