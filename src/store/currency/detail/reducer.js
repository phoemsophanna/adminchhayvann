import { RESET_CURRENCY_SHOW_DETAIL_FLAG, CURRENCY_SHOW_DETAIL, CURRENCY_SHOW_DETAIL_FAILED, CURRENCY_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	currency: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CurrencyDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case CURRENCY_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CURRENCY_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				currency: action.payload.currency,
				message: "Fetch currency successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CURRENCY_SHOW_DETAIL_FAILED:
			state = {
				...state,
				currency: null,
				message: "Fetch currency failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CURRENCY_SHOW_DETAIL_FLAG:
			state = {
				...state,
				currency: null,
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

export default CurrencyDetailReducer;
