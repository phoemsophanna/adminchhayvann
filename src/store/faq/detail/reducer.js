import { RESET_FAQ_SHOW_DETAIL_FLAG, FAQ_SHOW_DETAIL, FAQ_SHOW_DETAIL_FAILED, FAQ_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	faq: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const FaqDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case FAQ_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case FAQ_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				faq: action.payload.faq,
				message: "Fetch faq successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case FAQ_SHOW_DETAIL_FAILED:
			state = {
				...state,
				faq: null,
				message: "Fetch faq failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_FAQ_SHOW_DETAIL_FLAG:
			state = {
				...state,
				faq: null,
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

export default FaqDetailReducer;
