import { CHANGE_PWD_USER, CHANGE_PWD_USER_SUCCESSFUL, CHANGE_PWD_USER_FAILED, RESET_CHANGE_PWD_FLAG, CHANGE_PWD_USER_SUCCESSFUL_REDIRECT } from "./actionTypes";

const initialState = {
	registrationError: null,
	message: null,
	loading: false,
	redirecting: false,
	success: false,
	error: false,
};

const ChangePwdUser = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_PWD_USER:
			state = {
				...state,
				loading: true,
				registrationError: null,
			};
			break;
		case CHANGE_PWD_USER_SUCCESSFUL:
			state = {
				...state,
				loading: false,
				redirecting: true,
				success: true,
				registrationError: null,
			};
			break;
		case CHANGE_PWD_USER_SUCCESSFUL_REDIRECT:
			state = {
				...state,
				loading: false,
				redirecting: false,
				success: true,
				registrationError: null,
			};
			break;
		case CHANGE_PWD_USER_FAILED:
			state = {
				...state,
				loading: false,
				registrationError: action.payload,
				error: true,
			};
			break;
		case RESET_CHANGE_PWD_FLAG:
			state = {
				...state,
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

export default ChangePwdUser;
