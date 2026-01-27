import {
	CREATE_CATEGORY,
	CREATE_CATEGORY_FAILED,
	CREATE_CATEGORY_SUCCESSFUL,
	DELETE_CATEGORY,
	DELETE_CATEGORY_FAILED,
	DELETE_CATEGORY_SUCCESSFUL,
	RESET_CREATE_CATEGORY_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateCategoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_CATEGORY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CREATE_CATEGORY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CREATE_CATEGORY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_CATEGORY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_CATEGORY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_CATEGORY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CREATE_CATEGORY_FLAG:
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

export default CreateCategoryReducer;
