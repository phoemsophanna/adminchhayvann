import { REFRESH_INDIVIDUAL_LIST_FLAG, RESET_INDIVIDUAL_LIST_FLAG, INDIVIDUAL_LIST, INDIVIDUAL_LIST_FAILED, INDIVIDUAL_LIST_SUCCESSFUL, DELETE_INDIVIDUAL, DELETE_INDIVIDUAL_SUCCESSFUL, DELETE_INDIVIDUAL_FAILED } from "./actionTypes";

export const fetchIndividualList = () => {
	return {
		type: INDIVIDUAL_LIST,
	};
};

export const fetchIndividualListSuccess = (individuals) => {
	return {
		type: INDIVIDUAL_LIST_SUCCESSFUL,
		payload: { individuals },
	};
};

export const fetchIndividualListFail = (error) => {
	return {
		type: INDIVIDUAL_LIST_FAILED,
		payload: { error },
	};
};

export const resetIndividualList = () => {
	return {
		type: RESET_INDIVIDUAL_LIST_FLAG,
	};
};

export const refreshIndividualList = () => {
	return {
		type: REFRESH_INDIVIDUAL_LIST_FLAG,
	};
};

export const deleteIndividual = (individualId) => {
	return {
		type: DELETE_INDIVIDUAL,
		payload: { individualId },
	};
};

export const deleteIndividualSuccessful = (message) => {
	return {
		type: DELETE_INDIVIDUAL_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteIndividualFailed = (error) => {
	return {
		type: DELETE_INDIVIDUAL_FAILED,
		payload: { error },
	};
};