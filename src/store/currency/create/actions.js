import {
	SAVE_CURRENCY,
	SAVE_CURRENCY_FAILED,
	SAVE_CURRENCY_SUCCESSFUL,
	DELETE_CURRENCY,
	DELETE_CURRENCY_FAILED,
	DELETE_CURRENCY_SUCCESSFUL,
	RESET_SAVE_CURRENCY_FLAG,
} from "./actionTypes";

export const createCurrency = (currency, history) => {
	return {
		type: SAVE_CURRENCY,
		payload: { currency, history },
	};
};

export const createCurrencySuccessful = (message) => {
	return {
		type: SAVE_CURRENCY_SUCCESSFUL,
		payload: { message },
	};
};

export const createCurrencyFailed = (error) => {
	return {
		type: SAVE_CURRENCY_FAILED,
		payload: { error },
	};
};

export const deleteCurrency = (currencyId) => {
	return {
		type: DELETE_CURRENCY,
		payload: { currencyId },
	};
};

export const deleteCurrencySuccessful = (message) => {
	return {
		type: DELETE_CURRENCY_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteCurrencyFailed = (error) => {
	return {
		type: DELETE_CURRENCY_FAILED,
		payload: { error },
	};
};

export const resetCreateCurrencyFlag = () => {
	return {
		type: RESET_SAVE_CURRENCY_FLAG,
	};
};
