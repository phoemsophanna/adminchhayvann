import { REFRESH_PRODUCT_LIST_FLAG, RESET_PRODUCT_LIST_FLAG, PRODUCT_LIST, PRODUCT_LIST_FAILED, PRODUCT_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchProductList = () => {
	return {
		type: PRODUCT_LIST,
	};
};

export const fetchProductListSuccess = (products) => {
	return {
		type: PRODUCT_LIST_SUCCESSFUL,
		payload: { products },
	};
};

export const fetchProductListFail = (error) => {
	return {
		type: PRODUCT_LIST_FAILED,
		payload: { error },
	};
};

export const resetProductList = () => {
	return {
		type: RESET_PRODUCT_LIST_FLAG,
	};
};

export const refreshProductList = () => {
	return {
		type: REFRESH_PRODUCT_LIST_FLAG,
	};
};
