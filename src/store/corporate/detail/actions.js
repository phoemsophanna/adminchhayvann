import { RESET_CORPORATE_SHOW_DETAIL_FLAG, CORPORATE_SHOW_DETAIL, CORPORATE_SHOW_DETAIL_FAILED, CORPORATE_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchCorporateDetail = (corporateId) => {
	return {
		type: CORPORATE_SHOW_DETAIL,
		payload: { corporateId },
	};
};

export const fetchCorporateDetailSuccess = (corporate) => {
	return {
		type: CORPORATE_SHOW_DETAIL_SUCCESSFUL,
		payload: { corporate },
	};
};

export const fetchCorporateDetailFail = (error) => {
	return {
		type: CORPORATE_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetCorporateShowDetail = () => {
	return {
		type: RESET_CORPORATE_SHOW_DETAIL_FLAG,
	};
};
