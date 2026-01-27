import {
	SAVE_ROLE,
	SAVE_ROLE_FAILED,
	SAVE_ROLE_SUCCESSFUL,
	DELETE_ROLE,
	DELETE_ROLE_FAILED,
	DELETE_ROLE_SUCCESSFUL,
	RESET_SAVE_ROLE_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateRoleReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_ROLE:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_ROLE_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_ROLE_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_ROLE:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_ROLE_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_ROLE_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_ROLE_FLAG:
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

export default CreateRoleReducer;
