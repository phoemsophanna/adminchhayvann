import { RESET_CAREER_SHOW_DETAIL_FLAG, CAREER_SHOW_DETAIL, CAREER_SHOW_DETAIL_FAILED, CAREER_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchCareerDetail = (careerId) => {
	return {
		type: CAREER_SHOW_DETAIL,
		payload: { careerId },
	};
};

export const fetchCareerDetailSuccess = (career) => {
	return {
		type: CAREER_SHOW_DETAIL_SUCCESSFUL,
		payload: { career },
	};
};

export const fetchCareerDetailFail = (error) => {
	return {
		type: CAREER_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetCareerShowDetail = () => {
	return {
		type: RESET_CAREER_SHOW_DETAIL_FLAG,
	};
};
