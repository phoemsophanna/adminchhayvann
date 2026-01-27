import { RESET_NEWS_SHOW_DETAIL_FLAG, NEWS_SHOW_DETAIL, NEWS_SHOW_DETAIL_FAILED, NEWS_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchNewsDetail = (newsId) => {
	return {
		type: NEWS_SHOW_DETAIL,
		payload: { newsId },
	};
};

export const fetchNewsDetailSuccess = (news) => {
	return {
		type: NEWS_SHOW_DETAIL_SUCCESSFUL,
		payload: { news },
	};
};

export const fetchNewsDetailFail = (error) => {
	return {
		type: NEWS_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetNewsShowDetail = () => {
	return {
		type: RESET_NEWS_SHOW_DETAIL_FLAG,
	};
};
