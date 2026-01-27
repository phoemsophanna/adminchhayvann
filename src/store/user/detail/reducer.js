import { RESET_USER_SHOW_DETAIL_FLAG, USER_SHOW_DETAIL, USER_SHOW_DETAIL_FAILED, USER_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	user: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const UserDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case USER_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				user: action.payload.user,
				message: "Fetch user successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case USER_SHOW_DETAIL_FAILED:
			state = {
				...state,
				user: null,
				message: "Fetch user failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_USER_SHOW_DETAIL_FLAG:
			state = {
				...state,
				user: null,
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

export default UserDetailReducer;
