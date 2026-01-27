import { REFRESH_TEAM_LIST_FLAG, RESET_TEAM_LIST_FLAG, TEAM_LIST, TEAM_LIST_FAILED, TEAM_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchTeamList = () => {
	return {
		type: TEAM_LIST,
	};
};

export const fetchTeamListSuccess = (teams) => {
	return {
		type: TEAM_LIST_SUCCESSFUL,
		payload: { teams },
	};
};

export const fetchTeamListFail = (error) => {
	return {
		type: TEAM_LIST_FAILED,
		payload: { error },
	};
};

export const resetTeamList = () => {
	return {
		type: RESET_TEAM_LIST_FLAG,
	};
};

export const refreshTeamList = () => {
	return {
		type: REFRESH_TEAM_LIST_FLAG,
	};
};
