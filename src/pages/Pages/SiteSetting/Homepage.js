import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Nav, NavItem, NavLink, Col, Container, Form, Input, Label, Row, Spinner, TabContent, TabPane } from "reactstrap";
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

const Homepage = () => {
	document.title = "Site Setting | Admin & Dashboard";

	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (lang) => {
		settitleTap(lang);
	}
	const [contentDesc, setContentDesc] = useState("");
	const [contentKmDesc, setContentKmDesc] = useState("");

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	}

	const handleEditorChangeKm = (e) => {
		setContentKmDesc(e.target.getContent());
	}

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
		setFile([]);
		dispatch(getSiteSetting("HOMEPAGE"));
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "HOMEPAGE",
			subtitle: siteSetting ? siteSetting.subtitle : "",
			subtitleKm: siteSetting ? siteSetting.subtitleKm : "",
			companyName: siteSetting ? siteSetting.companyName : "",
			companyNameKm: siteSetting ? siteSetting.companyNameKm : "",
			aboutCompany: siteSetting ? siteSetting.aboutCompany : "",
			aboutCompanyKm: siteSetting ? siteSetting.aboutCompanyKm : "",
			subtitleTwo: siteSetting ? siteSetting.subtitleTwo : "",
			subtitleTwoKm: siteSetting ? siteSetting.subtitleTwoKm : "",
			title: siteSetting ? siteSetting.title : "",
			titleKm: siteSetting ? siteSetting.titleKm : "",
			summary: siteSetting ? siteSetting.summary : "",
			summaryKm: siteSetting ? siteSetting.summaryKm : "",
			thumbnail: siteSetting ? siteSetting.thumbnail : "",
		},
		onSubmit: (values) => {
			values.thumbnail = file?.length > 0 ? file[0]?.serverId : "";
			values.aboutCompany = contentDesc ? contentDesc : "";
			values.aboutCompanyKm = contentKmDesc ? contentKmDesc : "";
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				refreshForm();
			}
		},
	});

	const refreshForm = () => {
		setFile([]);
		dispatch(getSiteSetting("HOMEPAGE"));
	};

	useEffect(() => {
		if (siteSetting) {
			setContentDesc(siteSetting.aboutCompany);
			setContentKmDesc(siteSetting.aboutCompanyKm);
			if (siteSetting.thumbnail) {
				setFile([
					{
						source: siteSetting.thumbnail,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}
		} else {
			setContentDesc("");
			setContentKmDesc("");
		}
	}, [siteSetting]);

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
												<Col xl={8}>
													<TabContent activeTab={titleTap}>
														<TabPane tabId={"ENG"} id="eng">
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
															<div className="mb-3">
																<Label className="form-label" htmlFor="companyName-input">
																	Company's name 
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="companyName-input"
																	placeholder="Enter text"
																	name="companyName"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.companyName}
																	invalid={settingForm.touched.companyName && settingForm.errors.companyName ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label>About Company</Label>
																<TinymceEditor onUploadImage={handleEditorChange} initDataValue={contentDesc} />
															</div>
														</TabPane>
														<TabPane tabId={"KHM"} id="khm">
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
															<div className="mb-3">
																<Label className="form-label" htmlFor="companyName-km-input">
																	Company's name Khmer
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="companyName-km-input"
																	placeholder="Enter text"
																	name="companyNameKm"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.companyNameKm}
																	invalid={settingForm.touched.companyNameKm && settingForm.errors.companyNameKm ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label>About Company Khmer</Label>
																<TinymceEditor onUploadImage={handleEditorChangeKm} initDataValue={contentKmDesc} />
															</div>
														</TabPane>
													</TabContent>
												</Col>
												<Col xl={4}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="thumbnail-input">
															Thumbnail
														</Label>
														<div className="position-relative d-block mx-auto">
															<div style={{ width: "100%" }}>
																<FilePond
																	labelIdle='<span class="filepond--label-action">Choose Image</span>'
																	files={file}
																	onupdatefiles={setFile}
																	allowMultiple={false}
																	maxFiles={1}
																	name="file"
																	server={`${api.BASE_URL}/save-image/site-setting`}
																	className="filepond filepond-input-multiple"
																/>
															</div>
														</div>
													</div>
												</Col>
											</Row>
										)}
									</CardBody>
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
																<Label className="form-label" htmlFor="subtitle-news-input">
																	Subtitle News
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="subtitle-news-input"
																	placeholder="Enter text"
																	name="subtitleTwo"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.subtitleTwo}
																	invalid={settingForm.touched.subtitleTwo && settingForm.errors.subtitleTwo ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="title-input">
																	Titlte News
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="title-input"
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
																	Summary News
																</Label>
																<textarea
																	className="form-control"
																	id="summary-input"
																	rows="3"
																	placeholder="Enter text"
																	name="summary"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.summary}
																></textarea>
															</div>
														</TabPane>
														<TabPane tabId={"KHM"} id="khm">
															<div className="mb-3">
																<Label className="form-label" htmlFor="subtitle-news-km-input">
																	Subtitle News Khmer
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="subtitle-news-input"
																	placeholder="Enter text"
																	name="subtitleTwoKm"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.subtitleTwoKm}
																	invalid={settingForm.touched.subtitleTwoKm && settingForm.errors.subtitleTwoKm ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="title-km-input">
																	Titlte News Khmer
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="title-km-input"
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
																	Summary News Khmer
																</Label>
																<textarea
																	className="form-control"
																	id="summary-km-input"
																	rows="3"
																	placeholder="Enter text"
																	name="summaryKm"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.summaryKm}
																></textarea>
															</div>
														</TabPane>
													</TabContent>
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
		</React.Fragment>
	);
};

export default withRouter(Homepage);
