import {
	REFRESH_PROJECT_CATEGORY_LIST_FLAG,
	RESET_PROJECT_CATEGORY_LIST_FLAG,
	PROJECT_CATEGORY_LIST,
	PROJECT_CATEGORY_LIST_FAILED,
	PROJECT_CATEGORY_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchProjectCategoryList = () => {
	return {
		type: PROJECT_CATEGORY_LIST,
	};
};

export const fetchProjectCategoryListSuccess = (projectCategories) => {
	return {
		type: PROJECT_CATEGORY_LIST_SUCCESSFUL,
		payload: { projectCategories },
	};
};

export const fetchProjectCategoryListFail = (error) => {
	return {
		type: PROJECT_CATEGORY_LIST_FAILED,
		payload: { error },
	};
};

export const resetProjectCategoryList = () => {
	return {
		type: RESET_PROJECT_CATEGORY_LIST_FLAG,
	};
};

export const refreshProjectCategoryList = () => {
	return {
		type: REFRESH_PROJECT_CATEGORY_LIST_FLAG,
	};
};
