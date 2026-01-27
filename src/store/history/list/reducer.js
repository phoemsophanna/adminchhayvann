import { REFRESH_HISTORY_LIST_FLAG, RESET_HISTORY_LIST_FLAG, HISTORY_LIST, HISTORY_LIST_FAILED, HISTORY_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	historys: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const HistoryListReducer = (state = initialState, action) => {
	switch (action.type) {
		case HISTORY_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case HISTORY_LIST_SUCCESSFUL:
			state = {
				...state,
				historys: action.payload.historys,
				message: "Fetch history successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case HISTORY_LIST_FAILED:
			state = {
				...state,
				historys: [],
				message: "Fetch history failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_HISTORY_LIST_FLAG:
			state = {
				...state,
				historys: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_HISTORY_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				historys: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default HistoryListReducer;
