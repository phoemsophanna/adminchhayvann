import {
	LOGIN_USER,
	LOGIN_SUCCESS,
	LOGOUT_USER,
	LOGOUT_USER_SUCCESS,
	API_ERROR,
	SOCIAL_LOGIN,
	RESET_LOGIN_FLAG,
	LOGIN_ACCOUNT,
	USER_DETAIL,
	USER_DETAIL_SUCCESS,
	UPDATE_USER,
	UPDATE_USER_SUCCESSFUL,
	UPDATE_USER_FAILED,
	RESET_UPDATE_USER_FLAG,
} from "./actionTypes";

export const loginUser = (user, history) => {
	return {
		type: LOGIN_USER,
		payload: { user, history },
	};
};

export const loginAccount = (user, history) => {
	return {
		type: LOGIN_ACCOUNT,
		payload: { user, history },
	};
};

export const loginSuccess = (user) => {
	return {
		type: LOGIN_SUCCESS,
		payload: user,
	};
};

export const userDetail = () => {
	return {
		type: USER_DETAIL,
	};
};

export const userDetailSuccess = (user) => {
	return {
		type: USER_DETAIL_SUCCESS,
		payload: user,
	};
};

export const logoutUser = (history) => {
	return {
		type: LOGOUT_USER,
		payload: { history },
	};
};

export const logoutUserSuccess = () => {
	return {
		type: LOGOUT_USER_SUCCESS,
		payload: {},
	};
};

export const apiError = (error) => {
	return {
		type: API_ERROR,
		payload: error,
	};
};

export const socialLogin = (type, history) => {
	return {
		type: SOCIAL_LOGIN,
		payload: { type, history },
	};
};

export const resetLoginFlag = () => {
	return {
		type: RESET_LOGIN_FLAG,
	};
};

// Update User
export const updateUser = (user, history) => {
	return {
		type: UPDATE_USER,
		payload: { user, history },
	};
};

export const updateUserSuccessful = (user) => {
	return {
		type: UPDATE_USER_SUCCESSFUL,
		payload: user,
	};
};

export const updateUserFailed = (error) => {
	return {
		type: UPDATE_USER_FAILED,
		payload: error,
	};
};

export const resetUpdateUserFlag = () => {
	return {
		type: RESET_UPDATE_USER_FLAG,
	};
};
