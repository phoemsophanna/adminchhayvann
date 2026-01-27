import { RESET_AWARD_SHOW_DETAIL_FLAG, AWARD_SHOW_DETAIL, AWARD_SHOW_DETAIL_FAILED, AWARD_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	award: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const AwardDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case AWARD_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case AWARD_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				award: action.payload.award,
				message: "Fetch award successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case AWARD_SHOW_DETAIL_FAILED:
			state = {
				...state,
				award: null,
				message: "Fetch award failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_AWARD_SHOW_DETAIL_FLAG:
			state = {
				...state,
				award: null,
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

export default AwardDetailReducer;
