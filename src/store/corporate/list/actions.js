import { REFRESH_CORPORATE_LIST_FLAG, RESET_CORPORATE_LIST_FLAG, CORPORATE_LIST, CORPORATE_LIST_FAILED, CORPORATE_LIST_SUCCESSFUL, DELETE_CORPORATE, DELETE_CORPORATE_SUCCESSFUL, DELETE_CORPORATE_FAILED } from "./actionTypes";

export const fetchCorporateList = () => {
	return {
		type: CORPORATE_LIST,
	};
};

export const fetchCorporateListSuccess = (corporates) => {
	return {
		type: CORPORATE_LIST_SUCCESSFUL,
		payload: { corporates },
	};
};

export const fetchCorporateListFail = (error) => {
	return {
		type: CORPORATE_LIST_FAILED,
		payload: { error },
	};
};

export const resetCorporateList = () => {
	return {
		type: RESET_CORPORATE_LIST_FLAG,
	};
};

export const refreshCorporateList = () => {
	return {
		type: REFRESH_CORPORATE_LIST_FLAG,
	};
};

export const deleteCorporate = (corporateId) => {
	return {
		type: DELETE_CORPORATE,
		payload: { corporateId },
	};
};

export const deleteCorporateSuccessful = (message) => {
	return {
		type: DELETE_CORPORATE_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteCorporateFailed = (error) => {
	return {
		type: DELETE_CORPORATE_FAILED,
		payload: { error },
	};
};