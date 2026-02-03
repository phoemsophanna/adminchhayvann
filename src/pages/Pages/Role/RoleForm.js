import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import TinymceEditor from "../../../Components/Common/TinymceEditor";

import * as Yup from "yup";
import { useFormik } from "formik";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { createRole, fetchRoleDetail, resetRoleShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
import axios from "axios";
import userProfile from "../../Authentication/user-profile";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const RoleForm = (props) => {
	const { id } = useParams();
	document.title = `Roles: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const { token } = userProfile();
	const [permission, setPermission] = useState([]);
	const [activePermission, setActivePermission] = useState(['dashboard','site-setting']);
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};

	const createRoleSelector = createSelector(
		(state) => state.CreateRoleReducer,
		(layout) => layout
	);
	const useRoleSelect = useSelector(createRoleSelector);
	const createRoleDetailSelector = createSelector(
		(state) => state.RoleDetailReducer,
		(layout) => ({
			role: layout.role,
			isLoading: layout.isLoading,
		})
	);
	const { role, isLoading } = useSelector(createRoleDetailSelector);

	useEffect(() => {
		if (id) dispatch(fetchRoleDetail(id));
		return () => {
			dispatch(resetRoleShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if(role?.permission) {
			setActivePermission(role?.permission);
		}
	}, [role])

	useEffect(() => {
		axios.get(`${api.BASE_URL}/roles/permission`,{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		}).then((res) => {
			const permission = res.data.reduce((acc, perm) => {
				const [group, action] = perm.name.split(".");
				if (!acc[group]) {
					acc[group] = [];
				}
				acc[group].push(perm.name);
				return acc;
			}, {});
			setPermission(permission);
		});
	},[]);

	const addGroupPermission = (events) => {
		const group = events.target.value;
		const isChecked = events.target.checked;
		const groupPermissions = permission[group] || [];

		if (isChecked) {
			setActivePermission((prev) => Array.from(new Set([...prev, ...groupPermissions])));
		} else {
			setActivePermission((prev) => prev.filter(p => !groupPermissions.includes(p)));
		}
	};

	const addActionPermission = (events) => {
		const value = events.target.value;
		const isChecked = events.target.checked;
		
		if(isChecked) {
			setActivePermission([...activePermission, value]);
		} else {
			setActivePermission((prev) => prev.filter(q => !q.includes(value)));
		}
	}

	const roleValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			name: role ? role.name : "",
			permissions: role ? role.permissions : ""
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please Enter Name")
		}),
		onSubmit: (values) => {
			values.permissions = activePermission;
			dispatch(createRole(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Role" pageTitle="Dashboard" pageLink="/role-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Role</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/role-menu">
													<i className="ri-arrow-go-back-line me-1 align-bottom"></i> Back
												</Link>
											</div>
										</Col>
									</Row>
								</CardHeader>
							</Card>
						</Col>
					</Row>

					<Form
						onSubmit={(e) => {
							e.preventDefault();
							roleValidation.handleSubmit();
							return false;
						}}
						action="#"
					>
						<Row>
							<Col lg={12}>
								<Card>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="role-year-input">
												Name <small className="text-danger">(Required)</small>
											</Label>
											<Input
												type="text"
												className="form-control"
												id="role-year-input"
												placeholder="Enter name"
												name="name"
												onChange={roleValidation.handleChange}
												onBlur={roleValidation.handleBlur}
												value={roleValidation.values.name}
												invalid={roleValidation.touched.name && roleValidation.errors.name ? true : false}
											/>
											{roleValidation.touched.name && roleValidation.errors.name ? (
												<FormFeedback type="invalid">{roleValidation.errors.name}</FormFeedback>
											) : null}
										</div>
									</CardBody>
								</Card>
								<Card>
									<CardHeader>
										<div className="align-items-center d-flex">
											<div className="flex-shrink-0">
												<Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
													<NavItem>
														<NavLink
															style={{ cursor: "pointer" }}
															className={titleTap == "ENG" ? "active" : ""}
															onClick={() => {
																titleTapToggle("ENG");
															}}
														>
															Group 
														</NavLink>
													</NavItem>
													<NavItem>
														<NavLink
															style={{ cursor: "pointer" }}
															className={titleTap == "KHM" ? "active" : ""}
															onClick={() => {
																titleTapToggle("KHM");
															}}
														>
															Action
														</NavLink>
													</NavItem>
												</Nav>
											</div>
										</div>
									</CardHeader>
									<CardBody>
										<div className="mb-3">
											<TabContent activeTab={titleTap}>
												<TabPane tabId={"ENG"} id="eng">
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-dashboard`}
																className="checkPermission"
																name={`check-dashboard`}
																value={`dashboard`}
																checked={activePermission?.some((q) => q.includes("dashboard")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-dashboard">Dashboard</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-banner-menu`}
																className="checkPermission"
																name={`check-banner-menu`}
																value={`banner-menu`}
																checked={activePermission?.some((q) => q.includes("banner-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-banner-menu">Banner</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-service-menu`}
																className="checkPermission"
																name={`check-service-menu`}
																value={`service-menu`}
																checked={activePermission?.some((q) => q.includes("service-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-service-menu">Service Page</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-news-menu`}
																className="checkPermission"
																name={`check-news-menu`}
																value={`news-menu`}
																checked={activePermission?.some((q) => q.includes("news-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-news-menu">News Page</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-partners-menu`}
																className="checkPermission"
																name={`check-partners-menu`}
																value={`partners-menu`}
																checked={activePermission?.some((q) => q.includes("partners-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-partners-menu">Partner</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-award-menu`}
																className="checkPermission"
																name={`check-award-menu`}
																value={`award-menu`}
																checked={activePermission?.some((q) => q.includes("award-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-award-menu">Awards & Honors</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-product-menu`}
																className="checkPermission"
																name={`check-product-menu`}
																value={`product-menu`}
																checked={activePermission?.some((q) => q.includes("product-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-product-menu">Product</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-testimonial`}
																className="checkPermission"
																name={`check-testimonial`}
																value={`testimonial`}
																checked={activePermission?.some((q) => q.includes("testimonial")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-testimonial">Testimonial</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-faq`}
																className="checkPermission"
																name={`check-faq`}
																value={`faq`}
																checked={activePermission?.some((q) => q.includes("faq")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-faq">FAQ's</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-career-menu`}
																className="checkPermission"
																name={`check-career-menu`}
																value={`career-menu`}
																checked={activePermission?.some((q) => q.includes("career-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-career-menu">Career</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-history-menu`}
																className="checkPermission"
																name={`check-history-menu`}
																value={`history-menu`}
																checked={activePermission?.some((q) => q.includes("history-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-history-menu">History</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-team-menu`}
																className="checkPermission"
																name={`check-team-menu`}
																value={`team-menu`}
																checked={activePermission?.some((q) => q.includes("team-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-team-menu">Team</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-privacy-policy`}
																className="checkPermission"
																name={`check-privacy-policy`}
																value={`privacy-policy`}
																checked={activePermission?.some((q) => q.includes("privacy-policy")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-privacy-policy">Privacy Policy</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-site-setting`}
																className="checkPermission"
																name={`check-site-setting`}
																value={`site-setting`}
																checked={activePermission?.some((q) => q.includes("site-setting")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-site-setting">Site Setting</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-exchange-menu`}
																className="checkPermission"
																name={`check-exchange-menu`}
																value={`exchange-menu`}
																checked={activePermission?.some((q) => q.includes("exchange-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-exchange-menu">Exchange Rate</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-currency-menu`}
																className="checkPermission"
																name={`check-currency-menu`}
																value={`currency-menu`}
																checked={activePermission?.some((q) => q.includes("currency-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-currency-menu">Currency Convert</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-page-banner`}
																className="checkPermission"
																name={`check-page-banner`}
																value={`page-banner`}
																checked={activePermission?.some((q) => q.includes("page-banner")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-page-banner">Page Setting</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-role-menu`}
																className="checkPermission"
																name={`check-role-menu`}
																value={`role-menu`}
																checked={activePermission?.some((q) => q.includes("role-menu")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-role-menu">Role</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-user-management`}
																className="checkPermission"
																name={`check-user-management`}
																value={`user-management`}
																checked={activePermission?.some((q) => q.includes("user-management")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-user-management">User Management</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-application-form`}
																className="checkPermission"
																name={`check-application-form`}
																value={`application-form`}
																checked={activePermission?.some((q) => q.includes("application-form")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-application-form">Application Job</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-corporate-form`}
																className="checkPermission"
																name={`check-corporate-form`}
																value={`corporate-form`}
																checked={activePermission?.some((q) => q.includes("corporate-form")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-corporate-form">Corporate Register List</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-individual-form`}
																className="checkPermission"
																name={`check-individual-form`}
																value={`individual-form`}
																checked={activePermission?.some((q) => q.includes("individual-form")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-individual-form">Individual Register List</label>
														</div>
													</div>
												</TabPane>
												<TabPane tabId={"KHM"} id="khm">
													<div className="mb-3">
														<div className="form-checkbox">
															<Input
																type="checkbox"
																id={`check-dashboard`}
																className="checkPermission"
																name={`check-dashboard`}
																value={`dashboard`}
																checked={activePermission?.some((q) => q.includes("dashboard")) || false}
																onChange={(e) => addGroupPermission(e)}
															/> <label htmlFor="check-dashboard">Dashboard</label>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-banner-menu">Banner</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`banner-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-service-menu">Service Page</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`service-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-news-menu">News Page</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`news-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-partners-menu">Partner</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`partners-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-award-menu">Awards & Honors</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`award-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-product-menu">Product</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`product-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-testimonial">Testimonial</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`testimonial`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-faq">FAQ's</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`faq`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-career-menu">Career</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`career-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-history-menu">History</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`history-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-team-menu">Team</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`team-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-privacy-policy">Privacy Policy</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`privacy-policy`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-site-setting">Site Setting</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`site-setting`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-exchange-menu">Exchange Rate</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`exchange-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-currency-menu">Currency Convert</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`currency-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-page-banner">Page Setting</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`page-banner`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-role-menu">Role</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`role-menu`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-user-management">User Management</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`user-management`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>

													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-application-form">Application Job</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`application-form`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
													
													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-corporate-form">Corporate Register List</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`corporate-form`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>

													<div className="mb-3">
														<div className="form-checkbox">
															<h6 htmlFor="check-individual-form">Individual Register List</h6>
															<div className="mb-3 mt-1 subPermission">
																{
																	permission[`individual-form`]?.map((q,index) => {
																		return <div key={index} className="subItemPermission">
																			<Input
																				type="checkbox"
																				id={`check-${q}`}
																				className="checkPermission"
																				name={`check-${q}`}
																				value={q}
																				onChange={(e) => addActionPermission(e)}
																				checked={activePermission?.includes(q) || false}
																			/> <label htmlFor={`check-${q}`} style={{textTransform: "capitalize"}}>{q?.replaceAll("-"," ")?.replaceAll(".", " ")}</label>
																		</div>;
																	})
																}
															</div>
														</div>
													</div>
												</TabPane>
											</TabContent>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useRoleSelect.isLoading ? (
										<Button color="primary" className="btn-load">
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										</Button>
									) : (
										<Button type="submit" color="primary" className="btn-label">
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Role
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/role-menu">
										<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
									</Link>
								</div>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default withRouter(RoleForm);
