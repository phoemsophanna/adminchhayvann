import { RESET_AWARD_SHOW_DETAIL_FLAG, AWARD_SHOW_DETAIL, AWARD_SHOW_DETAIL_FAILED, AWARD_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchAwardDetail = (awardId) => {
	return {
		type: AWARD_SHOW_DETAIL,
		payload: { awardId },
	};
};

export const fetchAwardDetailSuccess = (award) => {
	return {
		type: AWARD_SHOW_DETAIL_SUCCESSFUL,
		payload: { award },
	};
};

export const fetchAwardDetailFail = (error) => {
	return {
		type: AWARD_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetAwardShowDetail = () => {
	return {
		type: RESET_AWARD_SHOW_DETAIL_FLAG,
	};
};
