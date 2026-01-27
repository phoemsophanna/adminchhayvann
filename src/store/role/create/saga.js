import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_ROLE, DELETE_ROLE } from "./actionTypes";
import { deleteRole, postCreateRole } from "../../../helpers/fakebackend_helper";
import { createRoleFailed, createRoleSuccessful, deleteRoleFailed, deleteRoleSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createRoleSaga({ payload: { role, history } }) {
	try {
		const response = yield call(postCreateRole, role);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createRoleSuccessful(response.message));
			history("/role-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createRoleFailed(response.message));
		}
	} catch (error) {
		toast.error("The name has already been taken or Permission not have set.");
		yield put(createRoleFailed(error));
	}
}

function* deleteRoleSaga({ payload: { roleId } }) {
	try {
		const response = yield call(deleteRole, roleId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteRoleSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteRoleFailed(response.message));
		}
	} catch (error) {
		yield put(deleteRoleFailed(error));
	}
}

function* CreateRoleMainSaga() {
	yield takeEvery(SAVE_ROLE, createRoleSaga);
	yield takeEvery(DELETE_ROLE, deleteRoleSaga);
}

export default CreateRoleMainSaga;
