import { RESET_INDIVIDUAL_SHOW_DETAIL_FLAG, INDIVIDUAL_SHOW_DETAIL, INDIVIDUAL_SHOW_DETAIL_FAILED, INDIVIDUAL_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	individual: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const IndividualDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case INDIVIDUAL_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case INDIVIDUAL_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				individual: action.payload.individual,
				message: "Fetch Individual successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case INDIVIDUAL_SHOW_DETAIL_FAILED:
			state = {
				...state,
				individual: null,
				message: "Fetch Individual failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_INDIVIDUAL_SHOW_DETAIL_FLAG:
			state = {
				...state,
				individual: null,
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

export default IndividualDetailReducer;
