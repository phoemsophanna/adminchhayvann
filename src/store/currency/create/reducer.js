import {
	SAVE_CURRENCY,
	SAVE_CURRENCY_FAILED,
	SAVE_CURRENCY_SUCCESSFUL,
	DELETE_CURRENCY,
	DELETE_CURRENCY_FAILED,
	DELETE_CURRENCY_SUCCESSFUL,
	RESET_SAVE_CURRENCY_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateCurrencyReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_CURRENCY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_CURRENCY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_CURRENCY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_CURRENCY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_CURRENCY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_CURRENCY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_CURRENCY_FLAG:
			state = {
				...state,
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

export default CreateCurrencyReducer;
