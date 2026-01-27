import {
	RESET_CATEGORY_SHOW_DETAIL_FLAG,
	CATEGORY_SHOW_DETAIL,
	CATEGORY_SHOW_DETAIL_FAILED,
	CATEGORY_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchCategoryDetail = (categoryId) => {
	return {
		type: CATEGORY_SHOW_DETAIL,
		payload: { categoryId },
	};
};

export const fetchCategoryDetailSuccess = (category) => {
	return {
		type: CATEGORY_SHOW_DETAIL_SUCCESSFUL,
		payload: { category },
	};
};

export const fetchCategoryDetailFail = (error) => {
	return {
		type: CATEGORY_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetCategoryShowDetail = () => {
	return {
		type: RESET_CATEGORY_SHOW_DETAIL_FLAG,
	};
};
