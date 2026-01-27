import {
	GET_SITE_SETTING,
	GET_SITE_SETTING_FAILED,
	GET_SITE_SETTING_SUCCESSFUL,
	RESET_SAVE_SITE_SETTING_FLAG,
	SAVE_SITE_SETTING,
	SAVE_SITE_SETTING_FAILED,
	SAVE_SITE_SETTING_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	siteSetting: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const SiteSettingReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_SITE_SETTING:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_SITE_SETTING_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_SITE_SETTING_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case GET_SITE_SETTING:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case GET_SITE_SETTING_SUCCESSFUL:
			state = {
				...state,
				siteSetting: action.payload.siteSetting,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case GET_SITE_SETTING_FAILED:
			state = {
				...state,
				siteSetting: null,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_SITE_SETTING_FLAG:
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

export default SiteSettingReducer;
