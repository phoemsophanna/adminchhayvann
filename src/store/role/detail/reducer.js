import { RESET_ROLE_SHOW_DETAIL_FLAG, ROLE_SHOW_DETAIL, ROLE_SHOW_DETAIL_FAILED, ROLE_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	role: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const RoleDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case ROLE_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case ROLE_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				role: action.payload.role,
				message: "Fetch history successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case ROLE_SHOW_DETAIL_FAILED:
			state = {
				...state,
				role: null,
				message: "Fetch history failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_ROLE_SHOW_DETAIL_FLAG:
			state = {
				...state,
				role: null,
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

export default RoleDetailReducer;
