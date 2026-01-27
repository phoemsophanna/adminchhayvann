import {
	RESET_PAGE_BANNER_SHOW_DETAIL_FLAG,
	PAGE_BANNER_SHOW_DETAIL,
	PAGE_BANNER_SHOW_DETAIL_FAILED,
	PAGE_BANNER_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	pageBanner: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const PageBannerDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case PAGE_BANNER_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PAGE_BANNER_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				pageBanner: action.payload.pageBanner,
				message: "Fetch pageBanner successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PAGE_BANNER_SHOW_DETAIL_FAILED:
			state = {
				...state,
				pageBanner: null,
				message: "Fetch pageBanner failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PAGE_BANNER_SHOW_DETAIL_FLAG:
			state = {
				...state,
				pageBanner: null,
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

export default PageBannerDetailReducer;
