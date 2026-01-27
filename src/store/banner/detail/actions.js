import { RESET_BANNER_SHOW_DETAIL_FLAG, BANNER_SHOW_DETAIL, BANNER_SHOW_DETAIL_FAILED, BANNER_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchBannerDetail = (bannerId) => {
	return {
		type: BANNER_SHOW_DETAIL,
		payload: { bannerId },
	};
};

export const fetchBannerDetailSuccess = (banner) => {
	return {
		type: BANNER_SHOW_DETAIL_SUCCESSFUL,
		payload: { banner },
	};
};

export const fetchBannerDetailFail = (error) => {
	return {
		type: BANNER_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetBannerShowDetail = () => {
	return {
		type: RESET_BANNER_SHOW_DETAIL_FLAG,
	};
};
