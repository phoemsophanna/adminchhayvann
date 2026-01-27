import {
	REFRESH_CATEGORY_LIST_FLAG,
	RESET_CATEGORY_LIST_FLAG,
	CATEGORY_LIST,
	CATEGORY_LIST_FAILED,
	CATEGORY_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchCategoryList = (type) => {
	return {
		type: CATEGORY_LIST,
		payload: { type }
	};
};

export const fetchCategoryListSuccess = (categories) => {
	return {
		type: CATEGORY_LIST_SUCCESSFUL,
		payload: { categories },
	};
};

export const fetchCategoryListFail = (error) => {
	return {
		type: CATEGORY_LIST_FAILED,
		payload: { error },
	};
};

export const resetCategoryList = () => {
	return {
		type: RESET_CATEGORY_LIST_FLAG,
	};
};

export const refreshCategoryList = (type) => {
	return {
		type: REFRESH_CATEGORY_LIST_FLAG,
		payload: { type }
	};
};
