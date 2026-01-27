import { RESET_EXCHANGE_SHOW_DETAIL_FLAG, EXCHANGE_SHOW_DETAIL, EXCHANGE_SHOW_DETAIL_FAILED, EXCHANGE_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchExchangeDetail = (exchangeId) => {
	return {
		type: EXCHANGE_SHOW_DETAIL,
		payload: { exchangeId },
	};
};

export const fetchExchangeDetailSuccess = (exchange) => {
	return {
		type: EXCHANGE_SHOW_DETAIL_SUCCESSFUL,
		payload: { exchange },
	};
};

export const fetchExchangeDetailFail = (error) => {
	return {
		type: EXCHANGE_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetExchangeShowDetail = () => {
	return {
		type: RESET_EXCHANGE_SHOW_DETAIL_FLAG,
	};
};
