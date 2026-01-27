import {
	SAVE_NEWS,
	SAVE_NEWS_FAILED,
	SAVE_NEWS_SUCCESSFUL,
	DELETE_NEWS,
	DELETE_NEWS_FAILED,
	DELETE_NEWS_SUCCESSFUL,
	RESET_SAVE_NEWS_FLAG,
} from "./actionTypes";

export const createNews = (news, history) => {
	return {
		type: SAVE_NEWS,
		payload: { news, history },
	};
};

export const createNewsSuccessful = (message) => {
	return {
		type: SAVE_NEWS_SUCCESSFUL,
		payload: { message },
	};
};

export const createNewsFailed = (error) => {
	return {
		type: SAVE_NEWS_FAILED,
		payload: { error },
	};
};

export const deleteNews = (newsId) => {
	return {
		type: DELETE_NEWS,
		payload: { newsId },
	};
};

export const deleteNewsSuccessful = (message) => {
	return {
		type: DELETE_NEWS_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteNewsFailed = (error) => {
	return {
		type: DELETE_NEWS_FAILED,
		payload: { error },
	};
};

export const resetCreateNewsFlag = () => {
	return {
		type: RESET_SAVE_NEWS_FLAG,
	};
};
