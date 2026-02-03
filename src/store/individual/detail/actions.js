import { RESET_INDIVIDUAL_SHOW_DETAIL_FLAG, INDIVIDUAL_SHOW_DETAIL, INDIVIDUAL_SHOW_DETAIL_FAILED, INDIVIDUAL_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchIndividualDetail = (individualId) => {
	return {
		type: INDIVIDUAL_SHOW_DETAIL,
		payload: { individualId },
	};
};

export const fetchIndividualDetailSuccess = (individual) => {
	return {
		type: INDIVIDUAL_SHOW_DETAIL_SUCCESSFUL,
		payload: { individual },
	};
};

export const fetchIndividualDetailFail = (error) => {
	return {
		type: INDIVIDUAL_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetIndividualShowDetail = () => {
	return {
		type: RESET_INDIVIDUAL_SHOW_DETAIL_FLAG,
	};
};
