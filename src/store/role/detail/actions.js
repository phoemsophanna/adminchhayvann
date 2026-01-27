import { RESET_ROLE_SHOW_DETAIL_FLAG, ROLE_SHOW_DETAIL, ROLE_SHOW_DETAIL_FAILED, ROLE_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchRoleDetail = (roleId) => {
	return {
		type: ROLE_SHOW_DETAIL,
		payload: { roleId },
	};
};

export const fetchRoleDetailSuccess = (role) => {
	return {
		type: ROLE_SHOW_DETAIL_SUCCESSFUL,
		payload: { role },
	};
};

export const fetchRoleDetailFail = (error) => {
	return {
		type: ROLE_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetRoleShowDetail = () => {
	return {
		type: RESET_ROLE_SHOW_DETAIL_FLAG,
	};
};
