import { REFRESH_FAQ_LIST_FLAG, RESET_FAQ_LIST_FLAG, FAQ_LIST, FAQ_LIST_FAILED, FAQ_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	faqs: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const FaqListReducer = (state = initialState, action) => {
	switch (action.type) {
		case FAQ_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case FAQ_LIST_SUCCESSFUL:
			state = {
				...state,
				faqs: action.payload.faqs,
				message: "Fetch faq successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case FAQ_LIST_FAILED:
			state = {
				...state,
				faqs: [],
				message: "Fetch faq failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_FAQ_LIST_FLAG:
			state = {
				...state,
				faqs: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_FAQ_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				faqs: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default FaqListReducer;
