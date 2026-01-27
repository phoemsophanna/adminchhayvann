import {
	SAVE_PROJECT_CATEGORY,
	SAVE_PROJECT_CATEGORY_FAILED,
	SAVE_PROJECT_CATEGORY_SUCCESSFUL,
	DELETE_PROJECT_CATEGORY,
	DELETE_PROJECT_CATEGORY_FAILED,
	DELETE_PROJECT_CATEGORY_SUCCESSFUL,
	RESET_SAVE_PROJECT_CATEGORY_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateProjectCategoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_PROJECT_CATEGORY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_PROJECT_CATEGORY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_PROJECT_CATEGORY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_PROJECT_CATEGORY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_PROJECT_CATEGORY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_PROJECT_CATEGORY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_PROJECT_CATEGORY_FLAG:
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

export default CreateProjectCategoryReducer;
