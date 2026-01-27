import { REFRESH_BANNER_LIST_FLAG, RESET_BANNER_LIST_FLAG, BANNER_LIST, BANNER_LIST_FAILED, BANNER_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchBannerList = () => {
	return {
		type: BANNER_LIST,
	};
};

export const fetchBannerListSuccess = (banners) => {
	return {
		type: BANNER_LIST_SUCCESSFUL,
		payload: { banners },
	};
};

export const fetchBannerListFail = (error) => {
	return {
		type: BANNER_LIST_FAILED,
		payload: { error },
	};
};

export const resetBannerList = () => {
	return {
		type: RESET_BANNER_LIST_FLAG,
	};
};

export const refreshBannerList = () => {
	return {
		type: REFRESH_BANNER_LIST_FLAG,
	};
};
