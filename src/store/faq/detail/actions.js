import { RESET_FAQ_SHOW_DETAIL_FLAG, FAQ_SHOW_DETAIL, FAQ_SHOW_DETAIL_FAILED, FAQ_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchFaqDetail = (faqId) => {
	return {
		type: FAQ_SHOW_DETAIL,
		payload: { faqId },
	};
};

export const fetchFaqDetailSuccess = (faq) => {
	return {
		type: FAQ_SHOW_DETAIL_SUCCESSFUL,
		payload: { faq },
	};
};

export const fetchFaqDetailFail = (error) => {
	return {
		type: FAQ_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetFaqShowDetail = () => {
	return {
		type: RESET_FAQ_SHOW_DETAIL_FLAG,
	};
};
