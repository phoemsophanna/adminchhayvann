import {
	SAVE_SERVICE,
	SAVE_SERVICE_FAILED,
	SAVE_SERVICE_SUCCESSFUL,
	DELETE_SERVICE,
	DELETE_SERVICE_FAILED,
	DELETE_SERVICE_SUCCESSFUL,
	RESET_SAVE_SERVICE_FLAG,
} from "./actionTypes";

export const createService = (service, history) => {
	return {
		type: SAVE_SERVICE,
		payload: { service, history },
	};
};

export const createServiceSuccessful = (message) => {
	return {
		type: SAVE_SERVICE_SUCCESSFUL,
		payload: { message },
	};
};

export const createServiceFailed = (error) => {
	return {
		type: SAVE_SERVICE_FAILED,
		payload: { error },
	};
};

export const deleteService = (serviceId) => {
	return {
		type: DELETE_SERVICE,
		payload: { serviceId },
	};
};

export const deleteServiceSuccessful = (message) => {
	return {
		type: DELETE_SERVICE_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteServiceFailed = (error) => {
	return {
		type: DELETE_SERVICE_FAILED,
		payload: { error },
	};
};

export const resetCreateServiceFlag = () => {
	return {
		type: RESET_SAVE_SERVICE_FLAG,
	};
};
