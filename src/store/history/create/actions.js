import {
	SAVE_HISTORY,
	SAVE_HISTORY_FAILED,
	SAVE_HISTORY_SUCCESSFUL,
	DELETE_HISTORY,
	DELETE_HISTORY_FAILED,
	DELETE_HISTORY_SUCCESSFUL,
	RESET_SAVE_HISTORY_FLAG,
} from "./actionTypes";

export const createHistory = (history, historys) => {
	return {
		type: SAVE_HISTORY,
		payload: { history, historys },
	};
};

export const createHistorySuccessful = (message) => {
	return {
		type: SAVE_HISTORY_SUCCESSFUL,
		payload: { message },
	};
};

export const createHistoryFailed = (error) => {
	return {
		type: SAVE_HISTORY_FAILED,
		payload: { error },
	};
};

export const deleteHistory = (historyId) => {
	return {
		type: DELETE_HISTORY,
		payload: { historyId },
	};
};

export const deleteHistorySuccessful = (message) => {
	return {
		type: DELETE_HISTORY_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteHistoryFailed = (error) => {
	return {
		type: DELETE_HISTORY_FAILED,
		payload: { error },
	};
};

export const resetCreateHistoryFlag = () => {
	return {
		type: RESET_SAVE_HISTORY_FLAG,
	};
};
