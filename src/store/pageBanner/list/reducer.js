import {
	REFRESH_PAGE_BANNER_LIST_FLAG,
	RESET_PAGE_BANNER_LIST_FLAG,
	PAGE_BANNER_LIST,
	PAGE_BANNER_LIST_FAILED,
	PAGE_BANNER_LIST_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	pageBanners: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const PageBannerListReducer = (state = initialState, action) => {
	switch (action.type) {
		case PAGE_BANNER_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PAGE_BANNER_LIST_SUCCESSFUL:
			state = {
				...state,
				pageBanners: action.payload.pageBanners,
				message: "Fetch pageBanner successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PAGE_BANNER_LIST_FAILED:
			state = {
				...state,
				pageBanners: [],
				message: "Fetch pageBanner failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PAGE_BANNER_LIST_FLAG:
			state = {
				...state,
				pageBanners: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_PAGE_BANNER_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				pageBanners: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default PageBannerListReducer;
