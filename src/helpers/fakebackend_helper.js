import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
	const user = localStorage.getItem("user");
	if (user) return JSON.parse(user);
	return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
	return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data) => api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = (data) => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data) => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data) => api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data) => api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);

// Register Method
export const postJwtRegister = (url, data) => {
	return api.create(url, data).catch((err) => {
		var message;
		if (err.response && err.response.status) {
			switch (err.response.status) {
				case 404:
					message = "Sorry! the page you are looking for could not be found";
					break;
				case 500:
					message = "Sorry! something went wrong, please contact our support team";
					break;
				case 401:
					message = "Invalid credentials";
					break;
				default:
					message = err[1];
					break;
			}
		}
		throw message;
	});
};

// Login Method
export const postJwtLogin = (data) => api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data) => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data) => api.create(url.SOCIAL_LOGIN, data);

// User
export const postLogin = (data) => api.create(url.POST_LOGIN, data);
export const getUserDetail = () => api.get(url.USER_DETAIL, null);
export const putUpdateUser = (body) => api.put(url.UPDATE_USER, body);
export const putChangePwdUser = (body) => api.put(url.UPDATE_PWD_USER, body);

// File Storage
export const postFileStorage = (body) => api.create(url.FILE_STORAGE_UPLOAD, body);

// User Management
export const getUserList = () => api.get(url.USER_MANAGEMENT_URI, null);
export const postCreateUser = (body) => api.create(url.USER_MANAGEMENT_URI, body);
export const getUserShowDetail = (param) => api.get(`${url.USER_MANAGEMENT_URI}/detail`, param);
export const deleteUser = (userId) => api.delete(`${url.USER_MANAGEMENT_URI}/delete/${userId}`, null);

// Service Management
export const getServiceList = () => api.get(url.SERVICE_MANAGEMENT_URI, null);
export const postCreateService = (body) => api.create(url.SERVICE_MANAGEMENT_URI, body);
export const getServiceShowDetail = (param) => api.get(`${url.SERVICE_MANAGEMENT_URI}/detail`, param);
export const deleteService = (userId) => api.delete(`${url.SERVICE_MANAGEMENT_URI}/delete/${userId}`, null);

// Performance Management
export const getPerformanceList = () => api.get(url.PERFORMANCE_MANAGEMENT_URI, null);
export const postCreatePerformance = (body) => api.create(url.PERFORMANCE_MANAGEMENT_URI, body);
export const getPerformanceShowDetail = (param) => api.get(`${url.PERFORMANCE_MANAGEMENT_URI}/detail`, param);
export const deletePerformance = (userId) => api.delete(`${url.PERFORMANCE_MANAGEMENT_URI}/delete/${userId}`, null);

// News Management
export const getNewsList = () => api.get(url.NEWS_MANAGEMENT_URI, null);
export const postCreateNews = (body) => api.create(url.NEWS_MANAGEMENT_URI, body);
export const getNewsShowDetail = (param) => api.get(`${url.NEWS_MANAGEMENT_URI}/detail`, param);
export const deleteNews = (userId) => api.delete(`${url.NEWS_MANAGEMENT_URI}/delete/${userId}`, null);

// Project Category Management
export const getProjectCategoryList = () => api.get(url.PROJECT_CATEGORY_MANAGEMENT_URI, null);
export const postCreateProjectCategory = (body) => api.create(url.PROJECT_CATEGORY_MANAGEMENT_URI, body);
export const getProjectCategoryShowDetail = (param) => api.get(`${url.PROJECT_CATEGORY_MANAGEMENT_URI}/detail`, param);
export const deleteProjectCategory = (userId) => api.delete(`${url.PROJECT_CATEGORY_MANAGEMENT_URI}/delete/${userId}`, null);
// Project Management
export const getProjectList = () => api.get(url.PROJECT_MANAGEMENT_URI, null);
export const postCreateProject = (body) => api.create(url.PROJECT_MANAGEMENT_URI, body);
export const getProjectShowDetail = (param) => api.get(`${url.PROJECT_MANAGEMENT_URI}/detail`, param);
export const deleteProject = (userId) => api.delete(`${url.PROJECT_MANAGEMENT_URI}/delete/${userId}`, null);
// WebHosting Management
export const getWebHostingList = () => api.get(url.WEB_HOSTING_URI, null);
export const postCreateWebHosting = (body) => api.create(url.WEB_HOSTING_URI, body);
export const getWebHostingShowDetail = (param) => api.get(`${url.WEB_HOSTING_URI}/detail`, param);
export const getWebHostingDropdown = () => api.get(`${url.WEB_HOSTING_URI}/dropdown`, null);
export const deleteWebHosting = (userId) => api.delete(`${url.WEB_HOSTING_URI}/delete/${userId}`, null);
// Partner Management
export const getPartnerList = () => api.get(url.PARTNER, null);
export const postCreatePartner = (body) => api.create(url.PARTNER, body);
export const getPartnerShowDetail = (param) => api.get(`${url.PARTNER}/detail`, param);
export const deletePartner = (userId) => api.delete(`${url.PARTNER}/delete/${userId}`, null);
// Award Management
export const getAwardList = () => api.get(url.AWARD, null);
export const postCreateAward = (body) => api.create(url.AWARD, body);
export const getAwardShowDetail = (param) => api.get(`${url.AWARD}/detail`, param);
export const deleteAward = (userId) => api.delete(`${url.AWARD}/delete/${userId}`, null);
// History Management
export const getHistoryList = () => api.get(url.HISTORY, null);
export const postCreateHistory = (body) => api.create(url.HISTORY, body);
export const getHistoryShowDetail = (param) => api.get(`${url.HISTORY}/detail`, param);
export const deleteHistory = (userId) => api.delete(`${url.HISTORY}/delete/${userId}`, null);
// Team Management
export const getTeamList = () => api.get(url.TEAM, null);
export const postCreateTeam = (body) => api.create(url.TEAM, body);
export const getTeamShowDetail = (param) => api.get(`${url.TEAM}/detail`, param);
export const deleteTeam = (userId) => api.delete(`${url.TEAM}/delete/${userId}`, null);
// Exchange Rate Management
export const getExchangeList = () => api.get(url.EXCHANGE, null);
export const postCreateExchange = (body) => api.create(url.EXCHANGE, body);
export const getExchangeShowDetail = (param) => api.get(`${url.EXCHANGE}/detail`, param);
export const deleteExchange = (userId) => api.delete(`${url.EXCHANGE}/delete/${userId}`, null);
// Currency Convert Management
export const getCurrencyList = () => api.get(url.CURRENCY, null);
export const postCreateCurrency = (body) => api.create(url.CURRENCY, body);
export const getCurrencyShowDetail = (param) => api.get(`${url.CURRENCY}/detail`, param);
export const deleteCurrency = (userId) => api.delete(`${url.CURRENCY}/delete/${userId}`, null);
// Product Management
export const getProductList = () => api.get(url.PRODUCT, null);
export const postCreateProduct = (body) => api.create(url.PRODUCT, body);
export const getProductShowDetail = (param) => api.get(`${url.PRODUCT}/detail`, param);
export const deleteProduct = (userId) => api.delete(`${url.PRODUCT}/delete/${userId}`, null);
// Trading Management
export const getTradingList = () => api.get(url.TRADING, null);
export const postCreateTrading = (body) => api.create(url.TRADING, body);
export const getTradingShowDetail = (param) => api.get(`${url.TRADING}/detail`, param);
export const deleteTrading = (userId) => api.delete(`${url.TRADING}/delete/${userId}`, null);
// Category Management
export const getCategoryList = (param) => api.get(url.CATEGORY, param);
export const postCreateCategory = (body) => api.create(url.CATEGORY, body);
export const getCategoryShowDetail = (param) => api.get(`${url.CATEGORY}/detail`, param);
export const deleteCategory = (userId) => api.delete(`${url.CATEGORY}/delete/${userId}`, null);
// PerformanceType Management
export const getPerformanceTypeList = () => api.get(url.PERFORMANCE_URI, null);
export const postCreatePerformanceType = (body) => api.create(url.PERFORMANCE_URI, body);
export const getPerformanceTypeShowDetail = (param) => api.get(`${url.PERFORMANCE_URI}/detail`, param);
export const deletePerformanceType = (userId) => api.delete(`${url.PERFORMANCE_URI}/delete/${userId}`, null);
// DefaultPlan Management
export const getDefaultPlanList = () => api.get(url.DEFAULT_PLAN_URI, null);
export const postCreateDefaultPlan = (body) => api.create(url.DEFAULT_PLAN_URI, body);
export const getDefaultPlanShowDetail = (param) => api.get(`${url.DEFAULT_PLAN_URI}/detail`, param);
export const deleteDefaultPlan = (userId) => api.delete(`${url.DEFAULT_PLAN_URI}/delete/${userId}`, null);
// Testimonial Management
export const getTestimonialList = () => api.get(url.TESTIMONIAL_URI, null);
export const postCreateTestimonial = (body) => api.create(url.TESTIMONIAL_URI, body);
export const getTestimonialShowDetail = (param) => api.get(`${url.TESTIMONIAL_URI}/detail`, param);
export const deleteTestimonial = (userId) => api.delete(`${url.TESTIMONIAL_URI}/delete/${userId}`, null);
// Technology Management
export const getTechnologyList = () => api.get(url.TECHNOLOGY_URI, null);
export const postCreateTechnology = (body) => api.create(url.TECHNOLOGY_URI, body);
export const getTechnologyShowDetail = (param) => api.get(`${url.TECHNOLOGY_URI}/detail`, param);
export const deleteTechnology = (userId) => api.delete(`${url.TECHNOLOGY_URI}/delete/${userId}`, null);
// Banner Management
export const getBannerList = () => api.get(url.BANNERS_URI, null);
export const postCreateBanner = (body) => api.create(url.BANNERS_URI, body);
export const getBannerShowDetail = (param) => api.get(`${url.BANNERS_URI}/detail`, param);
export const deleteBanner = (userId) => api.delete(`${url.BANNERS_URI}/delete/${userId}`, null);
// Skillset Management
export const getSkillsetList = () => api.get(url.SKILLSET_URI, null);
export const postCreateSkillset = (body) => api.create(url.SKILLSET_URI, body);
export const getSkillsetShowDetail = (param) => api.get(`${url.SKILLSET_URI}/detail`, param);
export const deleteSkillset = (userId) => api.delete(`${url.SKILLSET_URI}/delete/${userId}`, null);
// Faq Management
export const getFaqList = () => api.get(url.FAQ_URI, null);
export const postCreateFaq = (body) => api.create(url.FAQ_URI, body);
export const getFaqShowDetail = (param) => api.get(`${url.FAQ_URI}/detail`, param);
export const deleteFaq = (userId) => api.delete(`${url.FAQ_URI}/delete/${userId}`, null);
// Role Permission Management
export const getRoleList = () => api.get(url.ROLE, null);
export const postCreateRole = (body) => api.create(url.ROLE, body);
export const getRoleShowDetail = (param) => api.get(`${url.ROLE}/detail`, param);
export const deleteRole = (userId) => api.delete(`${url.ROLE}/delete/${userId}`, null);
// Career Management
export const getCareerList = () => api.get(url.CAREER_URI, null);
export const postCreateCareer = (body) => api.create(url.CAREER_URI, body);
export const getCareerShowDetail = (param) => api.get(`${url.CAREER_URI}/detail`, param);
export const deleteCareer = (userId) => api.delete(`${url.CAREER_URI}/delete/${userId}`, null);
// Site Setting Management
export const getSiteSettingDetail = (type) => api.get(`${url.SITE_SETTING_URI}/${type}`, null);
export const postSaveSiteSetting = (body) => api.create(url.SITE_SETTING_URI, body);
// PageBanner Management
export const getPageBannerList = () => api.get(url.PAGE_BANNER_URI, null);
export const postCreatePageBanner = (body) => api.create(url.PAGE_BANNER_URI, body);
export const getPageBannerShowDetail = (param) => api.get(`${url.PAGE_BANNER_URI}/detail`, param);
export const deletePageBanner = (userId) => api.delete(`${url.PAGE_BANNER_URI}/delete/${userId}`, null);
