import {
	CREATE_CATEGORY,
	CREATE_CATEGORY_FAILED,
	CREATE_CATEGORY_SUCCESSFUL,
	DELETE_CATEGORY,
	DELETE_CATEGORY_FAILED,
	DELETE_CATEGORY_SUCCESSFUL,
	RESET_CREATE_CATEGORY_FLAG,
} from "./actionTypes";

export const createCategory = (category) => {
	return {
		type: CREATE_CATEGORY,
		payload: { category },
	};
};

export const createCategorySuccessful = (message) => {
	return {
		type: CREATE_CATEGORY_SUCCESSFUL,
		payload: { message },
	};
};

export const createCategoryFailed = (error) => {
	return {
		type: CREATE_CATEGORY_FAILED,
		payload: { error },
	};
};

export const deleteCategory = (categoryId) => {
	return {
		type: DELETE_CATEGORY,
		payload: { categoryId },
	};
};

export const deleteCategorySuccessful = (message) => {
	return {
		type: DELETE_CATEGORY_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteCategoryFailed = (error) => {
	return {
		type: DELETE_CATEGORY_FAILED,
		payload: { error },
	};
};

export const resetCreateCategoryFlag = () => {
	return {
		type: RESET_CREATE_CATEGORY_FLAG,
	};
};
