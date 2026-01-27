import {
	SAVE_TRADING,
	SAVE_TRADING_FAILED,
	SAVE_TRADING_SUCCESSFUL,
	DELETE_TRADING,
	DELETE_TRADING_FAILED,
	DELETE_TRADING_SUCCESSFUL,
	RESET_SAVE_TRADING_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateTradingReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_TRADING:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_TRADING_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_TRADING_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_TRADING:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_TRADING_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_TRADING_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_TRADING_FLAG:
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

export default CreateTradingReducer;
