import {
	SAVE_SERVICE,
	SAVE_SERVICE_FAILED,
	SAVE_SERVICE_SUCCESSFUL,
	DELETE_SERVICE,
	DELETE_SERVICE_FAILED,
	DELETE_SERVICE_SUCCESSFUL,
	RESET_SAVE_SERVICE_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateServiceReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_SERVICE:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_SERVICE_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_SERVICE_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_SERVICE:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_SERVICE_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_SERVICE_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_SERVICE_FLAG:
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

export default CreateServiceReducer;
