import {
	RESET_PARTNER_SHOW_DETAIL_FLAG,
	PARTNER_SHOW_DETAIL,
	PARTNER_SHOW_DETAIL_FAILED,
	PARTNER_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchPartnerDetail = (partnerId) => {
	return {
		type: PARTNER_SHOW_DETAIL,
		payload: { partnerId },
	};
};

export const fetchPartnerDetailSuccess = (partner) => {
	return {
		type: PARTNER_SHOW_DETAIL_SUCCESSFUL,
		payload: { partner },
	};
};

export const fetchPartnerDetailFail = (error) => {
	return {
		type: PARTNER_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetPartnerShowDetail = () => {
	return {
		type: RESET_PARTNER_SHOW_DETAIL_FLAG,
	};
};
