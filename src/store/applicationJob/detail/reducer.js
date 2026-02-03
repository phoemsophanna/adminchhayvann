import { RESET_APPLICATION_SHOW_DETAIL_FLAG, APPLICATION_SHOW_DETAIL, APPLICATION_SHOW_DETAIL_FAILED, APPLICATION_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	application: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ApplicationDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case APPLICATION_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case APPLICATION_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				application: action.payload.application,
				message: "Fetch career successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case APPLICATION_SHOW_DETAIL_FAILED:
			state = {
				...state,
				application: null,
				message: "Fetch Application failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_APPLICATION_SHOW_DETAIL_FLAG:
			state = {
				...state,
				application: null,
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

export default ApplicationDetailReducer;
