import { RESET_SERVICE_SHOW_DETAIL_FLAG, SERVICE_SHOW_DETAIL, SERVICE_SHOW_DETAIL_FAILED, SERVICE_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchServiceDetail = (serviceId) => {
	return {
		type: SERVICE_SHOW_DETAIL,
		payload: { serviceId },
	};
};

export const fetchServiceDetailSuccess = (service) => {
	return {
		type: SERVICE_SHOW_DETAIL_SUCCESSFUL,
		payload: { service },
	};
};

export const fetchServiceDetailFail = (error) => {
	return {
		type: SERVICE_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetServiceShowDetail = () => {
	return {
		type: RESET_SERVICE_SHOW_DETAIL_FLAG,
	};
};
