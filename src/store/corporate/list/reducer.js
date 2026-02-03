import { REFRESH_CORPORATE_LIST_FLAG, RESET_CORPORATE_LIST_FLAG, CORPORATE_LIST, CORPORATE_LIST_FAILED, CORPORATE_LIST_SUCCESSFUL, DELETE_CORPORATE_FAILED, DELETE_CORPORATE_SUCCESSFUL, DELETE_CORPORATE } from "./actionTypes";

const initialState = {
	corporates: [],
	message: null,
	isLoading: false,
	success: false,
	deleteSuccess: false,
	error: false,
};

const CorporateListReducer = (state = initialState, action) => {
	switch (action.type) {
		case CORPORATE_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CORPORATE_LIST_SUCCESSFUL:
			state = {
				...state,
				corporates: action.payload.corporates,
				message: "Fetch application successfully.",
				isLoading: false,
				deleteSuccess: false,
				success: true,
				error: false,
			};
			break;
		case CORPORATE_LIST_FAILED:
			state = {
				...state,
				corporates: [],
				message: "Fetch application failed",
				isLoading: false,
				deleteSuccess: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CORPORATE_LIST_FLAG:
			state = {
				...state,
				corporates: [],
				message: null,
				isLoading: false,
				deleteSuccess: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_CORPORATE_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				deleteSuccess: false,
				error: false,
				message: null,
				corporates: [],
			};
			break;
		case DELETE_CORPORATE:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_CORPORATE_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				deleteSuccess: true,
				success: true,
				error: false,
			};
			break;
		case DELETE_CORPORATE_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				deleteSuccess: false,
				error: true,
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default CorporateListReducer;
