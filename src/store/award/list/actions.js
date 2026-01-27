import { REFRESH_AWARD_LIST_FLAG, RESET_AWARD_LIST_FLAG, AWARD_LIST, AWARD_LIST_FAILED, AWARD_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchAwardList = () => {
	return {
		type: AWARD_LIST,
	};
};

export const fetchAwardListSuccess = (awards) => {
	return {
		type: AWARD_LIST_SUCCESSFUL,
		payload: { awards },
	};
};

export const fetchAwardListFail = (error) => {
	return {
		type: AWARD_LIST_FAILED,
		payload: { error },
	};
};

export const resetAwardList = () => {
	return {
		type: RESET_AWARD_LIST_FLAG,
	};
};

export const refreshAwardList = () => {
	return {
		type: REFRESH_AWARD_LIST_FLAG,
	};
};
