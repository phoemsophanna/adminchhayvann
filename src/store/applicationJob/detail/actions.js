import { RESET_APPLICATION_SHOW_DETAIL_FLAG, APPLICATION_SHOW_DETAIL, APPLICATION_SHOW_DETAIL_FAILED, APPLICATION_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchApplicationDetail = (applicationId) => {
	return {
		type: APPLICATION_SHOW_DETAIL,
		payload: { applicationId },
	};
};

export const fetchApplicationDetailSuccess = (application) => {
	return {
		type: APPLICATION_SHOW_DETAIL_SUCCESSFUL,
		payload: { application },
	};
};

export const fetchApplicationDetailFail = (error) => {
	return {
		type: APPLICATION_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetApplicationShowDetail = () => {
	return {
		type: RESET_APPLICATION_SHOW_DETAIL_FLAG,
	};
};
