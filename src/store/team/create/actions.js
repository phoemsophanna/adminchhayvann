import {
	SAVE_TEAM,
	SAVE_TEAM_FAILED,
	SAVE_TEAM_SUCCESSFUL,
	DELETE_TEAM,
	DELETE_TEAM_FAILED,
	DELETE_TEAM_SUCCESSFUL,
	RESET_SAVE_TEAM_FLAG,
} from "./actionTypes";

export const createTeam = (team, history) => {
	return {
		type: SAVE_TEAM,
		payload: { team, history },
	};
};

export const createTeamSuccessful = (message) => {
	return {
		type: SAVE_TEAM_SUCCESSFUL,
		payload: { message },
	};
};

export const createTeamFailed = (error) => {
	return {
		type: SAVE_TEAM_FAILED,
		payload: { error },
	};
};

export const deleteTeam = (teamId) => {
	return {
		type: DELETE_TEAM,
		payload: { teamId },
	};
};

export const deleteTeamSuccessful = (message) => {
	return {
		type: DELETE_TEAM_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteTeamFailed = (error) => {
	return {
		type: DELETE_TEAM_FAILED,
		payload: { error },
	};
};

export const resetCreateTeamFlag = () => {
	return {
		type: RESET_SAVE_TEAM_FLAG,
	};
};
