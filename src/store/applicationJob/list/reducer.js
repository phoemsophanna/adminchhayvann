import { REFRESH_APPLICATION_LIST_FLAG, RESET_APPLICATION_LIST_FLAG, APPLICATION_LIST, APPLICATION_LIST_FAILED, APPLICATION_LIST_SUCCESSFUL, DELETE_APPLICATION_FAILED, DELETE_APPLICATION_SUCCESSFUL, DELETE_APPLICATION } from "./actionTypes";

const initialState = {
	applications: [],
	message: null,
	isLoading: false,
	success: false,
	deleteSuccess: false,
	error: false,
};

const ApplicationListReducer = (state = initialState, action) => {
	switch (action.type) {
		case APPLICATION_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case APPLICATION_LIST_SUCCESSFUL:
			state = {
				...state,
				applications: action.payload.applications,
				message: "Fetch application successfully.",
				isLoading: false,
				deleteSuccess: false,
				success: true,
				error: false,
			};
			break;
		case APPLICATION_LIST_FAILED:
			state = {
				...state,
				applications: [],
				message: "Fetch application failed",
				isLoading: false,
				deleteSuccess: false,
				success: false,
				error: true,
			};
			break;
		case RESET_APPLICATION_LIST_FLAG:
			state = {
				...state,
				applications: [],
				message: null,
				isLoading: false,
				deleteSuccess: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_APPLICATION_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				deleteSuccess: false,
				error: false,
				message: null,
				applications: [],
			};
			break;
		case DELETE_APPLICATION:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_APPLICATION_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				deleteSuccess: true,
				success: true,
				error: false,
			};
			break;
		case DELETE_APPLICATION_FAILED:
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

export default ApplicationListReducer;
