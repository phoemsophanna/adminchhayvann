import { RESET_PRODUCT_SHOW_DETAIL_FLAG, PRODUCT_SHOW_DETAIL, PRODUCT_SHOW_DETAIL_FAILED, PRODUCT_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchProductDetail = (productId) => {
	return {
		type: PRODUCT_SHOW_DETAIL,
		payload: { productId },
	};
};

export const fetchProductDetailSuccess = (product) => {
	return {
		type: PRODUCT_SHOW_DETAIL_SUCCESSFUL,
		payload: { product },
	};
};

export const fetchProductDetailFail = (error) => {
	return {
		type: PRODUCT_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetProductShowDetail = () => {
	return {
		type: RESET_PRODUCT_SHOW_DETAIL_FLAG,
	};
};
