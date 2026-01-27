import { REFRESH_ROLE_LIST_FLAG, RESET_ROLE_LIST_FLAG, ROLE_LIST, ROLE_LIST_FAILED, ROLE_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	roles: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const RoleListReducer = (state = initialState, action) => {
	switch (action.type) {
		case ROLE_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case ROLE_LIST_SUCCESSFUL:
			state = {
				...state,
				roles: action.payload.roles,
				message: "Fetch role successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case ROLE_LIST_FAILED:
			state = {
				...state,
				roles: [],
				message: "Fetch role failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_ROLE_LIST_FLAG:
			state = {
				...state,
				roles: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_ROLE_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				roles: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default RoleListReducer;
