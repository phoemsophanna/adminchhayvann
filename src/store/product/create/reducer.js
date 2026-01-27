import {
	SAVE_PRODUCT,
	SAVE_PRODUCT_FAILED,
	SAVE_PRODUCT_SUCCESSFUL,
	DELETE_PRODUCT,
	DELETE_PRODUCT_FAILED,
	DELETE_PRODUCT_SUCCESSFUL,
	RESET_SAVE_PRODUCT_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateProductReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_PRODUCT:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_PRODUCT_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_PRODUCT_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_PRODUCT:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_PRODUCT_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_PRODUCT_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_PRODUCT_FLAG:
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

export default CreateProductReducer;
