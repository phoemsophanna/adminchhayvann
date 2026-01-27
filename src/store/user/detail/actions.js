import { RESET_USER_SHOW_DETAIL_FLAG, USER_SHOW_DETAIL, USER_SHOW_DETAIL_FAILED, USER_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchUserDetail = (userId) => {
	return {
		type: USER_SHOW_DETAIL,
		payload: { userId },
	};
};

export const fetchUserDetailSuccess = (user) => {
	return {
		type: USER_SHOW_DETAIL_SUCCESSFUL,
		payload: { user },
	};
};

export const fetchUserDetailFail = (error) => {
	return {
		type: USER_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetUserShowDetail = () => {
	return {
		type: RESET_USER_SHOW_DETAIL_FLAG,
	};
};
