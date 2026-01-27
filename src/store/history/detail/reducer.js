import { RESET_HISTORY_SHOW_DETAIL_FLAG, HISTORY_SHOW_DETAIL, HISTORY_SHOW_DETAIL_FAILED, HISTORY_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	history: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const HistoryDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case HISTORY_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case HISTORY_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				history: action.payload.history,
				message: "Fetch history successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case HISTORY_SHOW_DETAIL_FAILED:
			state = {
				...state,
				history: null,
				message: "Fetch history failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_HISTORY_SHOW_DETAIL_FLAG:
			state = {
				...state,
				history: null,
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

export default HistoryDetailReducer;
