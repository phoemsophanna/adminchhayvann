import { REFRESH_CURRENCY_LIST_FLAG, RESET_CURRENCY_LIST_FLAG, CURRENCY_LIST, CURRENCY_LIST_FAILED, CURRENCY_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchCurrencyList = () => {
	return {
		type: CURRENCY_LIST,
	};
};

export const fetchCurrencyListSuccess = (currencies) => {
	return {
		type: CURRENCY_LIST_SUCCESSFUL,
		payload: { currencies },
	};
};

export const fetchCurrencyListFail = (error) => {
	return {
		type: CURRENCY_LIST_FAILED,
		payload: { error },
	};
};

export const resetCurrencyList = () => {
	return {
		type: RESET_CURRENCY_LIST_FLAG,
	};
};

export const refreshCurrencyList = () => {
	return {
		type: REFRESH_CURRENCY_LIST_FLAG,
	};
};
