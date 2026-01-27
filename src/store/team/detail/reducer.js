import { RESET_TEAM_SHOW_DETAIL_FLAG, TEAM_SHOW_DETAIL, TEAM_SHOW_DETAIL_FAILED, TEAM_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	team: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const TeamDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case TEAM_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case TEAM_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				team: action.payload.team,
				message: "Fetch team successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case TEAM_SHOW_DETAIL_FAILED:
			state = {
				...state,
				team: null,
				message: "Fetch team failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_TEAM_SHOW_DETAIL_FLAG:
			state = {
				...state,
				team: null,
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default TeamDetailReducer;
