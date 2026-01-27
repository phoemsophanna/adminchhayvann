import { REFRESH_TRADING_LIST_FLAG, RESET_TRADING_LIST_FLAG, TRADING_LIST, TRADING_LIST_FAILED, TRADING_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchTradingList = () => {
	return {
		type: TRADING_LIST,
	};
};

export const fetchTradingListSuccess = (tradings) => {
	return {
		type: TRADING_LIST_SUCCESSFUL,
		payload: { tradings },
	};
};

export const fetchTradingListFail = (error) => {
	return {
		type: TRADING_LIST_FAILED,
		payload: { error },
	};
};

export const resetTradingList = () => {
	return {
		type: RESET_TRADING_LIST_FLAG,
	};
};

export const refreshTradingList = () => {
	return {
		type: REFRESH_TRADING_LIST_FLAG,
	};
};
