import { REFRESH_APPLICATION_LIST_FLAG, RESET_APPLICATION_LIST_FLAG, APPLICATION_LIST, APPLICATION_LIST_FAILED, APPLICATION_LIST_SUCCESSFUL, DELETE_APPLICATION, DELETE_APPLICATION_SUCCESSFUL, DELETE_APPLICATION_FAILED } from "./actionTypes";

export const fetchApplicationList = () => {
	return {
		type: APPLICATION_LIST,
	};
};

export const fetchApplicationListSuccess = (applications) => {
	return {
		type: APPLICATION_LIST_SUCCESSFUL,
		payload: { applications },
	};
};

export const fetchApplicationListFail = (error) => {
	return {
		type: APPLICATION_LIST_FAILED,
		payload: { error },
	};
};

export const resetApplicationList = () => {
	return {
		type: RESET_APPLICATION_LIST_FLAG,
	};
};

export const refreshApplicationList = () => {
	return {
		type: REFRESH_APPLICATION_LIST_FLAG,
	};
};

export const deleteApplication = (applicationId) => {
	return {
		type: DELETE_APPLICATION,
		payload: { applicationId },
	};
};

export const deleteApplicationSuccessful = (message) => {
	return {
		type: DELETE_APPLICATION_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteApplicationFailed = (error) => {
	return {
		type: DELETE_APPLICATION_FAILED,
		payload: { error },
	};
};