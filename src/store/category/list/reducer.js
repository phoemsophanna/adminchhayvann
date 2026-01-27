import {
	REFRESH_CATEGORY_LIST_FLAG,
	RESET_CATEGORY_LIST_FLAG,
	CATEGORY_LIST,
	CATEGORY_LIST_FAILED,
	CATEGORY_LIST_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	categories: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CategoryListReducer = (state = initialState, action) => {
	switch (action.type) {
		case CATEGORY_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CATEGORY_LIST_SUCCESSFUL:
			state = {
				...state,
				categories: action.payload.categories,
				message: "Fetch testimonial successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CATEGORY_LIST_FAILED:
			state = {
				...state,
				categories: [],
				message: "Fetch testimonial failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CATEGORY_LIST_FLAG:
			state = {
				...state,
				categories: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_CATEGORY_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				categories: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default CategoryListReducer;
