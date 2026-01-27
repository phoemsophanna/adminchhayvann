import { RESET_CAREER_SHOW_DETAIL_FLAG, CAREER_SHOW_DETAIL, CAREER_SHOW_DETAIL_FAILED, CAREER_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	career: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CareerDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case CAREER_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CAREER_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				career: action.payload.career,
				message: "Fetch career successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CAREER_SHOW_DETAIL_FAILED:
			state = {
				...state,
				career: null,
				message: "Fetch career failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CAREER_SHOW_DETAIL_FLAG:
			state = {
				...state,
				career: null,
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

export default CareerDetailReducer;
