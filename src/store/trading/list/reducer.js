import { REFRESH_TRADING_LIST_FLAG, RESET_TRADING_LIST_FLAG, TRADING_LIST, TRADING_LIST_FAILED, TRADING_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	tradings: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const TradingListReducer = (state = initialState, action) => {
	switch (action.type) {
		case TRADING_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case TRADING_LIST_SUCCESSFUL:
			state = {
				...state,
				tradings: action.payload.tradings,
				message: "Fetch trading successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case TRADING_LIST_FAILED:
			state = {
				...state,
				tradings: [],
				message: "Fetch trading failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_TRADING_LIST_FLAG:
			state = {
				...state,
				tradings: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_TRADING_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				tradings: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default TradingListReducer;
