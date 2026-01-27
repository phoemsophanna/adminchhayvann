import { REFRESH_HISTORY_LIST_FLAG, RESET_HISTORY_LIST_FLAG, HISTORY_LIST, HISTORY_LIST_FAILED, HISTORY_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchHistoryList = () => {
	return {
		type: HISTORY_LIST,
	};
};

export const fetchHistoryListSuccess = (historys) => {
	return {
		type: HISTORY_LIST_SUCCESSFUL,
		payload: { historys },
	};
};

export const fetchHistoryListFail = (error) => {
	return {
		type: HISTORY_LIST_FAILED,
		payload: { error },
	};
};

export const resetHistoryList = () => {
	return {
		type: RESET_HISTORY_LIST_FLAG,
	};
};

export const refreshHistoryList = () => {
	return {
		type: REFRESH_HISTORY_LIST_FLAG,
	};
};
