import { RESET_BANNER_SHOW_DETAIL_FLAG, BANNER_SHOW_DETAIL, BANNER_SHOW_DETAIL_FAILED, BANNER_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	banner: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const BannerDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case BANNER_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case BANNER_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				banner: action.payload.banner,
				message: "Fetch banner successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case BANNER_SHOW_DETAIL_FAILED:
			state = {
				...state,
				banner: null,
				message: "Fetch banner failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_BANNER_SHOW_DETAIL_FLAG:
			state = {
				...state,
				banner: null,
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

export default BannerDetailReducer;
