import {
	CREATE_PAGE_BANNER,
	CREATE_PAGE_BANNER_FAILED,
	CREATE_PAGE_BANNER_SUCCESSFUL,
	DELETE_PAGE_BANNER,
	DELETE_PAGE_BANNER_FAILED,
	DELETE_PAGE_BANNER_SUCCESSFUL,
	RESET_CREATE_PAGE_BANNER_FLAG,
} from "./actionTypes";

export const createPageBanner = (pageBanner) => {
	return {
		type: CREATE_PAGE_BANNER,
		payload: { pageBanner },
	};
};

export const createPageBannerSuccessful = (message) => {
	return {
		type: CREATE_PAGE_BANNER_SUCCESSFUL,
		payload: { message },
	};
};

export const createPageBannerFailed = (error) => {
	return {
		type: CREATE_PAGE_BANNER_FAILED,
		payload: { error },
	};
};

export const deletePageBanner = (pageBannerId) => {
	return {
		type: DELETE_PAGE_BANNER,
		payload: { pageBannerId },
	};
};

export const deletePageBannerSuccessful = (message) => {
	return {
		type: DELETE_PAGE_BANNER_SUCCESSFUL,
		payload: { message },
	};
};

export const deletePageBannerFailed = (error) => {
	return {
		type: DELETE_PAGE_BANNER_FAILED,
		payload: { error },
	};
};

export const resetCreatePageBannerFlag = () => {
	return {
		type: RESET_CREATE_PAGE_BANNER_FLAG,
	};
};
