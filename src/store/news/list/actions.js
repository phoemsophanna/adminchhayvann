import { REFRESH_NEWS_LIST_FLAG, RESET_NEWS_LIST_FLAG, NEWS_LIST, NEWS_LIST_FAILED, NEWS_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchNewsList = () => {
	return {
		type: NEWS_LIST,
	};
};

export const fetchNewsListSuccess = (newsList) => {
	return {
		type: NEWS_LIST_SUCCESSFUL,
		payload: { newsList },
	};
};

export const fetchNewsListFail = (error) => {
	return {
		type: NEWS_LIST_FAILED,
		payload: { error },
	};
};

export const resetNewsList = () => {
	return {
		type: RESET_NEWS_LIST_FLAG,
	};
};

export const refreshNewsList = () => {
	return {
		type: REFRESH_NEWS_LIST_FLAG,
	};
};
