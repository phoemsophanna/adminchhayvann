import { REFRESH_EXCHANGE_LIST_FLAG, RESET_EXCHANGE_LIST_FLAG, EXCHANGE_LIST, EXCHANGE_LIST_FAILED, EXCHANGE_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	exchanges: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ExchangeListReducer = (state = initialState, action) => {
	switch (action.type) {
		case EXCHANGE_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case EXCHANGE_LIST_SUCCESSFUL:
			state = {
				...state,
				exchanges: action.payload.exchanges,
				message: "Fetch exchange successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case EXCHANGE_LIST_FAILED:
			state = {
				...state,
				exchanges: [],
				message: "Fetch exchange failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_EXCHANGE_LIST_FLAG:
			state = {
				...state,
				exchanges: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_EXCHANGE_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				exchanges: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default ExchangeListReducer;
