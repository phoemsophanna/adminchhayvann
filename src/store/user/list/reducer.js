import { REFRESH_USER_LIST_FLAG, RESET_USER_LIST_FLAG, USER_LIST, USER_LIST_FAILED, USER_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	users: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const UserListReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case USER_LIST_SUCCESSFUL:
			state = {
				...state,
				users: action.payload.users,
				message: "Fetch user successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case USER_LIST_FAILED:
			state = {
				...state,
				users: [],
				message: "Fetch user failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_USER_LIST_FLAG:
			state = {
				...state,
				users: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_USER_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				users: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default UserListReducer;
