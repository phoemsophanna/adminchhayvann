import { REFRESH_FAQ_LIST_FLAG, RESET_FAQ_LIST_FLAG, FAQ_LIST, FAQ_LIST_FAILED, FAQ_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchFaqList = () => {
	return {
		type: FAQ_LIST,
	};
};

export const fetchFaqListSuccess = (faqs) => {
	return {
		type: FAQ_LIST_SUCCESSFUL,
		payload: { faqs },
	};
};

export const fetchFaqListFail = (error) => {
	return {
		type: FAQ_LIST_FAILED,
		payload: { error },
	};
};

export const resetFaqList = () => {
	return {
		type: RESET_FAQ_LIST_FLAG,
	};
};

export const refreshFaqList = () => {
	return {
		type: REFRESH_FAQ_LIST_FLAG,
	};
};
