import {
	SAVE_AWARD,
	SAVE_AWARD_FAILED,
	SAVE_AWARD_SUCCESSFUL,
	DELETE_AWARD,
	DELETE_AWARD_FAILED,
	DELETE_AWARD_SUCCESSFUL,
	RESET_SAVE_AWARD_FLAG,
} from "./actionTypes";

export const createAward = (award, history) => {
	return {
		type: SAVE_AWARD,
		payload: { award, history },
	};
};

export const createAwardSuccessful = (message) => {
	return {
		type: SAVE_AWARD_SUCCESSFUL,
		payload: { message },
	};
};

export const createAwardFailed = (error) => {
	return {
		type: SAVE_AWARD_FAILED,
		payload: { error },
	};
};

export const deleteAward = (awardId) => {
	return {
		type: DELETE_AWARD,
		payload: { awardId },
	};
};

export const deleteAwardSuccessful = (message) => {
	return {
		type: DELETE_AWARD_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteAwardFailed = (error) => {
	return {
		type: DELETE_AWARD_FAILED,
		payload: { error },
	};
};

export const resetCreateAwardFlag = () => {
	return {
		type: RESET_SAVE_AWARD_FLAG,
	};
};
