import { RESET_SERVICE_SHOW_DETAIL_FLAG, SERVICE_SHOW_DETAIL, SERVICE_SHOW_DETAIL_FAILED, SERVICE_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	service: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ServiceDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case SERVICE_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SERVICE_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				service: action.payload.service,
				message: "Fetch service successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SERVICE_SHOW_DETAIL_FAILED:
			state = {
				...state,
				service: null,
				message: "Fetch service failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SERVICE_SHOW_DETAIL_FLAG:
			state = {
				...state,
				service: null,
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

export default ServiceDetailReducer;
