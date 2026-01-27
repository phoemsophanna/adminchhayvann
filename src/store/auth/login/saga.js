import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_ACCOUNT, LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN, UPDATE_USER, USER_DETAIL } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess, updateUserFailed, updateUserSuccessful, userDetailSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { getUserDetail, postFakeLogin, postJwtLogin, postLogin, postSocialLogin, putUpdateUser } from "../../../helpers/fakebackend_helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* loginUser({ payload: { user, history } }) {
	try {
		if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
			const fireBaseBackend = getFirebaseBackend();
			const response = yield call(fireBaseBackend.loginUser, user.email, user.password);
			if (response) {
				yield put(loginSuccess(response));
				history("/dashboard");
			} else {
				yield put(apiError(response));
			}
		} else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
			const response = yield call(postJwtLogin, {
				email: user.email,
				password: user.password,
			});
			sessionStorage.setItem("authUser", JSON.stringify(response));
			if (response) {
				yield put(loginSuccess(response));
				history("/dashboard");
			} else {
				yield put(apiError(response));
			}
		} else if (process.env.REACT_APP_API_URL) {
			const response = yield call(postFakeLogin, {
				email: user.email,
				password: user.password,
			});
			if (response.status === "success") {
				yield put(loginSuccess(response));
				history("/dashboard");
				sessionStorage.setItem("authUser", JSON.stringify(response));
			} else {
				yield put(apiError(response));
			}
		}
	} catch (error) {
		yield put(apiError(error));
	}
}

function* loginAccount({ payload: { user, history } }) {
	try {
		const response = yield call(postLogin, {
			email: user.email,
			password: user.password,
		});

		sessionStorage.setItem("authUser", JSON.stringify(response));
		sessionStorage.setItem("permissions", JSON.stringify(response?.permission));

		if (response.status === "success") {
			yield put(loginSuccess(response.data));
			history("/dashboard");
			toast.success("User login Successfully", { autoClose: 3000 });
		} else {
			yield put(apiError(response.message));
		}
	} catch (error) {
		yield put(apiError(error));
	}
}

function* userDetail() {
	try {
		const response = yield call(getUserDetail);
		if (response) {
			yield put(userDetailSuccess(response));
		} else {
			yield put(apiError(response));
		}
	} catch (error) {
		yield put(apiError(error));
	}
}

function* logoutUser() {
	try {
		sessionStorage.removeItem("authUser");
		if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
			const fireBaseBackend = getFirebaseBackend();
			const response = yield call(fireBaseBackend.logout);
			yield put(logoutUserSuccess(LOGOUT_USER, response));
		} else {
			yield put(logoutUserSuccess(LOGOUT_USER, true));
		}
	} catch (error) {
		yield put(apiError(LOGOUT_USER, error));
	}
}

function* socialLogin({ payload: { data, history, type } }) {
	try {
		if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
			const fireBaseBackend = getFirebaseBackend();
			const response = yield call(fireBaseBackend.socialLoginUser, type);
			if (response) {
				history("/dashboard");
			} else {
				history("/login");
			}
			sessionStorage.setItem("authUser", JSON.stringify(response));
			yield put(loginSuccess(response));
		} else {
			const response = yield call(postSocialLogin, data);
			sessionStorage.setItem("authUser", JSON.stringify(response));
			yield put(loginSuccess(response));
		}
		history("/dashboard");
	} catch (error) {
		yield put(apiError(error));
	}
}

function* updateUser({ payload: { user, history } }) {
	try {
		const response = yield call(putUpdateUser, user);
		if (response.message === "success") {
			yield delay(1000);
			yield put(updateUserSuccessful(response.data));
			toast.success("User Updated Successfully", { autoClose: 3000 });
			history("/dashboard");
		} else {
			yield put(updateUserFailed(response));
		}
	} catch (error) {
		yield put(updateUserFailed(error));
	}
}

function* authSaga() {
	yield takeEvery(LOGIN_USER, loginUser);
	yield takeLatest(SOCIAL_LOGIN, socialLogin);
	yield takeEvery(LOGOUT_USER, logoutUser);
	yield takeEvery(LOGIN_ACCOUNT, loginAccount);
	yield takeEvery(USER_DETAIL, userDetail);
	yield takeEvery(UPDATE_USER, updateUser);
}

export default authSaga;
