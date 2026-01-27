import {
	REFRESH_PAGE_BANNER_LIST_FLAG,
	RESET_PAGE_BANNER_LIST_FLAG,
	PAGE_BANNER_LIST,
	PAGE_BANNER_LIST_FAILED,
	PAGE_BANNER_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchPageBannerList = () => {
	return {
		type: PAGE_BANNER_LIST,
	};
};

export const fetchPageBannerListSuccess = (pageBanners) => {
	return {
		type: PAGE_BANNER_LIST_SUCCESSFUL,
		payload: { pageBanners },
	};
};

export const fetchPageBannerListFail = (error) => {
	return {
		type: PAGE_BANNER_LIST_FAILED,
		payload: { error },
	};
};

export const resetPageBannerList = () => {
	return {
		type: RESET_PAGE_BANNER_LIST_FLAG,
	};
};

export const refreshPageBannerList = () => {
	return {
		type: REFRESH_PAGE_BANNER_LIST_FLAG,
	};
};
