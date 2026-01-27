import {
	LOGIN_USER,
	LOGIN_SUCCESS,
	LOGOUT_USER,
	LOGOUT_USER_SUCCESS,
	API_ERROR,
	RESET_LOGIN_FLAG,
	LOGIN_ACCOUNT,
	USER_DETAIL,
	USER_DETAIL_SUCCESS,
	RESET_UPDATE_USER_FLAG,
	UPDATE_USER_FAILED,
	UPDATE_USER_SUCCESSFUL,
	UPDATE_USER,
} from "./actionTypes";

const initialState = {
	user: {},
	errorMsg: "",
	loading: false,
	error: false,
};

const login = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER:
			state = {
				...state,
				loading: true,
				error: false,
			};
			break;
		case LOGIN_ACCOUNT:
			state = {
				...state,
				loading: true,
				error: false,
			};
			break;
		case LOGIN_SUCCESS:
			state = {
				...state,
				user: action.payload,
				loading: false,
				error: false,
			};
			break;
		case USER_DETAIL:
			state = {
				...state,
				user: action.payload,
			};
			break;
		case USER_DETAIL_SUCCESS:
			state = {
				...state,
				user: action.payload,
			};
			break;

		case LOGOUT_USER:
			state = { ...state, isUserLogout: false };
			break;
		case LOGOUT_USER_SUCCESS:
			state = { ...state, isUserLogout: true };
			break;
		case API_ERROR:
			state = {
				...state,
				errorMsg: action.payload,
				loading: true,
				error: true,
				isUserLogout: false,
			};
			break;
		case RESET_LOGIN_FLAG:
			state = {
				...state,
				errorMsg: null,
				loading: false,
				error: false,
			};
			break;
		case UPDATE_USER:
			state = {
				...state,
				loading: true,
				uploadError: null,
			};
			break;
		case UPDATE_USER_SUCCESSFUL:
			state = {
				...state,
				user: action.payload,
				errorMsg: "",
				loading: false,
				error: false,
			};
			break;
		case UPDATE_USER_FAILED:
			state = {
				...state,
				user: null,
				errorMsg: action.payload,
				loading: false,
				error: true,
			};
			break;
		case RESET_UPDATE_USER_FLAG:
			state = {
				...state,
				user: null,
				errorMsg: null,
				error: false,
			};
			break;
		default:
			state = { ...state };
			break;
	}
	return state;
};

export default login;
