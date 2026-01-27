import React, { useState, useEffect } from "react";
import classnames from "classnames";

import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Label,
	Input,
	Form,
	TabPane,
	TabContent,
	NavLink,
	NavItem,
	Nav,
	CardHeader,
	Button,
	Spinner,
	FormFeedback,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { changePwdUser, updateUser, userDetail } from "../../store/actions";
import { createSelector } from "reselect";

import * as Yup from "yup";
import { useFormik } from "formik";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import withRouter from "../../Components/Common/withRouter";
import { api } from "../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UserProfile = (props) => {
	const [activeTab, setActiveTab] = useState("1");

	const tabChange = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	document.title = "Profile Settings | Admin & Dashboard";
	const [file, setFile] = useState([]);
	const dispatch = useDispatch();

	const selectUserData = createSelector(
		(state) => state.Login,
		(user) => user
	);

	// Inside your component
	const user = useSelector(selectUserData);
	const changePwdData = createSelector(
		(state) => state.ChangePwdUser,
		(data) => data
	);

	// Inside your component
	const changePwdUserSelect = useSelector(changePwdData);

	useEffect(() => {
		dispatch(userDetail());
	}, [dispatch]);

	useEffect(() => {
		if (user.user !== undefined) {
			setFile([
				{
					source: user.user.image,
					// serverId: user.user.image,
					options: {
						type: "local",
					},
				},
			]);
		}
	}, [setFile, user]);

	const validation = useFormik({
		enableReinitialize: true,

		initialValues: {
			name: (user.user && user.user.name) || "",
			email: (user.user && user.user.email) || "",
			phoneNumber: (user.user && user.user.phoneNumber) || "",
			userRole: (user.user && user.user.userRole) || "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please Enter Your Name"),
			email: Yup.string().required("Please Enter Your Email"),
		}),
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(updateUser(values, props.router.navigate));
		},
	});

	const validationAuth = useFormik({
		enableReinitialize: true,

		initialValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			currentPassword: Yup.string().required("Please Enter Your Current Password"),
			newPassword: Yup.string().required("Please Enter Your New Password"),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("newPassword"), null], "Confirm password is not match")
				.required("Please Enter Your Confirm Password"),
		}),
		onSubmit: (values) => {
			dispatch(changePwdUser(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<div className="position-relative mx-n4 mt-n4">
						<div className="profile-wid-bg profile-setting-img">
							<img src="" className="profile-wid-img" alt="" />
							<div className="overlay-content"></div>
						</div>
					</div>
					<Row>
						<Col xxl={3}>
							<Card className="mt-n5">
								<CardBody className="p-4">
									<div className="text-center">
										<div className="profile-user position-relative d-inline-block mx-auto  mb-4">
											<div style={{ width: "160px", height: "160px" }}>
												<FilePond
													labelIdle='<span class="filepond--label-action">Browse</span>'
													files={file}
													onupdatefiles={setFile}
													allowMultiple={false}
													maxFiles={1}
													name="file"
													server={`${api.BASE_URL}/save-image/user-profile`}
													className="filepond filepond-input-multiple"
													stylePanelLayout="compact circle"
													styleLoadIndicatorPosition="center bottom"
													styleButtonRemoveItemPosition="center bottom"
													styleProgressIndicatorPosition="center bottom"
												/>
											</div>
										</div>
										<h5 className="fs-16 mb-1">{user.user?.name}</h5>
										<p className="text-muted mb-0">{user.user?.userRole}</p>
									</div>
								</CardBody>
							</Card>
						</Col>

						<Col xxl={9}>
							<Card className="mt-xxl-n5">
								<CardHeader>
									<Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
										<NavItem>
											<NavLink
												to="#"
												className={classnames({ active: activeTab === "1" })}
												onClick={() => {
													tabChange("1");
												}}
												type="button"
											>
												<i className="fas fa-home"></i>
												Personal Details
											</NavLink>
										</NavItem>
										<NavItem>
											<NavLink
												to="#"
												className={classnames({ active: activeTab === "2" })}
												onClick={() => {
													tabChange("2");
												}}
												type="button"
											>
												<i className="far fa-user"></i>
												Change Password
											</NavLink>
										</NavItem>
									</Nav>
								</CardHeader>
								<CardBody className="p-4">
									<TabContent activeTab={activeTab}>
										<TabPane tabId="1">
											<Form
												onSubmit={(e) => {
													e.preventDefault();
													validation.handleSubmit();
													return false;
												}}
												action="#"
											>
												<Row className="mb-3">
													<Col lg={3}>
														<Label htmlFor="nameInput" className="form-label">
															Name
														</Label>
													</Col>
													<Col lg={9}>
														<Input
															name="name"
															type="text"
															className="form-control"
															id="nameInput"
															placeholder="Enter your name"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.name || ""}
															invalid={validation.touched.name && validation.errors.name ? true : false}
														/>
														{validation.touched.name && validation.errors.name ? (
															<FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
														) : null}
													</Col>
												</Row>
												<Row className="mb-3">
													<Col lg={3}>
														<Label htmlFor="emailInput" className="form-label">
															Email
														</Label>
													</Col>
													<Col lg={9}>
														<Input
															name="email"
															type="email"
															className="form-control"
															id="emailInput"
															placeholder="Enter your email"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.email || ""}
															invalid={validation.touched.email && validation.errors.email ? true : false}
														/>
														{validation.touched.email && validation.errors.email ? (
															<FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
														) : null}
													</Col>
												</Row>
												<Row className="mb-3">
													<Col lg={3}>
														<Label htmlFor="phoneInput" className="form-label">
															Phone Number
														</Label>
													</Col>
													<Col lg={9}>
														<Input
															name="phoneNumber"
															type="text"
															className="form-control"
															id="phoneInput"
															placeholder="Enter your phone number"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.phoneNumber || ""}
														/>
													</Col>
												</Row>
												<Row className="mb-3" hidden>
													<Col lg={3}>
														<Label htmlFor="roleInput" className="form-label">
															User Role
														</Label>
													</Col>
													<Col lg={9}>
														<Input
															name="userRole"
															type="text"
															className="form-control"
															id="roleInput"
															placeholder="Enter your role name"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															value={validation.values.userRole || ""}
														/>
													</Col>
												</Row>

												<Row>
													<Col lg={12}>
														<div className="hstack gap-2 justify-content-end">
															{user.loading ? (
																<Button color="primary" className="btn-load">
																	<span className="d-flex align-items-center">
																		<Spinner size="sm" className="flex-shrink-0">
																			Loading...
																		</Spinner>
																		<span className="flex-grow-1 ms-2">Loading...</span>
																	</span>
																</Button>
															) : (
																<button type="submit" className="btn btn-primary">
																	Updates
																</button>
															)}
														</div>
													</Col>
												</Row>
											</Form>
										</TabPane>

										<TabPane tabId="2">
											<Form
												onSubmit={(e) => {
													e.preventDefault();
													validationAuth.handleSubmit();
													return false;
												}}
												action="#"
											>
												<Row className="mb-3">
													<Col lg={3}>
														<Label htmlFor="oldpasswordInput" className="form-label">
															Current Password*
														</Label>
													</Col>
													<Col lg={9}>
														<Input
															name="currentPassword"
															type="password"
															className="form-control"
															id="oldpasswordInput"
															placeholder="Current password"
															onChange={validationAuth.handleChange}
															onBlur={validationAuth.handleBlur}
															value={validationAuth.values.currentPassword || ""}
															invalid={validationAuth.touched.currentPassword && validationAuth.errors.currentPassword ? true : false}
														/>
														{validationAuth.touched.currentPassword && validationAuth.errors.currentPassword ? (
															<FormFeedback type="invalid">{validationAuth.errors.currentPassword}</FormFeedback>
														) : null}
													</Col>
												</Row>
												<Row className="mb-3">
													<Col lg={3}>
														<Label htmlFor="newpasswordInput" className="form-label">
															New Password*
														</Label>
													</Col>
													<Col lg={9}>
														<Input
															name="newPassword"
															type="password"
															className="form-control"
															id="newpasswordInput"
															placeholder="New password"
															onChange={validationAuth.handleChange}
															onBlur={validationAuth.handleBlur}
															value={validationAuth.values.newPassword || ""}
															invalid={validationAuth.touched.newPassword && validationAuth.errors.newPassword ? true : false}
														/>
														{validationAuth.touched.newPassword && validationAuth.errors.newPassword ? (
															<FormFeedback type="invalid">{validationAuth.errors.newPassword}</FormFeedback>
														) : null}
													</Col>
												</Row>
												<Row className="mb-3">
													<Col lg={3}>
														<Label htmlFor="confirmpasswordInput" className="form-label">
															Confirm Password*
														</Label>
													</Col>
													<Col lg={9}>
														<Input
															name="confirmPassword"
															type="password"
															className="form-control"
															id="confirmpasswordInput"
															placeholder="Confirm password"
															onChange={validationAuth.handleChange}
															onBlur={validationAuth.handleBlur}
															value={validationAuth.values.confirmPassword || ""}
															invalid={validationAuth.touched.confirmPassword && validationAuth.errors.confirmPassword ? true : false}
														/>
														{validationAuth.touched.confirmPassword && validationAuth.errors.confirmPassword ? (
															<FormFeedback type="invalid">{validationAuth.errors.confirmPassword}</FormFeedback>
														) : null}
													</Col>
												</Row>
												<Row>
													<Col lg={12}>
														<div className="hstack gap-2 justify-content-end">
															{changePwdUserSelect.loading && (
																<Button color="primary" className="btn-load">
																	<span className="d-flex align-items-center">
																		<Spinner size="sm" className="flex-shrink-0">
																			Loading...
																		</Spinner>
																		<span className="flex-grow-1 ms-2">Loading...</span>
																	</span>
																</Button>
															)}
															{changePwdUserSelect.redirecting && (
																<Button color="primary" className="btn-load">
																	<span className="d-flex align-items-center">
																		<Spinner size="sm" className="flex-shrink-0">
																			Redirecting...
																		</Spinner>
																		<span className="flex-grow-1 ms-2">Redirecting...</span>
																	</span>
																</Button>
															)}
															{!changePwdUserSelect.loading && !changePwdUserSelect.redirecting ? (
																<button type="submit" className="btn btn-primary">
																	Change Password
																</button>
															) : null}
														</div>
													</Col>
												</Row>
											</Form>
										</TabPane>
									</TabContent>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default withRouter(UserProfile);
