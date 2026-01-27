import {
	RESET_PROJECT_CATEGORY_SHOW_DETAIL_FLAG,
	PROJECT_CATEGORY_SHOW_DETAIL,
	PROJECT_CATEGORY_SHOW_DETAIL_FAILED,
	PROJECT_CATEGORY_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchProjectCategoryDetail = (projectCategoryId) => {
	return {
		type: PROJECT_CATEGORY_SHOW_DETAIL,
		payload: { projectCategoryId },
	};
};

export const fetchProjectCategoryDetailSuccess = (projectCategory) => {
	return {
		type: PROJECT_CATEGORY_SHOW_DETAIL_SUCCESSFUL,
		payload: { projectCategory },
	};
};

export const fetchProjectCategoryDetailFail = (error) => {
	return {
		type: PROJECT_CATEGORY_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetProjectCategoryShowDetail = () => {
	return {
		type: RESET_PROJECT_CATEGORY_SHOW_DETAIL_FLAG,
	};
};
