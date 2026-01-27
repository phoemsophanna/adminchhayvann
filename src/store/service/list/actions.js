import { REFRESH_SERVICE_LIST_FLAG, RESET_SERVICE_LIST_FLAG, SERVICE_LIST, SERVICE_LIST_FAILED, SERVICE_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchServiceList = () => {
	return {
		type: SERVICE_LIST,
	};
};

export const fetchServiceListSuccess = (services) => {
	return {
		type: SERVICE_LIST_SUCCESSFUL,
		payload: { services },
	};
};

export const fetchServiceListFail = (error) => {
	return {
		type: SERVICE_LIST_FAILED,
		payload: { error },
	};
};

export const resetServiceList = () => {
	return {
		type: RESET_SERVICE_LIST_FLAG,
	};
};

export const refreshServiceList = () => {
	return {
		type: REFRESH_SERVICE_LIST_FLAG,
	};
};
