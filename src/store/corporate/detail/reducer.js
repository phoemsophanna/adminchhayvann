import { RESET_CORPORATE_SHOW_DETAIL_FLAG, CORPORATE_SHOW_DETAIL, CORPORATE_SHOW_DETAIL_FAILED, CORPORATE_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	corporate: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CorporateDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case CORPORATE_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CORPORATE_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				corporate: action.payload.corporate,
				message: "Fetch Corporate successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CORPORATE_SHOW_DETAIL_FAILED:
			state = {
				...state,
				corporate: null,
				message: "Fetch Corporate failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CORPORATE_SHOW_DETAIL_FLAG:
			state = {
				...state,
				corporate: null,
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

export default CorporateDetailReducer;
