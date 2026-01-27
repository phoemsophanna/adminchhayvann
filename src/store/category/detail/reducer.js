import {
	RESET_CATEGORY_SHOW_DETAIL_FLAG,
	CATEGORY_SHOW_DETAIL,
	CATEGORY_SHOW_DETAIL_FAILED,
	CATEGORY_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	category: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CategoryDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case CATEGORY_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CATEGORY_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				category: action.payload.category,
				message: "Fetch category successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CATEGORY_SHOW_DETAIL_FAILED:
			state = {
				...state,
				category: null,
				message: "Fetch category failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CATEGORY_SHOW_DETAIL_FLAG:
			state = {
				...state,
				category: null,
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

export default CategoryDetailReducer;
