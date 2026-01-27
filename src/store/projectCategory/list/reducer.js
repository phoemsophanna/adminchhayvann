import {
	REFRESH_PROJECT_CATEGORY_LIST_FLAG,
	RESET_PROJECT_CATEGORY_LIST_FLAG,
	PROJECT_CATEGORY_LIST,
	PROJECT_CATEGORY_LIST_FAILED,
	PROJECT_CATEGORY_LIST_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	projectCategories: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ProjectCategoryListReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROJECT_CATEGORY_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PROJECT_CATEGORY_LIST_SUCCESSFUL:
			state = {
				...state,
				projectCategories: action.payload.projectCategories,
				message: "Fetch projectCategory successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PROJECT_CATEGORY_LIST_FAILED:
			state = {
				...state,
				projectCategories: [],
				message: "Fetch projectCategory failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PROJECT_CATEGORY_LIST_FLAG:
			state = {
				...state,
				projectCategories: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_PROJECT_CATEGORY_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				projectCategories: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default ProjectCategoryListReducer;
