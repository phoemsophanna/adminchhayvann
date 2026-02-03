import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import Profile from "./auth/profile/reducer";
import ChangePwdUser from "./auth/changepwd/reducer";
// File Storage
import FileStorage from "./fileStorage/reducer";
// User Management
import UserListReducer from "./user/list/reducer";
import CreateUserReducer from "./user/create/reducer";
import UserDetailReducer from "./user/detail/reducer";
import ServiceListReducer from "./service/list/reducer";
import CreateServiceReducer from "./service/create/reducer";
import ServiceDetailReducer from "./service/detail/reducer";
import NewsListReducer from "./news/list/reducer";
import CreateNewsReducer from "./news/create/reducer";
import NewsDetailReducer from "./news/detail/reducer";
import ProjectCategoryListReducer from "./projectCategory/list/reducer";
import CreateProjectCategoryReducer from "./projectCategory/create/reducer";
import ProjectCategoryDetailReducer from "./projectCategory/detail/reducer";
import TestimonialListReducer from "./testimonial/list/reducer";
import CreateTestimonialReducer from "./testimonial/create/reducer";
import TestimonialDetailReducer from "./testimonial/detail/reducer";
import BannerListReducer from "./banner/list/reducer";
import CreateBannerReducer from "./banner/create/reducer";
import BannerDetailReducer from "./banner/detail/reducer";
import FaqListReducer from "./faq/list/reducer";
import CreateFaqReducer from "./faq/create/reducer";
import FaqDetailReducer from "./faq/detail/reducer";
import CareerListReducer from "./career/list/reducer";
import CreateCareerReducer from "./career/create/reducer";
import CareerDetailReducer from "./career/detail/reducer";
import SiteSettingReducer from "./siteSetting/reducer";
import PageBannerListReducer from "./pageBanner/list/reducer";
import CreatePageBannerReducer from "./pageBanner/create/reducer";
import PageBannerDetailReducer from "./pageBanner/detail/reducer";
import CreatePartnerReducer from "./partner/create/reducer";
import PartnerListReducer from "./partner/list/reducer";
import PartnerDetailReducer from "./partner/detail/reducer";
import CreateAwardReducer from "./award/create/reducer";
import AwardListReducer from "./award/list/reducer";
import AwardDetailReducer from "./award/detail/reducer";
import CreateHistoryReducer from "./history/create/reducer";
import HistoryDetailReducer from "./history/detail/reducer";
import HistoryListReducer from "./history/list/reducer";
import CreateTeamReducer from "./team/create/reducer";
import TeamDetailReducer from "./team/detail/reducer";
import TeamListReducer from "./team/list/reducer";
import CreateExchangeReducer from "./exchange/create/reducer";
import ExchangeDetailReducer from "./exchange/detail/reducer";
import ExchangeListReducer from "./exchange/list/reducer";
import CreateCurrencyReducer from "./currency/create/reducer";
import CurrencyDetailReducer from "./currency/detail/reducer";
import CurrencyListReducer from "./currency/list/reducer";
import CreateProductReducer from "./product/create/reducer";
import ProductDetailReducer from "./product/detail/reducer";
import ProductListReducer from "./product/list/reducer";
import TradingDetailReducer from "./trading/detail/reducer";
import CreateTradingReducer from "./trading/create/reducer";
import TradingListReducer from "./trading/list/reducer";
import CreateCategoryReducer from "./category/create/reducer";
import CategoryDetailReducer from "./category/detail/reducer";
import CategoryListReducer from "./category/list/reducer";
import CreateRoleReducer from "./role/create/reducer";
import RoleListReducer from "./role/list/reducer";
import RoleDetailReducer from "./role/detail/reducer";
import ApplicationDetailReducer from "./applicationJob/detail/reducer";
import ApplicationListReducer from "./applicationJob/list/reducer";
import CorporateDetailReducer from "./corporate/detail/reducer";
import CorporateListReducer from "./corporate/list/reducer";
import IndividualDetailReducer from "./individual/detail/reducer";
import IndividualListReducer from "./individual/list/reducer";

const rootReducer = combineReducers({
	// public
	Layout,
	Login,
	Account,
	Profile,
	ChangePwdUser,
	FileStorage,
	// Management
	UserListReducer,
	CreateUserReducer,
	UserDetailReducer,
	// Service
	ServiceListReducer,
	CreateServiceReducer,
	ServiceDetailReducer,
	NewsListReducer,
	CreateNewsReducer,
	NewsDetailReducer,
	ProjectCategoryListReducer,
	CreateProjectCategoryReducer,
	ProjectCategoryDetailReducer,
	TestimonialListReducer,
	CreateTestimonialReducer,
	TestimonialDetailReducer,
	BannerListReducer,
	CreateBannerReducer,
	BannerDetailReducer,
	FaqListReducer,
	CreateFaqReducer,
	FaqDetailReducer,
	CareerListReducer,
	CreateCareerReducer,
	CareerDetailReducer,
	SiteSettingReducer,
	PageBannerListReducer,
	CreatePageBannerReducer,
	PageBannerDetailReducer,
	
	CreatePartnerReducer,
	PartnerListReducer,
	PartnerDetailReducer,

	CreateAwardReducer,
	AwardListReducer,
	AwardDetailReducer,

	CreateHistoryReducer,
	HistoryDetailReducer,
	HistoryListReducer,

	CreateTeamReducer,
	TeamDetailReducer,
	TeamListReducer,

	CreateExchangeReducer,
	ExchangeDetailReducer,
	ExchangeListReducer,

	CreateCurrencyReducer,
	CurrencyDetailReducer,
	CurrencyListReducer,
	CreateProductReducer,
	ProductDetailReducer,
	ProductListReducer,

	TradingDetailReducer,
	CreateTradingReducer,
	TradingListReducer,

	CreateCategoryReducer,
	CategoryDetailReducer,
	CategoryListReducer,

	CreateRoleReducer,
	RoleListReducer,
	RoleDetailReducer,

	ApplicationDetailReducer,
	ApplicationListReducer,

	CorporateDetailReducer,
	CorporateListReducer,

	IndividualDetailReducer,
	IndividualListReducer
});

export default rootReducer;
