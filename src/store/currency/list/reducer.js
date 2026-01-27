import { REFRESH_CURRENCY_LIST_FLAG, RESET_CURRENCY_LIST_FLAG, CURRENCY_LIST, CURRENCY_LIST_FAILED, CURRENCY_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	currencies: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CurrencyListReducer = (state = initialState, action) => {
	switch (action.type) {
		case CURRENCY_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CURRENCY_LIST_SUCCESSFUL:
			state = {
				...state,
				currencies: action.payload.currencies,
				message: "Fetch service successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CURRENCY_LIST_FAILED:
			state = {
				...state,
				currencies: [],
				message: "Fetch service failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CURRENCY_LIST_FLAG:
			state = {
				...state,
				currencies: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_CURRENCY_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				currencies: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default CurrencyListReducer;
