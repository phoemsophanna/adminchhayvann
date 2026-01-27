import { RESET_EXCHANGE_SHOW_DETAIL_FLAG, EXCHANGE_SHOW_DETAIL, EXCHANGE_SHOW_DETAIL_FAILED, EXCHANGE_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	exchange: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ExchangeDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case EXCHANGE_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case EXCHANGE_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				exchange: action.payload.exchange,
				message: "Fetch exchange successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case EXCHANGE_SHOW_DETAIL_FAILED:
			state = {
				...state,
				exchange: null,
				message: "Fetch exchange failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_EXCHANGE_SHOW_DETAIL_FLAG:
			state = {
				...state,
				exchange: null,
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

export default ExchangeDetailReducer;
