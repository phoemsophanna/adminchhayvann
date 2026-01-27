import {
	SAVE_ROLE,
	SAVE_ROLE_FAILED,
	SAVE_ROLE_SUCCESSFUL,
	DELETE_ROLE,
	DELETE_ROLE_FAILED,
	DELETE_ROLE_SUCCESSFUL,
	RESET_SAVE_ROLE_FLAG,
} from "./actionTypes";

export const createRole = (role, history) => {
	return {
		type: SAVE_ROLE,
		payload: { role, history },
	};
};

export const createRoleSuccessful = (message) => {
	return {
		type: SAVE_ROLE_SUCCESSFUL,
		payload: { message },
	};
};

export const createRoleFailed = (error) => {
	return {
		type: SAVE_ROLE_FAILED,
		payload: { error },
	};
};

export const deleteRole = (roleId) => {
	return {
		type: DELETE_ROLE,
		payload: { roleId },
	};
};

export const deleteRoleSuccessful = (message) => {
	return {
		type: DELETE_ROLE_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteRoleFailed = (error) => {
	return {
		type: DELETE_ROLE_FAILED,
		payload: { error },
	};
};

export const resetCreateRoleFlag = () => {
	return {
		type: RESET_SAVE_ROLE_FLAG,
	};
};
