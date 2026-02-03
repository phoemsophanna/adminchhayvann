import { REFRESH_INDIVIDUAL_LIST_FLAG, RESET_INDIVIDUAL_LIST_FLAG, INDIVIDUAL_LIST, INDIVIDUAL_LIST_FAILED, INDIVIDUAL_LIST_SUCCESSFUL, DELETE_INDIVIDUAL_FAILED, DELETE_INDIVIDUAL_SUCCESSFUL, DELETE_INDIVIDUAL } from "./actionTypes";

const initialState = {
	individuals: [],
	message: null,
	isLoading: false,
	success: false,
	deleteSuccess: false,
	error: false,
};

const IndividualListReducer = (state = initialState, action) => {
	switch (action.type) {
		case INDIVIDUAL_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case INDIVIDUAL_LIST_SUCCESSFUL:
			state = {
				...state,
				individuals: action.payload.individuals,
				message: "Fetch Individual successfully.",
				isLoading: false,
				deleteSuccess: false,
				success: true,
				error: false,
			};
			break;
		case INDIVIDUAL_LIST_FAILED:
			state = {
				...state,
				individuals: [],
				message: "Fetch Individual failed",
				isLoading: false,
				deleteSuccess: false,
				success: false,
				error: true,
			};
			break;
		case RESET_INDIVIDUAL_LIST_FLAG:
			state = {
				...state,
				individuals: [],
				message: null,
				isLoading: false,
				deleteSuccess: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_INDIVIDUAL_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				deleteSuccess: false,
				error: false,
				message: null,
				individuals: [],
			};
			break;
		case DELETE_INDIVIDUAL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_INDIVIDUAL_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				deleteSuccess: true,
				success: true,
				error: false,
			};
			break;
		case DELETE_INDIVIDUAL_FAILED:
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

export default IndividualListReducer;
