import {
	SAVE_BANNER,
	SAVE_BANNER_FAILED,
	SAVE_BANNER_SUCCESSFUL,
	DELETE_BANNER,
	DELETE_BANNER_FAILED,
	DELETE_BANNER_SUCCESSFUL,
	RESET_SAVE_BANNER_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateBannerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_BANNER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_BANNER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_BANNER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_BANNER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_BANNER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_BANNER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_BANNER_FLAG:
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

export default CreateBannerReducer;
