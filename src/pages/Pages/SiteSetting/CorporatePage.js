import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Nav, NavItem, NavLink, Col, Container, Form, Input, Label, Row, Spinner, TabContent, TabPane, Modal, ModalHeader, ModalBody } from "reactstrap";
import { api } from "../../../config";
import TinymceEditor from "../../../Components/Common/TinymceEditor";

import { useDispatch, useSelector } from "react-redux";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { getSiteSetting, resetSiteSettingFlag, saveSiteSetting } from "../../../store/actions";
import { createSelector } from "reselect";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import withRouter from "../../../Components/Common/withRouter";
import LayoutNav from "./LayoutNav";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CorporatePage = () => {
	document.title = "Site Setting | Admin & Dashboard";

	const dispatch = useDispatch();
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (lang) => {
		settitleTap(lang);
	}
	const [privacyStatement, setPrivacyStatement] = useState("");
	const [privacyStatementKm, setPrivacyStatementKm] = useState("");
	const [privacy, setPrivacy] = useState([]);
	const [edit, setEdit] = useState("");
	const [showModal, setShowModal] = useState(false);

	const siteSettingSelector = createSelector(
		(state) => state.SiteSettingReducer,
		(layout) => ({
			siteSetting: layout.siteSetting,
			message: layout.message,
			isLoading: layout.isLoading,
			success: layout.success,
			error: layout.error,
		})
	);
	const { siteSetting, message, isLoading, success, error } = useSelector(siteSettingSelector);

	useEffect(() => {
		dispatch(getSiteSetting("CORPORATE"));
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "CORPORATE",
			subtitle: siteSetting ? siteSetting.subtitle : "",
			subtitleKm: siteSetting ? siteSetting.subtitleKm : "",
			summary: siteSetting ? siteSetting.summary : "",
			summaryKm: siteSetting ? siteSetting.summaryKm : "",
			title: siteSetting ? siteSetting.title : "",
			titleKm: siteSetting ? siteSetting.titleKm : "",
			privacy: siteSetting ? siteSetting.privacy : [],
		},
		onSubmit: (values) => {
			values.privacy = privacy;
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				setTimeout(() => {
					refreshForm();
				}, 100);
			}
		},
	});

	const refreshForm = () => {
		dispatch(getSiteSetting("CORPORATE"));
	};

	useEffect(() => {
		if(siteSetting?.privacy){
			setPrivacy(siteSetting?.privacy);
		}
	},[siteSetting]);

	const addPrivacy = (event) => {
		if (privacyStatement) {
			setPrivacy([...privacy, { title: privacyStatement, titleKm: privacyStatementKm }]);
			setShowModal(false);
			setPrivacyStatement("");
			setPrivacyStatementKm("");
		}
	}

	const deletePrivacy = (id) => {
		const privacyDelete = privacy.filter((q, index) => index != id);
		setPrivacy(privacyDelete);
	}

	const closeModal = () => {
		setShowModal(false);
	}

	const findPrivacy = (id) => {
		const privacyFind = privacy.find((q, index) => index == id);
		setEdit(id + 1);
		setShowModal(true);
		setPrivacyStatement(privacyFind?.title);
		setPrivacyStatementKm(privacyFind?.titleKm);
	}

	const editPrivacy = (id) => {
		const privacyEdit = privacy.map((q, index) => {
			if((index + 1) == edit){
				return {
					...q,
					title: privacyStatement,
					titleKm: privacyStatementKm
				}
			} else {
				return q;
			}
		});
		setPrivacy(privacyEdit);
		setEdit("");
		setShowModal(false);
	}

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Site Setting" pageTitle="Dashboard" pageLink="/" />
					<Row>
						<Col xs={12}>
							<Card>
								<CardBody>
									<LayoutNav />
								</CardBody>
							</Card>
						</Col>
						<Col xl={12}>
							<Form
								onSubmit={(e) => {
									e.preventDefault();
									settingForm.handleSubmit();
									return false;
								}}
								action="#"
							>
								{/* <h5 className="fs-14 mb-3">General</h5> */}
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
															English
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
															Khmer
														</NavLink>
													</NavItem>
												</Nav>
											</div>
										</div>
									</CardHeader>
									<CardBody>
										{isLoading ? (
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										) : (
											<Row>
												<Col xl={12}>
													<TabContent activeTab={titleTap}>
														<TabPane tabId={"ENG"} id="eng">
															<div className="mb-3">
																<Label className="form-label" htmlFor="companyName-input">
																	Title
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="companyName-input"
																	placeholder="Enter text"
																	name="title"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.title}
																	invalid={settingForm.touched.title && settingForm.errors.title ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="summary-input">
																	Summary
																</Label>
																<textarea
																	rows={4}
																	className="form-control"
																	id="summary-input"
																	placeholder="Enter text"
																	name="summary"
																	onChange={settingForm.handleChange}
																	value={settingForm.values.summary}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="subtitle-input">
																	Subtitle
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="subtitle-input"
																	placeholder="Enter text"
																	name="subtitle"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.subtitle}
																	invalid={settingForm.touched.subtitle && settingForm.errors.subtitle ? true : false}
																/>
															</div>
														</TabPane>
														<TabPane tabId={"KHM"} id="khm">
															<div className="mb-3">
																<Label className="form-label" htmlFor="companyName-km-input">
																	Title Khmer
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="companyName-km-input"
																	placeholder="Enter text"
																	name="titleKm"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.titleKm}
																	invalid={settingForm.touched.titleKm && settingForm.errors.titleKm ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="summary-km-input">
																	Summary Khmer
																</Label>
																<textarea
																	rows={4}
																	className="form-control"
																	id="summary-km-input"
																	placeholder="Enter text"
																	name="summaryKm"
																	onChange={settingForm.handleChange}
																	value={settingForm.values.summaryKm}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="subtitle-km-input">
																	Subtitle Khmer
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="subtitle-km-input"
																	placeholder="Enter text"
																	name="subtitleKm"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.subtitleKm}
																	invalid={settingForm.touched.subtitleKm && settingForm.errors.subtitleKm ? true : false}
																/>
															</div>
														</TabPane>
													</TabContent>
												</Col>
												<Col xl={12}>
													<div className="mb-3">
														<div className="container-phone-number">
															<ul>
																<li>
																	<span style={{flex: "5%",maxWidth: "5%", textAlign: "center"}}>No</span>
																	<h5>Privacy Statement</h5>
																	<div className="content-btn text-center">
																		<span className="btn-primary" onClick={() => {
																			setShowModal(true);
																			setPrivacyStatement("");
																			setPrivacyStatementKm("");
																			setEdit("");
																		}}>Add Privacy</span>
																	</div>
																</li>
																{
																	privacy.map((q, index) => (
																		<li key={index}>
																			<span style={{flex: "5%",maxWidth: "5%", textAlign: "center"}}>{index + 1}</span>
																			<h5>{q?.title}</h5>
																			<div className="content-btn">
																				<span className="mdi mdi-file-edit" onClick={() => findPrivacy(index)}></span>
																				<span className="mdi mdi-delete-empty" onClick={() => deletePrivacy(index)}></span>
																			</div>
																		</li>
																	))
																}
															</ul>
														</div>
													</div>
												</Col>
											</Row>
										)}
									</CardBody>
								</Card>
								<div className="text-start mb-4">
									{isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save
										</Button>
									)}{" "}
									<Button color="dark" className="btn" outline onClick={() => refreshForm()}>
										<i className="ri-refresh-line me-1 align-bottom"></i> Refresh
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
			<Modal
				isOpen={showModal}
				toggle={() => {
					closeModal();
				}}
				backdrop={"static"}
				id="staticBackdrop"
				centered
			>
				<ModalHeader toggle={() => closeModal()}>
					{edit ? "Update" : "Create"} Privacy
				</ModalHeader>
				<ModalBody>
					<form onSubmit={(e) => {
						e.preventDefault();
						if(edit == ""){
							addPrivacy(e.target);
						} else {
							editPrivacy(e.target);
						}
						return false;
					}} action="#">
						<div className="mb-3">
							<Label className="form-label" htmlFor="title-privacy-input">
								Title
							</Label>
							<Input
								type="text"
								className="form-control"
								id="title-privacy-input"
								placeholder="Enter text"
								name="title"
								onChange={(e) => setPrivacyStatement(e.target.value)}
								value={privacyStatement}
							/>
						</div>
						<div className="mb-3">
							<Label className="form-label" htmlFor="title-privacy-km-input">
								Title Khmer
							</Label>
							<Input
								type="text"
								className="form-control"
								id="title-privacy-km-input"
								placeholder="Enter text"
								name="titleKm"
								onChange={(e) => setPrivacyStatementKm(e.target.value)}
								value={privacyStatementKm}
							/>
						</div>
						<div className="text-start">
							<Button type="submit" color="primary" className="btn-label">
								<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save
							</Button>
						</div>
					</form>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default withRouter(CorporatePage);
