import {
	CREATE_CAREER,
	CREATE_CAREER_FAILED,
	CREATE_CAREER_SUCCESSFUL,
	DELETE_CAREER,
	DELETE_CAREER_FAILED,
	DELETE_CAREER_SUCCESSFUL,
	RESET_CREATE_CAREER_FLAG,
} from "./actionTypes";

export const createCareer = (career, history) => {
	return {
		type: CREATE_CAREER,
		payload: { career, history },
	};
};

export const createCareerSuccessful = (message) => {
	return {
		type: CREATE_CAREER_SUCCESSFUL,
		payload: { message },
	};
};

export const createCareerFailed = (error) => {
	return {
		type: CREATE_CAREER_FAILED,
		payload: { error },
	};
};

export const deleteCareer = (careerId) => {
	return {
		type: DELETE_CAREER,
		payload: { careerId },
	};
};

export const deleteCareerSuccessful = (message) => {
	return {
		type: DELETE_CAREER_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteCareerFailed = (error) => {
	return {
		type: DELETE_CAREER_FAILED,
		payload: { error },
	};
};

export const resetCreateCareerFlag = () => {
	return {
		type: RESET_CREATE_CAREER_FLAG,
	};
};
