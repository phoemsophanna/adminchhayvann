import { REFRESH_SERVICE_LIST_FLAG, RESET_SERVICE_LIST_FLAG, SERVICE_LIST, SERVICE_LIST_FAILED, SERVICE_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	services: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ServiceListReducer = (state = initialState, action) => {
	switch (action.type) {
		case SERVICE_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SERVICE_LIST_SUCCESSFUL:
			state = {
				...state,
				services: action.payload.services,
				message: "Fetch service successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SERVICE_LIST_FAILED:
			state = {
				...state,
				services: [],
				message: "Fetch service failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SERVICE_LIST_FLAG:
			state = {
				...state,
				services: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_SERVICE_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				services: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default ServiceListReducer;
