import {
	SAVE_PARTNER,
	SAVE_PARTNER_FAILED,
	SAVE_PARTNER_SUCCESSFUL,
	DELETE_PARTNER,
	DELETE_PARTNER_FAILED,
	DELETE_PARTNER_SUCCESSFUL,
	RESET_SAVE_PARTNER_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreatePartnerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_PARTNER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_PARTNER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_PARTNER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_PARTNER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_PARTNER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_PARTNER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_PARTNER_FLAG:
			state = {
				...state,
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

export default CreatePartnerReducer;
