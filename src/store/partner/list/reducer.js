import {
	REFRESH_PARTNER_LIST_FLAG,
	RESET_PARTNER_LIST_FLAG,
	PARTNER_LIST,
	PARTNER_LIST_FAILED,
	PARTNER_LIST_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	partners: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const PartnerListReducer = (state = initialState, action) => {
	switch (action.type) {
		case PARTNER_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PARTNER_LIST_SUCCESSFUL:
			state = {
				...state,
				partners: action.payload.partners,
				message: "Fetch projectCategory successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PARTNER_LIST_FAILED:
			state = {
				...state,
				partners: [],
				message: "Fetch projectCategory failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PARTNER_LIST_FLAG:
			state = {
				...state,
				partners: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_PARTNER_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				partners: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default PartnerListReducer;
