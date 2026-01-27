import { REFRESH_EXCHANGE_LIST_FLAG, RESET_EXCHANGE_LIST_FLAG, EXCHANGE_LIST, EXCHANGE_LIST_FAILED, EXCHANGE_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchExchangeList = () => {
	return {
		type: EXCHANGE_LIST,
	};
};

export const fetchExchangeListSuccess = (exchanges) => {
	return {
		type: EXCHANGE_LIST_SUCCESSFUL,
		payload: { exchanges },
	};
};

export const fetchExchangeListFail = (error) => {
	return {
		type: EXCHANGE_LIST_FAILED,
		payload: { error },
	};
};

export const resetExchangeList = () => {
	return {
		type: RESET_EXCHANGE_LIST_FLAG,
	};
};

export const refreshExchangeList = () => {
	return {
		type: REFRESH_EXCHANGE_LIST_FLAG,
	};
};
