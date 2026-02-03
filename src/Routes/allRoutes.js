import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Pages/Dashboard/Dashboard";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

//pages
import Starter from "../pages/Pages/Starter/Starter";
import Maintenance from "../pages/Pages/Maintenance/Maintenance";
import ComingSoon from "../pages/Pages/ComingSoon/ComingSoon";
import Slideshow from "../pages/Pages/Slideshow/Slideshow";
import User from "../pages/Pages/User/User";
import ServiceMenu from "../pages/Pages/Service";
import ServiceForm from "../pages/Pages/Service/ServiceForm";
import NewsMenu from "../pages/Pages/News";
import NewsForm from "../pages/Pages/News/NewsForm";
import Testimonial from "../pages/Pages/Testimonial/Testimonial";
import BannerMenu from "../pages/Pages/Banner";
import BannerForm from "../pages/Pages/Banner/BannerForm";
import Faq from "../pages/Pages/Faq/Faq";
import AboutCompany from "../pages/Pages/SiteSetting/AboutCompany";
import ContactUs from "../pages/Pages/SiteSetting/ContactUs";
import CareerMenu from "../pages/Pages/Career";
import CareerForm from "../pages/Pages/Career/CareerForm";
import PageBanner from "../pages/Pages/PageBanner/PageBanner";
import PrivacyPolicy from "../pages/Pages/SiteSetting/PrivacyPolicy";
import Homepage from "../pages/Pages/SiteSetting/Homepage";
import HowTrade from "../pages/Pages/SiteSetting/HowTrade";
import WhyChoose from "../pages/Pages/SiteSetting/WhyChoose";
import Partner from "../pages/Pages/Partner/Partner";
import Award from "../pages/Pages/Award";
import AwardForm from "../pages/Pages/Award/AwardForm";
import Organization from "../pages/Pages/SiteSetting/Organization";
import History from "../pages/Pages/History";
import HistoryForm from "../pages/Pages/History/HistoryForm";
import Team from "../pages/Pages/Team";
import TeamForm from "../pages/Pages/Team/TeamForm";
import Exchange from "../pages/Pages/Exchange";
import ExchangeForm from "../pages/Pages/Exchange/ExchangeForm";
import Currency from "../pages/Pages/Currency";
import CurrencyForm from "../pages/Pages/Currency/CurrencyForm";
import Product from "../pages/Pages/Product";
import ProductForm from "../pages/Pages/Product/ProductForm";
import Servicepage from "../pages/Pages/SiteSetting/Servicepage";
import Tradingpage from "../pages/Pages/SiteSetting/Tradingpage";
import Category from "../pages/Pages/Category/Category";
import Careerpage from "../pages/Pages/SiteSetting/Careerpage";
import MainFaq from "../pages/Pages/MainFaq/MainFaq";
import General from "../pages/Pages/SiteSetting/General";
import Role from "../pages/Pages/Role/index";
import RoleForm from "../pages/Pages/Role/RoleForm";
import IndividualPage from "../pages/Pages/SiteSetting/IndividualPage";
import CorporatePage from "../pages/Pages/SiteSetting/CorporatePage";
import CareerApplyMenu from "../pages/Pages/CareerApply";
import CorporateMenu from "../pages/Pages/Corporate";
import IndividualMenu from "../pages/Pages/Individual";

const authProtectedRoutes = [
	{ path: "/dashboard", component: <Dashboard />, role: "dashboard" },
	{ path: "/index", component: <Dashboard />, role: "dashboard" },

	//User Profile
	{ path: "/profile", component: <UserProfile />, role: "profile" },

	// Menu
	{ path: "/slideshow", component: <Slideshow />, role: "slideshow" },

	//Pages
	{ path: "/pages-starter", component: <Starter />, role: "pages-starter" },

	//Management
	{ path: "/user-management", component: <User />, role: "user-management.view" },
	{ path: "/service-menu", component: <ServiceMenu />, role: "service-menu.view" },
	{ path: "/service-menu/create", component: <ServiceForm />, role: "service-menu.create" },
	{ path: "/service-menu/edit/:id", component: <ServiceForm />, role: "service-menu.edit" },
	{ path: "/news-menu", component: <NewsMenu />, role: "news-menu.view" },
	{ path: "/news-menu/create", component: <NewsForm />, role: "news-menu.create" },
	{ path: "/news-menu/edit/:id", component: <NewsForm />, role: "news-menu.edit" },
	{ path: "/testimonial", component: <Testimonial />, role: "testimonial.view" },
	{ path: "/page-banner", component: <PageBanner />, role: "page-banner.view" },
	{ path: "/faq", component: <Faq />, role: "faq.view" },
	{ path: "/career-menu", component: <CareerMenu />, role: "career-menu.view" },
	{ path: "/career-menu/create", component: <CareerForm />, role: "career-menu.create" },
	{ path: "/career-menu/edit/:id", component: <CareerForm />, role: "career-menu.edit" },
	{ path: "/banner-menu", component: <BannerMenu />, role: "banner-menu.view" },
	{ path: "/banner-menu/create", component: <BannerForm />, role: "banner-menu.create" },
	{ path: "/banner-menu/edit/:id", component: <BannerForm />, role: "banner-menu.edit" },
	{ path: "/site-setting/about-company", component: <AboutCompany />, role: "site-setting" },
	{ path: "/site-setting/contact-us", component: <ContactUs />, role: "site-setting" },
	{ path: "/privacy-policy", component: <PrivacyPolicy />, role: "privacy-policy.view" },

	{ path: "/site-setting/homepage", component: <Homepage />, role: "site-setting" },
	{ path: "/site-setting/how-trade", component: <HowTrade />, role: "site-setting" },
	{ path: "/site-setting/why-choose", component: <WhyChoose />, role: "site-setting" },

	// New
	{ path: "/partners-menu", component: <Partner />, role: "partners-menu.view" },
	{ path: "/award-menu", component: <Award />, role: "award-menu.view" },
	{ path: "/award-menu/create", component: <AwardForm />, role: "award-menu.create" },
	{ path: "/award-menu/edit/:id", component: <AwardForm />, role: "award-menu.edit" },
	{ path: "/site-setting/organization-chart", component: <Organization />, role: "site-setting" },
	{ path: "/site-setting/career", component: <Careerpage />, role: "site-setting" },
	{ path: "/history-menu", component: <History />, role: "history-menu.view" },
	{ path: "/history-menu/create", component: <HistoryForm />, role: "history-menu.create" },
	{ path: "/history-menu/edit/:id", component: <HistoryForm />, role: "history-menu.edit" },
	{ path: "/team-menu", component: <Team />, role: "team-menu.view" },
	{ path: "/team-menu/create", component: <TeamForm />, role: "team-menu.create" },
	{ path: "/team-menu/edit/:id", component: <TeamForm />, role: "team-menu.edit" },
	{ path: "/exchange-menu", component: <Exchange />, role: "exchange-menu.view" },
	{ path: "/exchange-menu/create", component: <ExchangeForm />, role: "exchange-menu.create" },
	{ path: "/exchange-menu/edit/:id", component: <ExchangeForm />, role: "exchange-menu.edit" },
	{ path: "/currency-menu", component: <Currency />, role: "currency-menu.view" },
	{ path: "/currency-menu/create", component: <CurrencyForm />, role: "currency-menu.create" },
	{ path: "/currency-menu/edit/:id", component: <CurrencyForm />, role: "currency-menu.edit" },
	{ path: "/product-menu", component: <Product />, role: "product-menu.view" },
	{ path: "/product-menu/create", component: <ProductForm />, role: "product-menu.create" },
	{ path: "/product-menu/edit/:id", component: <ProductForm />, role: "product-menu.edit" },
	{ path: "/site-setting/services", component: <Servicepage />, role: "site-setting" },
	{ path: "/site-setting/trading", component: <Tradingpage />, role: "site-setting" },
	{ path: "/site-setting/individual", component: <IndividualPage />, role: "site-setting" },
	{ path: "/site-setting/corporate", component: <CorporatePage />, role: "site-setting" },
	{ path: "/categories", component: <Category />, role: "news-menu.view" },
	{ path: "/main-faq", component: <MainFaq />, role: "faq.view" },
	{ path: "/site-setting/general", component: <General />, role: "site-setting" },
	{ path: "/role-menu", component: <Role />, role: "role-menu.view"},
	{ path: "/role-menu/create", component: <RoleForm />, role: "role-menu.create"},
	{ path: "/role-menu/edit/:id", component: <RoleForm />, role: "role-menu.edit"},
	{ path: "/application-form", component: <CareerApplyMenu />, role: "application-form.view" },
	{ path: "/corporate-form", component: <CorporateMenu />, role: "corporate-form.view" },
	{ path: "/individual-form", component: <IndividualMenu />, role: "individual-form.view" },

	// this route should be at the end of all other routes
	// eslint-disable-next-line react/display-name
	{
		path: "/",
		exact: true,
		component: <Navigate to="/dashboard" />,
	},
	{ path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
	// Authentication Page
	{ path: "/logout", component: <Logout /> },
	{ path: "/login", component: <Login /> },
	{ path: "/forgot-password", component: <ForgetPasswordPage /> },
	{ path: "/register", component: <Register /> },

	//AuthenticationInner pages
	{ path: "/pages-maintenance", component: <Maintenance /> },
	{ path: "/pages-coming-soon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes };
