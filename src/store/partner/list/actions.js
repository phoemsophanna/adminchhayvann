import {
	REFRESH_PARTNER_LIST_FLAG,
	RESET_PARTNER_LIST_FLAG,
	PARTNER_LIST,
	PARTNER_LIST_FAILED,
	PARTNER_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchPartnerList = () => {
	return {
		type: PARTNER_LIST,
	};
};

export const fetchPartnerListSuccess = (partners) => {
	return {
		type: PARTNER_LIST_SUCCESSFUL,
		payload: { partners },
	};
};

export const fetchPartnerListFail = (error) => {
	return {
		type: PARTNER_LIST_FAILED,
		payload: { error },
	};
};

export const resetPartnerList = () => {
	return {
		type: RESET_PARTNER_LIST_FLAG,
	};
};

export const refreshPartnerList = () => {
	return {
		type: REFRESH_PARTNER_LIST_FLAG,
	};
};
