import {
	CREATE_USER,
	CREATE_USER_FAILED,
	CREATE_USER_SUCCESSFUL,
	DELETE_USER,
	DELETE_USER_FAILED,
	DELETE_USER_SUCCESSFUL,
	RESET_CREATE_USER_FLAG,
} from "./actionTypes";

export const createUser = (user) => {
	return {
		type: CREATE_USER,
		payload: { user },
	};
};

export const createUserSuccessful = (message) => {
	return {
		type: CREATE_USER_SUCCESSFUL,
		payload: { message },
	};
};

export const createUserFailed = (error) => {
	return {
		type: CREATE_USER_FAILED,
		payload: { error },
	};
};

export const deleteUser = (userId) => {
	return {
		type: DELETE_USER,
		payload: { userId },
	};
};

export const deleteUserSuccessful = (message) => {
	return {
		type: DELETE_USER_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteUserFailed = (error) => {
	return {
		type: DELETE_USER_FAILED,
		payload: { error },
	};
};

export const resetCreateUserFlag = () => {
	return {
		type: RESET_CREATE_USER_FLAG,
	};
};
