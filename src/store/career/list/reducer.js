import { REFRESH_CAREER_LIST_FLAG, RESET_CAREER_LIST_FLAG, CAREER_LIST, CAREER_LIST_FAILED, CAREER_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	careers: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CareerListReducer = (state = initialState, action) => {
	switch (action.type) {
		case CAREER_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CAREER_LIST_SUCCESSFUL:
			state = {
				...state,
				careers: action.payload.careers,
				message: "Fetch career successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CAREER_LIST_FAILED:
			state = {
				...state,
				careers: [],
				message: "Fetch career failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CAREER_LIST_FLAG:
			state = {
				...state,
				careers: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_CAREER_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				careers: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default CareerListReducer;
