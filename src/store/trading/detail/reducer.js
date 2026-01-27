import { RESET_TRADING_SHOW_DETAIL_FLAG, TRADING_SHOW_DETAIL, TRADING_SHOW_DETAIL_FAILED, TRADING_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	trading: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const TradingDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case TRADING_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case TRADING_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				trading: action.payload.trading,
				message: "Fetch trading successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case TRADING_SHOW_DETAIL_FAILED:
			state = {
				...state,
				trading: null,
				message: "Fetch trading failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_TRADING_SHOW_DETAIL_FLAG:
			state = {
				...state,
				trading: null,
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

export default TradingDetailReducer;
