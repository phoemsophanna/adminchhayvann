import {
	SAVE_PRODUCT,
	SAVE_PRODUCT_FAILED,
	SAVE_PRODUCT_SUCCESSFUL,
	DELETE_PRODUCT,
	DELETE_PRODUCT_FAILED,
	DELETE_PRODUCT_SUCCESSFUL,
	RESET_SAVE_PRODUCT_FLAG,
} from "./actionTypes";

export const createProduct = (product, history) => {
	return {
		type: SAVE_PRODUCT,
		payload: { product, history },
	};
};

export const createProductSuccessful = (message) => {
	return {
		type: SAVE_PRODUCT_SUCCESSFUL,
		payload: { message },
	};
};

export const createProductFailed = (error) => {
	return {
		type: SAVE_PRODUCT_FAILED,
		payload: { error },
	};
};

export const deleteProduct = (productId) => {
	return {
		type: DELETE_PRODUCT,
		payload: { productId },
	};
};

export const deleteProductSuccessful = (message) => {
	return {
		type: DELETE_PRODUCT_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteProductFailed = (error) => {
	return {
		type: DELETE_PRODUCT_FAILED,
		payload: { error },
	};
};

export const resetCreateProductFlag = () => {
	return {
		type: RESET_SAVE_PRODUCT_FLAG,
	};
};
