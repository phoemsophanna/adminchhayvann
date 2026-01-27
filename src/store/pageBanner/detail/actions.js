import {
	RESET_PAGE_BANNER_SHOW_DETAIL_FLAG,
	PAGE_BANNER_SHOW_DETAIL,
	PAGE_BANNER_SHOW_DETAIL_FAILED,
	PAGE_BANNER_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchPageBannerDetail = (pageBannerId) => {
	return {
		type: PAGE_BANNER_SHOW_DETAIL,
		payload: { pageBannerId },
	};
};

export const fetchPageBannerDetailSuccess = (pageBanner) => {
	return {
		type: PAGE_BANNER_SHOW_DETAIL_SUCCESSFUL,
		payload: { pageBanner },
	};
};

export const fetchPageBannerDetailFail = (error) => {
	return {
		type: PAGE_BANNER_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetPageBannerShowDetail = () => {
	return {
		type: RESET_PAGE_BANNER_SHOW_DETAIL_FLAG,
	};
};
