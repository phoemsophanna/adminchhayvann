import {
	CREATE_USER,
	CREATE_USER_FAILED,
	CREATE_USER_SUCCESSFUL,
	DELETE_USER,
	DELETE_USER_FAILED,
	DELETE_USER_SUCCESSFUL,
	RESET_CREATE_USER_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_USER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CREATE_USER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CREATE_USER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_USER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_USER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_USER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CREATE_USER_FLAG:
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

export default CreateUserReducer;
