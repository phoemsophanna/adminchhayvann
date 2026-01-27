import { RESET_PRODUCT_SHOW_DETAIL_FLAG, PRODUCT_SHOW_DETAIL, PRODUCT_SHOW_DETAIL_FAILED, PRODUCT_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	product: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ProductDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCT_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PRODUCT_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				product: action.payload.product,
				message: "Fetch product successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PRODUCT_SHOW_DETAIL_FAILED:
			state = {
				...state,
				product: null,
				message: "Fetch product failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PRODUCT_SHOW_DETAIL_FLAG:
			state = {
				...state,
				product: null,
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

export default ProductDetailReducer;
