import {
	SAVE_TEAM,
	SAVE_TEAM_FAILED,
	SAVE_TEAM_SUCCESSFUL,
	DELETE_TEAM,
	DELETE_TEAM_FAILED,
	DELETE_TEAM_SUCCESSFUL,
	RESET_SAVE_TEAM_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateTeamReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_TEAM:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_TEAM_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_TEAM_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_TEAM:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_TEAM_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_TEAM_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_TEAM_FLAG:
			state = {
				...state,
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

export default CreateTeamReducer;
