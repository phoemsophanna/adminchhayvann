import { REFRESH_BANNER_LIST_FLAG, RESET_BANNER_LIST_FLAG, BANNER_LIST, BANNER_LIST_FAILED, BANNER_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	banners: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const BannerListReducer = (state = initialState, action) => {
	switch (action.type) {
		case BANNER_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case BANNER_LIST_SUCCESSFUL:
			state = {
				...state,
				banners: action.payload.banners,
				message: "Fetch banner successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case BANNER_LIST_FAILED:
			state = {
				...state,
				banners: [],
				message: "Fetch banner failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_BANNER_LIST_FLAG:
			state = {
				...state,
				banners: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_BANNER_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				banners: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default BannerListReducer;
