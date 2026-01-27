import {
	GET_SITE_SETTING,
	GET_SITE_SETTING_FAILED,
	GET_SITE_SETTING_SUCCESSFUL,
	RESET_SAVE_SITE_SETTING_FLAG,
	SAVE_SITE_SETTING,
	SAVE_SITE_SETTING_FAILED,
	SAVE_SITE_SETTING_SUCCESSFUL,
} from "./actionTypes";

export const saveSiteSetting = (siteSetting) => {
	return {
		type: SAVE_SITE_SETTING,
		payload: { siteSetting },
	};
};

export const saveSiteSettingSuccessful = (message) => {
	return {
		type: SAVE_SITE_SETTING_SUCCESSFUL,
		payload: { message },
	};
};

export const saveSiteSettingFailed = (error) => {
	return {
		type: SAVE_SITE_SETTING_FAILED,
		payload: { error },
	};
};

export const getSiteSetting = (type) => {
	return {
		type: GET_SITE_SETTING,
		payload: { type },
	};
};

export const getSiteSettingSuccessful = (siteSetting) => {
	return {
		type: GET_SITE_SETTING_SUCCESSFUL,
		payload: { siteSetting },
	};
};

export const getSiteSettingFailed = (error) => {
	return {
		type: GET_SITE_SETTING_FAILED,
		payload: { error },
	};
};

export const resetSiteSettingFlag = () => {
	return {
		type: RESET_SAVE_SITE_SETTING_FLAG,
	};
};
