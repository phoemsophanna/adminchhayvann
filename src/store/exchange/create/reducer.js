import {
	SAVE_EXCHANGE,
	SAVE_EXCHANGE_FAILED,
	SAVE_EXCHANGE_SUCCESSFUL,
	DELETE_EXCHANGE,
	DELETE_EXCHANGE_FAILED,
	DELETE_EXCHANGE_SUCCESSFUL,
	RESET_SAVE_EXCHANGE_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateExchangeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_EXCHANGE:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_EXCHANGE_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_EXCHANGE_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_EXCHANGE:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_EXCHANGE_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_EXCHANGE_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_EXCHANGE_FLAG:
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

export default CreateExchangeReducer;
