import {
	SAVE_TRADING,
	SAVE_TRADING_FAILED,
	SAVE_TRADING_SUCCESSFUL,
	DELETE_TRADING,
	DELETE_TRADING_FAILED,
	DELETE_TRADING_SUCCESSFUL,
	RESET_SAVE_TRADING_FLAG,
} from "./actionTypes";

export const createTrading = (trading) => {
	return {
		type: SAVE_TRADING,
		payload: { trading },
	};
};

export const createTradingSuccessful = (message) => {
	return {
		type: SAVE_TRADING_SUCCESSFUL,
		payload: { message },
	};
};

export const createTradingFailed = (error) => {
	return {
		type: SAVE_TRADING_FAILED,
		payload: { error },
	};
};

export const deleteTrading = (tradingId) => {
	return {
		type: DELETE_TRADING,
		payload: { tradingId },
	};
};

export const deleteTradingSuccessful = (message) => {
	return {
		type: DELETE_TRADING_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteTradingFailed = (error) => {
	return {
		type: DELETE_TRADING_FAILED,
		payload: { error },
	};
};

export const resetCreateTradingFlag = () => {
	return {
		type: RESET_SAVE_TRADING_FLAG,
	};
};
