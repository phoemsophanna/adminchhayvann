import { takeEvery, fork, put, all, call, delay } from "redux-saga/effects";

//Account Redux states
import { CHANGE_PWD_USER } from "./actionTypes";
import { changePwdUserSuccessful, changePwdUserFailed, changePwdUserSuccessfulRedirect } from "./actions";
import { putChangePwdUser } from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* changePwdUser({ payload: { user, history } }) {
	try {
		const response = yield call(putChangePwdUser, user);
		if (response.message === "success") {
			yield put(changePwdUserSuccessful());
			toast.success("User Updated Successfully", { autoClose: 3000 });
			yield delay(3000);
			yield put(changePwdUserSuccessfulRedirect());
			history("/login");
		} else {
			yield put(changePwdUserFailed(response));
		}
	} catch (error) {
		yield put(changePwdUserFailed(error));
	}
}

export function* watchUserChangePwd() {
	yield takeEvery(CHANGE_PWD_USER, changePwdUser);
}

function* ChangePwdSaga() {
	yield all([fork(watchUserChangePwd)]);
}

export default ChangePwdSaga;
