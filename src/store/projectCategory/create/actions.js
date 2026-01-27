import {
	SAVE_PROJECT_CATEGORY,
	SAVE_PROJECT_CATEGORY_FAILED,
	SAVE_PROJECT_CATEGORY_SUCCESSFUL,
	DELETE_PROJECT_CATEGORY,
	DELETE_PROJECT_CATEGORY_FAILED,
	DELETE_PROJECT_CATEGORY_SUCCESSFUL,
	RESET_SAVE_PROJECT_CATEGORY_FLAG,
} from "./actionTypes";

export const createProjectCategory = (projectCategory) => {
	return {
		type: SAVE_PROJECT_CATEGORY,
		payload: { projectCategory },
	};
};

export const createProjectCategorySuccessful = (message) => {
	return {
		type: SAVE_PROJECT_CATEGORY_SUCCESSFUL,
		payload: { message },
	};
};

export const createProjectCategoryFailed = (error) => {
	return {
		type: SAVE_PROJECT_CATEGORY_FAILED,
		payload: { error },
	};
};

export const deleteProjectCategory = (projectCategoryId) => {
	return {
		type: DELETE_PROJECT_CATEGORY,
		payload: { projectCategoryId },
	};
};

export const deleteProjectCategorySuccessful = (message) => {
	return {
		type: DELETE_PROJECT_CATEGORY_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteProjectCategoryFailed = (error) => {
	return {
		type: DELETE_PROJECT_CATEGORY_FAILED,
		payload: { error },
	};
};

export const resetCreateProjectCategoryFlag = () => {
	return {
		type: RESET_SAVE_PROJECT_CATEGORY_FLAG,
	};
};
