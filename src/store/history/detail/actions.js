import { RESET_HISTORY_SHOW_DETAIL_FLAG, HISTORY_SHOW_DETAIL, HISTORY_SHOW_DETAIL_FAILED, HISTORY_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchHistoryDetail = (historyId) => {
	return {
		type: HISTORY_SHOW_DETAIL,
		payload: { historyId },
	};
};

export const fetchHistoryDetailSuccess = (history) => {
	return {
		type: HISTORY_SHOW_DETAIL_SUCCESSFUL,
		payload: { history },
	};
};

export const fetchHistoryDetailFail = (error) => {
	return {
		type: HISTORY_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetHistoryShowDetail = () => {
	return {
		type: RESET_HISTORY_SHOW_DETAIL_FLAG,
	};
};
