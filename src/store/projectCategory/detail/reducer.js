import {
	RESET_PROJECT_CATEGORY_SHOW_DETAIL_FLAG,
	PROJECT_CATEGORY_SHOW_DETAIL,
	PROJECT_CATEGORY_SHOW_DETAIL_FAILED,
	PROJECT_CATEGORY_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	projectCategory: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ProjectCategoryDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROJECT_CATEGORY_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PROJECT_CATEGORY_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				projectCategory: action.payload.projectCategory,
				message: "Fetch projectCategory successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PROJECT_CATEGORY_SHOW_DETAIL_FAILED:
			state = {
				...state,
				projectCategory: null,
				message: "Fetch projectCategory failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PROJECT_CATEGORY_SHOW_DETAIL_FLAG:
			state = {
				...state,
				projectCategory: null,
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

export default ProjectCategoryDetailReducer;
