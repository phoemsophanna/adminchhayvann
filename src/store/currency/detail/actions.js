import { RESET_CURRENCY_SHOW_DETAIL_FLAG, CURRENCY_SHOW_DETAIL, CURRENCY_SHOW_DETAIL_FAILED, CURRENCY_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchCurrencyDetail = (currencyId) => {
	return {
		type: CURRENCY_SHOW_DETAIL,
		payload: { currencyId },
	};
};

export const fetchCurrencyDetailSuccess = (currency) => {
	return {
		type: CURRENCY_SHOW_DETAIL_SUCCESSFUL,
		payload: { currency },
	};
};

export const fetchCurrencyDetailFail = (error) => {
	return {
		type: CURRENCY_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetCurrencyShowDetail = () => {
	return {
		type: RESET_CURRENCY_SHOW_DETAIL_FLAG,
	};
};
