import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { getSiteSettingDetail, postSaveSiteSetting } from "../../helpers/fakebackend_helper";
import { getSiteSettingFailed, getSiteSettingSuccessful, saveSiteSettingFailed, saveSiteSettingSuccessful } from "./actions";
import { GET_SITE_SETTING, SAVE_SITE_SETTING } from "./actionTypes";

function* saveSiteSettingSaga({ payload: { siteSetting } }) {
	try {
		const response = yield call(postSaveSiteSetting, siteSetting);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(saveSiteSettingSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(saveSiteSettingFailed(response.message));
		}
	} catch (error) {
		yield put(saveSiteSettingFailed(error));
	}
}

function* fetchSiteSettingSaga({ payload: { type } }) {
	try {
		const response = yield call(getSiteSettingDetail, type);
		if (response.status === "success") {
			yield put(getSiteSettingSuccessful(response.model.content));
		} else {
			yield put(getSiteSettingFailed(response.message));
		}
	} catch (error) {
		yield put(getSiteSettingFailed(error));
	}
}

function* SiteSettingSaga() {
	yield takeEvery(SAVE_SITE_SETTING, saveSiteSettingSaga);
	yield takeEvery(GET_SITE_SETTING, fetchSiteSettingSaga);
}

export default SiteSettingSaga;
