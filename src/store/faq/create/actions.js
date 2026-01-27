import {
	CREATE_FAQ,
	CREATE_FAQ_FAILED,
	CREATE_FAQ_SUCCESSFUL,
	DELETE_FAQ,
	DELETE_FAQ_FAILED,
	DELETE_FAQ_SUCCESSFUL,
	RESET_CREATE_FAQ_FLAG,
} from "./actionTypes";

export const createFaq = (faq) => {
	return {
		type: CREATE_FAQ,
		payload: { faq },
	};
};

export const createFaqSuccessful = (message) => {
	return {
		type: CREATE_FAQ_SUCCESSFUL,
		payload: { message },
	};
};

export const createFaqFailed = (error) => {
	return {
		type: CREATE_FAQ_FAILED,
		payload: { error },
	};
};

export const deleteFaq = (faqId) => {
	return {
		type: DELETE_FAQ,
		payload: { faqId },
	};
};

export const deleteFaqSuccessful = (message) => {
	return {
		type: DELETE_FAQ_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteFaqFailed = (error) => {
	return {
		type: DELETE_FAQ_FAILED,
		payload: { error },
	};
};

export const resetCreateFaqFlag = () => {
	return {
		type: RESET_CREATE_FAQ_FLAG,
	};
};
