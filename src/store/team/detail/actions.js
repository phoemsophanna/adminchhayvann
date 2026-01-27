import { RESET_TEAM_SHOW_DETAIL_FLAG, TEAM_SHOW_DETAIL, TEAM_SHOW_DETAIL_FAILED, TEAM_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchTeamDetail = (teamId) => {
	return {
		type: TEAM_SHOW_DETAIL,
		payload: { teamId },
	};
};

export const fetchTeamDetailSuccess = (team) => {
	return {
		type: TEAM_SHOW_DETAIL_SUCCESSFUL,
		payload: { team },
	};
};

export const fetchTeamDetailFail = (error) => {
	return {
		type: TEAM_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetTeamShowDetail = () => {
	return {
		type: RESET_TEAM_SHOW_DETAIL_FLAG,
	};
};
