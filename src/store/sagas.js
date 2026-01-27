import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ProfileSaga from "./auth/profile/saga";
import ChangePwdSaga from "./auth/changepwd/saga";
import FileStorageSaga from "./fileStorage/saga";
// User Management
import UserListSaga from "./user/list/saga";
import CreateUserMainSaga from "./user/create/saga";
import UserDetailSaga from "./user/detail/saga";
import ServiceListSaga from "./service/list/saga";
import CreateServiceMainSaga from "./service/create/saga";
import ServiceDetailSaga from "./service/detail/saga";
import NewsListSaga from "./news/list/saga";
import CreateNewsMainSaga from "./news/create/saga";
import NewsDetailSaga from "./news/detail/saga";
import ProjectCategoryListSaga from "./projectCategory/list/saga";
import CreateProjectCategoryMainSaga from "./projectCategory/create/saga";
import ProjectCategoryDetailSaga from "./projectCategory/detail/saga";
import TestimonialListSaga from "./testimonial/list/saga";
import CreateTestimonialMainSaga from "./testimonial/create/saga";
import TestimonialDetailSaga from "./testimonial/detail/saga";
import BannerListSaga from "./banner/list/saga";
import CreateBannerMainSaga from "./banner/create/saga";
import BannerDetailSaga from "./banner/detail/saga";
import FaqListSaga from "./faq/list/saga";
import CreateFaqMainSaga from "./faq/create/saga";
import FaqDetailSaga from "./faq/detail/saga";
import CareerListSaga from "./career/list/saga";
import CreateCareerMainSaga from "./career/create/saga";
import CareerDetailSaga from "./career/detail/saga";
import PageBannerListSaga from "./pageBanner/list/saga";
import CreatePageBannerMainSaga from "./pageBanner/create/saga";
import PageBannerDetailSaga from "./pageBanner/detail/saga";
import SiteSettingSaga from "./siteSetting/saga";
import PartnerDetailSaga from "./partner/detail/saga";
import PartnerListSaga from "./partner/list/saga";
import CreatePartnerMainSaga from "./partner/create/saga";
import AwardDetailSaga from "./award/detail/saga";
import AwardListSaga from "./award/list/saga";
import CreateAwardMainSaga from "./award/create/saga";
import CreateHistoryMainSaga from "./history/create/saga";
import HistoryDetailSaga from "./history/detail/saga";
import HistoryListSaga from "./history/list/saga";
import TeamDetailSaga from "./team/detail/saga";
import CreateTeamMainSaga from "./team/create/saga";
import TeamListSaga from "./team/list/saga";
import CreateExchangeMainSaga from "./exchange/create/saga";
import ExchangeDetailSaga from "./exchange/detail/saga";
import ExchangeListSaga from "./exchange/list/saga";
import CurrencyDetailSaga from "./currency/detail/saga";
import CreateCurrencyMainSaga from "./currency/create/saga";
import CurrencyListSaga from "./currency/list/saga";
import ProductDetailSaga from "./product/detail/saga";
import ProductListSaga from "./product/list/saga";
import CreateProductMainSaga from "./product/create/saga";
import CreateTradingMainSaga from "./trading/create/saga";
import TradingDetailSaga from "./trading/detail/saga";
import TradingListSaga from "./trading/list/saga";
import CreateCategoryMainSaga from "./category/create/saga";
import CategoryDetailSaga from "./category/detail/saga";
import CategoryListSaga from "./category/list/saga";
import CreateRoleMainSaga from "./role/create/saga";
import RoleDetailSaga from "./role/detail/saga";
import RoleListSaga from "./role/list/saga";

export default function* rootSaga() {
	yield all([
		//public
		fork(LayoutSaga),
		fork(AccountSaga),
		fork(AuthSaga),
		fork(ProfileSaga),
		fork(ChangePwdSaga),
		fork(FileStorageSaga),
		fork(UserListSaga),
		fork(CreateUserMainSaga),
		fork(UserDetailSaga),
		fork(ServiceListSaga),
		fork(CreateServiceMainSaga),
		fork(ServiceDetailSaga),
		fork(NewsListSaga),
		fork(CreateNewsMainSaga),
		fork(NewsDetailSaga),
		fork(ProjectCategoryListSaga),
		fork(CreateProjectCategoryMainSaga),
		fork(ProjectCategoryDetailSaga),
		fork(TestimonialListSaga),
		fork(CreateTestimonialMainSaga),
		fork(TestimonialDetailSaga),
		fork(BannerListSaga),
		fork(CreateBannerMainSaga),
		fork(BannerDetailSaga),
		fork(FaqListSaga),
		fork(CreateFaqMainSaga),
		fork(FaqDetailSaga),
		fork(CareerListSaga),
		fork(CreateCareerMainSaga),
		fork(CareerDetailSaga),
		fork(PageBannerListSaga),
		fork(CreatePageBannerMainSaga),
		fork(PageBannerDetailSaga),
		fork(SiteSettingSaga),

		fork(PartnerDetailSaga),
		fork(PartnerListSaga),
		fork(CreatePartnerMainSaga),

		fork(AwardDetailSaga),
		fork(AwardListSaga),
		fork(CreateAwardMainSaga),
		fork(CreateHistoryMainSaga),
		fork(HistoryDetailSaga),
		fork(HistoryListSaga),
		fork(TeamDetailSaga),
		fork(CreateTeamMainSaga),
		fork(TeamListSaga),
		fork(CreateExchangeMainSaga),
		fork(ExchangeDetailSaga),
		fork(ExchangeListSaga),
		fork(CurrencyDetailSaga),
		fork(CreateCurrencyMainSaga),
		fork(CurrencyListSaga),
		fork(ProductDetailSaga),
		fork(ProductListSaga),
		fork(CreateProductMainSaga),

		fork(CreateTradingMainSaga),
		fork(TradingDetailSaga),
		fork(TradingListSaga),

		fork(CreateCategoryMainSaga),
		fork(CategoryDetailSaga),
		fork(CategoryListSaga),

		fork(CreateRoleMainSaga),
		fork(RoleDetailSaga),
		fork(RoleListSaga)
	]);
}
