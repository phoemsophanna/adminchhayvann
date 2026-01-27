import { RESET_TRADING_SHOW_DETAIL_FLAG, TRADING_SHOW_DETAIL, TRADING_SHOW_DETAIL_FAILED, TRADING_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchTradingDetail = (tradingId) => {
	return {
		type: TRADING_SHOW_DETAIL,
		payload: { tradingId },
	};
};

export const fetchTradingDetailSuccess = (trading) => {
	return {
		type: TRADING_SHOW_DETAIL_SUCCESSFUL,
		payload: { trading },
	};
};

export const fetchTradingDetailFail = (error) => {
	return {
		type: TRADING_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetTradingShowDetail = () => {
	return {
		type: RESET_TRADING_SHOW_DETAIL_FLAG,
	};
};
