import { REFRESH_AWARD_LIST_FLAG, RESET_AWARD_LIST_FLAG, AWARD_LIST, AWARD_LIST_FAILED, AWARD_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	awards: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const AwardListReducer = (state = initialState, action) => {
	switch (action.type) {
		case AWARD_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case AWARD_LIST_SUCCESSFUL:
			state = {
				...state,
				awards: action.payload.awards,
				message: "Fetch award successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case AWARD_LIST_FAILED:
			state = {
				...state,
				awards: [],
				message: "Fetch award failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_AWARD_LIST_FLAG:
			state = {
				...state,
				awards: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_AWARD_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				awards: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default AwardListReducer;
