import { RESET_NEWS_SHOW_DETAIL_FLAG, NEWS_SHOW_DETAIL, NEWS_SHOW_DETAIL_FAILED, NEWS_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	news: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const NewsDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEWS_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case NEWS_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				news: action.payload.news,
				message: "Fetch news successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case NEWS_SHOW_DETAIL_FAILED:
			state = {
				...state,
				news: null,
				message: "Fetch news failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_NEWS_SHOW_DETAIL_FLAG:
			state = {
				...state,
				news: null,
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

export default NewsDetailReducer;
