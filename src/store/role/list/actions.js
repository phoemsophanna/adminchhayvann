import { REFRESH_ROLE_LIST_FLAG, RESET_ROLE_LIST_FLAG, ROLE_LIST, ROLE_LIST_FAILED, ROLE_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchRoleList = () => {
	return {
		type: ROLE_LIST,
	};
};

export const fetchRoleListSuccess = (roles) => {
	return {
		type: ROLE_LIST_SUCCESSFUL,
		payload: { roles },
	};
};

export const fetchRoleListFail = (error) => {
	return {
		type: ROLE_LIST_FAILED,
		payload: { error },
	};
};

export const resetRoleList = () => {
	return {
		type: RESET_ROLE_LIST_FLAG,
	};
};

export const refreshRoleList = () => {
	return {
		type: REFRESH_ROLE_LIST_FLAG,
	};
};
