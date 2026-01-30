import { REFRESH_PRODUCT_LIST_FLAG, RESET_PRODUCT_LIST_FLAG, PRODUCT_LIST, PRODUCT_LIST_FAILED, PRODUCT_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	products: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ProductListReducer = (state = initialState, action) => {
	console.log(action.payload);
	switch (action.type) {
		case PRODUCT_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PRODUCT_LIST_SUCCESSFUL:
			state = {
				...state,
				products: action.payload.products,
				message: "Fetch product successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PRODUCT_LIST_FAILED:
			state = {
				...state,
				products: [],
				message: "Fetch product failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PRODUCT_LIST_FLAG:
			state = {
				...state,
				products: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_PRODUCT_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				products: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default ProductListReducer;
