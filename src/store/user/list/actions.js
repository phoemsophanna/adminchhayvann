import { REFRESH_USER_LIST_FLAG, RESET_USER_LIST_FLAG, USER_LIST, USER_LIST_FAILED, USER_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchUserList = () => {
	return {
		type: USER_LIST,
	};
};

export const fetchUserListSuccess = (users) => {
	return {
		type: USER_LIST_SUCCESSFUL,
		payload: { users },
	};
};

export const fetchUserListFail = (error) => {
	return {
		type: USER_LIST_FAILED,
		payload: { error },
	};
};

export const resetUserList = () => {
	return {
		type: RESET_USER_LIST_FLAG,
	};
};

export const refreshUserList = () => {
	return {
		type: REFRESH_USER_LIST_FLAG,
	};
};
