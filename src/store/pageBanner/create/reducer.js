import {
	CREATE_PAGE_BANNER,
	CREATE_PAGE_BANNER_FAILED,
	CREATE_PAGE_BANNER_SUCCESSFUL,
	DELETE_PAGE_BANNER,
	DELETE_PAGE_BANNER_FAILED,
	DELETE_PAGE_BANNER_SUCCESSFUL,
	RESET_CREATE_PAGE_BANNER_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreatePageBannerReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_PAGE_BANNER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CREATE_PAGE_BANNER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CREATE_PAGE_BANNER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_PAGE_BANNER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_PAGE_BANNER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_PAGE_BANNER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CREATE_PAGE_BANNER_FLAG:
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

export default CreatePageBannerReducer;
