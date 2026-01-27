import {
	SAVE_BANNER,
	SAVE_BANNER_FAILED,
	SAVE_BANNER_SUCCESSFUL,
	DELETE_BANNER,
	DELETE_BANNER_FAILED,
	DELETE_BANNER_SUCCESSFUL,
	RESET_SAVE_BANNER_FLAG,
} from "./actionTypes";

export const createBanner = (banner, history) => {
	return {
		type: SAVE_BANNER,
		payload: { banner, history },
	};
};

export const createBannerSuccessful = (message) => {
	return {
		type: SAVE_BANNER_SUCCESSFUL,
		payload: { message },
	};
};

export const createBannerFailed = (error) => {
	return {
		type: SAVE_BANNER_FAILED,
		payload: { error },
	};
};

export const deleteBanner = (bannerId) => {
	return {
		type: DELETE_BANNER,
		payload: { bannerId },
	};
};

export const deleteBannerSuccessful = (message) => {
	return {
		type: DELETE_BANNER_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteBannerFailed = (error) => {
	return {
		type: DELETE_BANNER_FAILED,
		payload: { error },
	};
};

export const resetCreateBannerFlag = () => {
	return {
		type: RESET_SAVE_BANNER_FLAG,
	};
};
