import { REFRESH_TEAM_LIST_FLAG, RESET_TEAM_LIST_FLAG, TEAM_LIST, TEAM_LIST_FAILED, TEAM_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	teams: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const TeamListReducer = (state = initialState, action) => {
	switch (action.type) {
		case TEAM_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case TEAM_LIST_SUCCESSFUL:
			state = {
				...state,
				teams: action.payload.teams,
				message: "Fetch team successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case TEAM_LIST_FAILED:
			state = {
				...state,
				teams: [],
				message: "Fetch team failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_TEAM_LIST_FLAG:
			state = {
				...state,
				teams: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_TEAM_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				teams: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default TeamListReducer;
