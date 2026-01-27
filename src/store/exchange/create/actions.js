import {
	SAVE_EXCHANGE,
	SAVE_EXCHANGE_FAILED,
	SAVE_EXCHANGE_SUCCESSFUL,
	DELETE_EXCHANGE,
	DELETE_EXCHANGE_FAILED,
	DELETE_EXCHANGE_SUCCESSFUL,
	RESET_SAVE_EXCHANGE_FLAG,
} from "./actionTypes";

export const createExchange = (exchange, history) => {
	return {
		type: SAVE_EXCHANGE,
		payload: { exchange, history },
	};
};

export const createExchangeSuccessful = (message) => {
	return {
		type: SAVE_EXCHANGE_SUCCESSFUL,
		payload: { message },
	};
};

export const createExchangeFailed = (error) => {
	return {
		type: SAVE_EXCHANGE_FAILED,
		payload: { error },
	};
};

export const deleteExchange = (exchangeId) => {
	return {
		type: DELETE_EXCHANGE,
		payload: { exchangeId },
	};
};

export const deleteExchangeSuccessful = (message) => {
	return {
		type: DELETE_EXCHANGE_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteExchangeFailed = (error) => {
	return {
		type: DELETE_EXCHANGE_FAILED,
		payload: { error },
	};
};

export const resetCreateExchangeFlag = () => {
	return {
		type: RESET_SAVE_EXCHANGE_FLAG,
	};
};
