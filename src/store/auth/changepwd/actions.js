import { CHANGE_PWD_USER, CHANGE_PWD_USER_SUCCESSFUL, CHANGE_PWD_USER_FAILED, RESET_CHANGE_PWD_FLAG, CHANGE_PWD_USER_SUCCESSFUL_REDIRECT } from "./actionTypes";

export const changePwdUser = (user, history) => {
	return {
		type: CHANGE_PWD_USER,
		payload: { user, history },
	};
};

export const changePwdUserSuccessful = () => {
	return {
		type: CHANGE_PWD_USER_SUCCESSFUL,
		payload: {},
	};
};

export const changePwdUserSuccessfulRedirect = () => {
	return {
		type: CHANGE_PWD_USER_SUCCESSFUL_REDIRECT,
	};
};

export const changePwdUserFailed = (error) => {
	return {
		type: CHANGE_PWD_USER_FAILED,
		payload: { error },
	};
};

export const resetChangePwdUserFlag = () => {
	return {
		type: RESET_CHANGE_PWD_FLAG,
	};
};
