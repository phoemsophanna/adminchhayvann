import React from "react";
import { useProfile } from "../Components/Hooks/UserHooks";
import { useCan, useCanMultiple } from "../Components/Common/Permission";


const Navdata = () => {
	const { userProfile } = useProfile();

	const menuItems = [
		{
			label: "Menu",
			isHeader: true,
			role: useCanMultiple(["dashboard","banner-menu.view","service-menu.view","news-menu.view","faq.view","partners-menu.view","award-menu.view","product-menu.view"])
		},
		{
			id: "dashboard",
			label: "Dashboard",
			role: useCan("dashboard"),
			icon: "mdi mdi-speedometer",
			link: "/dashboard",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "banner-menu",
			label: "Slider",
			role: useCan("banner-menu.view"),
			icon: "mdi mdi-play-box-outline",
			link: "/banner-menu",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "service",
			label: "Service",
			role: useCan("service-menu.view"),
			icon: "mdi mdi-folder-check-outline",
			link: "/service-menu",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "categories",
			label: "News Category",
			icon: "mdi mdi-shape-outline",
			link: "/categories",
			role: useCan("news-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "news-menu",
			label: "News",
			icon: "mdi mdi-newspaper-variant-multiple",
			link: "/news-menu",
			role: useCan("news-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "main-faq-menu",
			label: "Main FAQ's",
			icon: "mdi mdi-help-circle-outline",
			link: "/main-faq",
			role: useCan("faq.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "faq",
			label: "FAQ's",
			icon: "mdi mdi-help-circle-outline",
			link: "/faq",
			role: useCan("faq.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "partner-menu",
			label: "Partner",
			icon: "mdi mdi-handshake-outline",
			link: "/partners-menu",
			role: useCan("partners-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "award-menu",
			label: "Awards & Honors",
			icon: "mdi mdi-seal",
			link: "/award-menu",
			role: useCan("award-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "product-menu",
			label: "Product",
			icon: "mdi mdi-package",
			link: "/product-menu",
			role: useCan("product-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "application-menu",
			label: "Job Applications",
			icon: "mdi mdi-file-account-outline",
			link: "/application-form",
			role: useCan("application-form.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "corporate-menu",
			label: "Corporate Account",
			icon: "mdi mdi-card-account-details-outline",
			link: "/corporate-form",
			role: useCan("corporate-form.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "individual-menu",
			label: "Individual Account",
			icon: "mdi mdi-card-account-details-outline",
			link: "/individual-form",
			role: useCan("individual-form.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			label: "pages",
			isHeader: true,
			role: useCanMultiple(["testimonial.view","faq.view","career-menu.view","history-menu.view","team-menu.view","privacy-policy.view"]),
		},
		{
			id: "testimonial",
			label: "Testimonial",
			icon: "mdi mdi-comment-quote-outline",
			link: "/testimonial",
			role: useCan("testimonial.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "career",
			label: "Career",
			icon: "mdi mdi-briefcase-variant",
			link: "/career-menu",
			role: useCan("career-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "history-menu",
			label: "History",
			icon: "mdi mdi-history",
			link: "/history-menu",
			role: useCan("history-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "team-menu",
			label: "Team",
			icon: "mdi mdi-account-group",
			link: "/team-menu",
			role: useCan("team-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		// {
		// 	id: "term-service",
		// 	label: "Term of Service",
		// 	icon: "mdi mdi-text-box-search-outline",
		// 	link: "/term-service",
		// 	click: function (e) {
		// 		e.preventDefault();
		// 	},
		// },
		{
			id: "privacy-policy",
			label: "Privacy Policy",
			icon: "mdi mdi-text-box-check-outline",
			link: "/privacy-policy",
			role: useCan("privacy-policy.view"),
			click: function (e) {
				e.preventDefault();
			},
		},

		{
			label: "Management",
			isHeader: true,
			role: useCanMultiple(["site-setting","exchange-menu.view","currency-menu.view","page-banner.view","role-menu.view","user-management.view"])
		},
		{
			id: "site-setting",
			label: "Site Setting",
			icon: "mdi mdi-tune",
			link: "/site-setting/homepage",
			role: useCan("site-setting"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "exchange-rate",
			label: "Exchange Rate",
			icon: "mdi mdi-cash-multiple",
			link: "/exchange-menu",
			role: useCan("exchange-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "currency-convert",
			label: "Currency Convert",
			icon: "mdi mdi-currency-usd",
			link: "/currency-menu",
			role: useCan("currency-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "page-banner",
			label: "Page Setting",
			icon: "mdi mdi-image-album",
			link: "/page-banner",
			role: useCan("page-banner.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "role",
			label: "Role",
			icon: "mdi mdi-shield-account",
			link: "/role-menu",
			role: useCan("role-menu.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "user",
			label: "User",
			icon: "mdi mdi-account-group",
			link: "/user-management",
			role: useCan("user-management.view"),
			click: function (e) {
				e.preventDefault();
			},
		},
	];

	return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
