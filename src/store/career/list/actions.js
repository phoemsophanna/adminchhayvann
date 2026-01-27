import { REFRESH_CAREER_LIST_FLAG, RESET_CAREER_LIST_FLAG, CAREER_LIST, CAREER_LIST_FAILED, CAREER_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchCareerList = () => {
	return {
		type: CAREER_LIST,
	};
};

export const fetchCareerListSuccess = (careers) => {
	return {
		type: CAREER_LIST_SUCCESSFUL,
		payload: { careers },
	};
};

export const fetchCareerListFail = (error) => {
	return {
		type: CAREER_LIST_FAILED,
		payload: { error },
	};
};

export const resetCareerList = () => {
	return {
		type: RESET_CAREER_LIST_FLAG,
	};
};

export const refreshCareerList = () => {
	return {
		type: REFRESH_CAREER_LIST_FLAG,
	};
};
