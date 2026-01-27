import { REFRESH_NEWS_LIST_FLAG, RESET_NEWS_LIST_FLAG, NEWS_LIST, NEWS_LIST_FAILED, NEWS_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	newsList: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const NewsListReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEWS_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case NEWS_LIST_SUCCESSFUL:
			state = {
				...state,
				newsList: action.payload.newsList,
				message: "Fetch news successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case NEWS_LIST_FAILED:
			state = {
				...state,
				newsList: [],
				message: "Fetch news failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_NEWS_LIST_FLAG:
			state = {
				...state,
				newsList: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_NEWS_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				newsList: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default NewsListReducer;
