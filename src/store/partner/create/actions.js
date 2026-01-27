import {
	SAVE_PARTNER,
	SAVE_PARTNER_FAILED,
	SAVE_PARTNER_SUCCESSFUL,
	DELETE_PARTNER,
	DELETE_PARTNER_FAILED,
	DELETE_PARTNER_SUCCESSFUL,
	RESET_SAVE_PARTNER_FLAG,
} from "./actionTypes";

export const createPartner = (partner) => {
	return {
		type: SAVE_PARTNER,
		payload: { partner },
	};
};

export const createPartnerSuccessful = (message) => {
	return {
		type: SAVE_PARTNER_SUCCESSFUL,
		payload: { message },
	};
};

export const createPartnerFailed = (error) => {
	return {
		type: SAVE_PARTNER_FAILED,
		payload: { error },
	};
};

export const deletePartner = (partnerId) => {
	return {
		type: DELETE_PARTNER,
		payload: { partnerId },
	};
};

export const deletePartnerSuccessful = (message) => {
	return {
		type: DELETE_PARTNER_SUCCESSFUL,
		payload: { message },
	};
};

export const deletePartnerFailed = (error) => {
	return {
		type: DELETE_PARTNER_FAILED,
		payload: { error },
	};
};

export const resetCreatePartnerFlag = () => {
	return {
		type: RESET_SAVE_PARTNER_FLAG,
	};
};
