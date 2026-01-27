import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Form, Nav, NavItem, NavLink, CardHeader, Input, Label, Row, Spinner, TabContent, TabPane } from "reactstrap";
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

const AboutCompany = () => {
	document.title = "Site Setting | Admin & Dashboard";

	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [fileTwo, setFileTwo] = useState([]);
	const [fileThree, setFileThree] = useState([]);
	const [fileFour, setFileFour] = useState([]);
	const [fileFive, setFileFive] = useState([]);
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

	const [contentTwoDesc, setContentTwoDesc] = useState("");
	const [contentTwoKmDesc, setContentTwoKmDesc] = useState("");

	const handleEditorChangeTwo = (e) => {
		setContentTwoDesc(e.target.getContent());
	}

	const handleEditorChangeTwoKm = (e) => {
		setContentTwoKmDesc(e.target.getContent());
	}

	const [contentThreeDesc, setContentThreeDesc] = useState("");
	const [contentThreeKmDesc, setContentThreeKmDesc] = useState("");

	const handleEditorChangeThree = (e) => {
		setContentThreeDesc(e.target.getContent());
	}

	const handleEditorChangeThreeKm = (e) => {
		setContentThreeKmDesc(e.target.getContent());
	}

	const [contentFourDesc, setContentFourDesc] = useState("");
	const [contentFourKmDesc, setContentFourKmDesc] = useState("");

	const handleEditorChangeFour = (e) => {
		setContentFourDesc(e.target.getContent());
	}

	const handleEditorChangeFourKm = (e) => {
		setContentFourKmDesc(e.target.getContent());
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
		dispatch(getSiteSetting("ABOUTCOMPANY"));
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "ABOUTCOMPANY",
			subtitle: siteSetting ? siteSetting.subtitle : "",
			subtitleKm: siteSetting ? siteSetting.subtitleKm : "",
			companyName: siteSetting ? siteSetting.companyName : "",
			companyNameKm: siteSetting ? siteSetting.companyNameKm : "",
			aboutCompany: siteSetting ? siteSetting.aboutCompany : "",
			aboutCompanyKm: siteSetting ? siteSetting.aboutCompanyKm : "",
			titleVision: siteSetting ? siteSetting.titleVision : "",
			titleVisionKm: siteSetting ? siteSetting.titleVisionKm : "",
			desVision: siteSetting ? siteSetting.desVision : "",
			desVisionKm: siteSetting ? siteSetting.desVisionKm : "",
			titleMission: siteSetting ? siteSetting.titleMission : "",
			titleMissionKm: siteSetting ? siteSetting.titleMissionKm : "",
			desMission: siteSetting ? siteSetting.desMission : "",
			desMissionKm: siteSetting ? siteSetting.desMissionKm : "",
			titleValue: siteSetting ? siteSetting.titleValue : "",
			titleValueKm: siteSetting ? siteSetting.titleValueKm : "",
			desValue: siteSetting ? siteSetting.desValue : "",
			desValueKm: siteSetting ? siteSetting.desValueKm : "",
			subtitlePartner: siteSetting ? siteSetting.subtitlePartner : "",
			subtitlePartnerKm: siteSetting ? siteSetting.subtitlePartnerKm : "",
			titlePartner: siteSetting ? siteSetting.titlePartner : "",
			titlePartnerKm: siteSetting ? siteSetting.titlePartnerKm : "",
			valuePartner: siteSetting ? siteSetting.valuePartner : "",
			subtitleAward: siteSetting ? siteSetting.subtitleAward : "",
			subtitleAwardKm: siteSetting ? siteSetting.subtitleAwardKm : "",
			titleAward: siteSetting ? siteSetting.titleAward : "",
			titleAwardKm: siteSetting ? siteSetting.titleAwardKm : "",
			summaryAward: siteSetting ? siteSetting.summaryAward : "",
			summaryAwardKm: siteSetting ? siteSetting.summaryAwardKm : "",
			thumbnail: siteSetting ? siteSetting.thumbnail : "",
			image2: siteSetting ? siteSetting.image2 : "",
			image3: siteSetting ? siteSetting.image3 : "",
			image4: siteSetting ? siteSetting.image4 : "",
			image5: siteSetting ? siteSetting.image5 : "",
		},
		onSubmit: (values) => {
			values.thumbnail = file?.length > 0 ? file[0]?.serverId : "";
			values.aboutCompany = contentDesc ? contentDesc : "";
			values.aboutCompanyKm = contentKmDesc ? contentKmDesc : "";
			values.desVision = contentTwoDesc ? contentTwoDesc : "";
			values.desVisionKm = contentTwoKmDesc ? contentTwoKmDesc : "";
			values.desMission = contentThreeDesc ? contentThreeDesc : "";
			values.desMissionKm = contentThreeKmDesc ? contentThreeKmDesc : "";
			values.desValue = contentFourDesc ? contentFourDesc : "";
			values.desValueKm = contentFourKmDesc ? contentFourKmDesc : "";
			values.image2 = fileTwo?.length > 0 ? fileTwo[0]?.serverId : "";
			values.image3 = fileThree?.length > 0 ? fileThree[0]?.serverId : "";
			values.image4 = fileFour?.length > 0 ? fileFour[0]?.serverId : "";
			values.image5 = fileFive?.length > 0 ? fileFive[0]?.serverId : "";
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				refreshForm();
			}
		},
	});

	const refreshForm = () => {
		setFile([]);
		setFileFive([]);
		setFileFour([]);
		setFileThree([]);
		setFileTwo([]);
		setContentDesc("");
		setContentFourDesc("");
		setContentFourKmDesc("");
		setContentKmDesc("");
		setContentThreeDesc("");
		setContentThreeKmDesc("");
		setContentTwoDesc("");
		setContentTwoKmDesc("");
		dispatch(getSiteSetting("ABOUTCOMPANY"));
	};

	useEffect(() => {
		if (siteSetting) {
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

			if (siteSetting.image2) {
				setFileTwo([
					{
						source: siteSetting.image2,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFileTwo([]);
			}

			if (siteSetting.image3) {
				setFileThree([
					{
						source: siteSetting.image3,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFileThree([]);
			}

			if (siteSetting.image4) {
				setFileFour([
					{
						source: siteSetting.image4,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFileFour([]);
			}

			if (siteSetting.image5) {
				setFileFive([
					{
						source: siteSetting.image5,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFileFive([]);
			}

			setContentDesc(siteSetting ? siteSetting.aboutCompany : "");
			setContentFourDesc(siteSetting ? siteSetting.desValue : "");
			setContentFourKmDesc(siteSetting ? siteSetting.desValueKm : "");
			setContentKmDesc(siteSetting ? siteSetting.aboutCompanyKm : "");
			setContentThreeDesc(siteSetting ? siteSetting.desMission : "");
			setContentThreeKmDesc(siteSetting ? siteSetting.desMissionKm : "");
			setContentTwoDesc(siteSetting ? siteSetting.desVision : "");
			setContentTwoKmDesc(siteSetting ? siteSetting.desVisionKm : "");
		} else {
			setFile([]);
			setFileFive([]);
			setFileFour([]);
			setFileThree([]);
			setFileTwo([]);
			setContentDesc("");
			setContentFourDesc("");
			setContentFourKmDesc("");
			setContentKmDesc("");
			setContentThreeDesc("");
			setContentThreeKmDesc("");
			setContentTwoDesc("");
			setContentTwoKmDesc("");
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
															Thumbnail <span className="danger">(540 x 360 px)</span>
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

												<Col xl={6}>
													<div className="box-choose">
														<div className="mb-3">
															<h2>Vision Statement</h2>
														</div>
														<TabContent activeTab={titleTap}>
															<TabPane tabId={"ENG"} id="eng">
																<div className="mb-3">
																	<Label className="form-label" htmlFor="title-vision-input">
																		Title Vision
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="title-vision-input"
																		placeholder="Enter text"
																		name="titleVision"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.titleVision}
																		invalid={settingForm.touched.titleVision && settingForm.errors.titleVision ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label>Description</Label>
																	<TinymceEditor onUploadImage={handleEditorChangeTwo} initDataValue={contentTwoDesc} />
																</div>
															</TabPane>
															<TabPane tabId={"KHM"} id="khm">
																<div className="mb-3">
																	<Label className="form-label" htmlFor="title-vision-km-input">
																		Title Vision Khmer
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="title-vision-km-input"
																		placeholder="Enter text"
																		name="titleVisionKm"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.titleVisionKm}
																		invalid={settingForm.touched.titleVisionKm && settingForm.errors.titleVisionKm ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label>Description Khmer</Label>
																	<TinymceEditor onUploadImage={handleEditorChangeTwoKm} initDataValue={contentTwoKmDesc} />
																</div>
															</TabPane>
														</TabContent>
														<div className="mb-3">
															<Label className="form-label" htmlFor="thumbnail-input">
																Thumbnail <span className="danger">(470 x 345 px)</span>
															</Label>
															<div className="position-relative d-block mx-auto">
																<div style={{ width: "100%" }}>
																	<FilePond
																		labelIdle='<span class="filepond--label-action">Choose Image</span>'
																		files={fileTwo}
																		onupdatefiles={setFileTwo}
																		allowMultiple={false}
																		maxFiles={1}
																		name="file"
																		server={`${api.BASE_URL}/save-image/site-setting`}
																		className="filepond filepond-input-multiple"
																	/>
																</div>
															</div>
														</div>
													</div>
												</Col>

												<Col xl={6}>
													<div className="box-choose">
														<div className="mb-3">
															<h2>Mission Statement</h2>
														</div>
														<TabContent activeTab={titleTap}>
															<TabPane tabId={"ENG"} id="eng">
																<div className="mb-3">
																	<Label className="form-label" htmlFor="title-mission-input">
																		Title Mission
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="title-mission-input"
																		placeholder="Enter text"
																		name="titleMission"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.titleMission}
																		invalid={settingForm.touched.titleMission && settingForm.errors.titleMission ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label>Description</Label>
																	<TinymceEditor onUploadImage={handleEditorChangeThree} initDataValue={contentThreeDesc} />
																</div>
															</TabPane>
															<TabPane tabId={"KHM"} id="khm">
																<div className="mb-3">
																	<Label className="form-label" htmlFor="title-mission-km-input">
																		Title Mission Khmer
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="title-mission-km-input"
																		placeholder="Enter text"
																		name="titleMissionKm"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.titleMissionKm}
																		invalid={settingForm.touched.titleMissionKm && settingForm.errors.titleMissionKm ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label>Description Khmer</Label>
																	<TinymceEditor onUploadImage={handleEditorChangeThreeKm} initDataValue={contentThreeKmDesc} />
																</div>
															</TabPane>
														</TabContent>
														<div className="mb-3">
															<Label className="form-label" htmlFor="thumbnail-input">
																Thumbnail <span className="danger">(470 x 345 px)</span>
															</Label>
															<div className="position-relative d-block mx-auto">
																<div style={{ width: "100%" }}>
																	<FilePond
																		labelIdle='<span class="filepond--label-action">Choose Image</span>'
																		files={fileThree}
																		onupdatefiles={setFileThree}
																		allowMultiple={false}
																		maxFiles={1}
																		name="file"
																		server={`${api.BASE_URL}/save-image/site-setting`}
																		className="filepond filepond-input-multiple"
																	/>
																</div>
															</div>
														</div>
													</div>
												</Col>

												<Col xl={6}>
													<div className="box-choose">
														<div className="mb-3">
															<h2>Our Value</h2>
														</div>
														<TabContent activeTab={titleTap}>
															<TabPane tabId={"ENG"} id="eng">
																<div className="mb-3">
																	<Label className="form-label" htmlFor="title-value-input">
																		Title Value
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="title-value-input"
																		placeholder="Enter text"
																		name="titleValue"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.titleValue}
																		invalid={settingForm.touched.titleValue && settingForm.errors.titleValue ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label>Description</Label>
																	<TinymceEditor onUploadImage={handleEditorChangeFour} initDataValue={contentFourDesc} />
																</div>
															</TabPane>
															<TabPane tabId={"KHM"} id="khm">
																<div className="mb-3">
																	<Label className="form-label" htmlFor="title-value-km-input">
																		Title Value Khmer
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="title-value-km-input"
																		placeholder="Enter text"
																		name="titleValueKm"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.titleValueKm}
																		invalid={settingForm.touched.titleValueKm && settingForm.errors.titleValueKm ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label>Description Khmer</Label>
																	<TinymceEditor onUploadImage={handleEditorChangeFourKm} initDataValue={contentFourKmDesc} />
																</div>
															</TabPane>
														</TabContent>
														<div className="mb-3">
															<Label className="form-label" htmlFor="thumbnail-input">
																Thumbnail <span className="danger">(470 x 345 px)</span>
															</Label>
															<div className="position-relative d-block mx-auto">
																<div style={{ width: "100%" }}>
																	<FilePond
																		labelIdle='<span class="filepond--label-action">Choose Image</span>'
																		files={fileFour}
																		onupdatefiles={setFileFour}
																		allowMultiple={false}
																		maxFiles={1}
																		name="file"
																		server={`${api.BASE_URL}/save-image/site-setting`}
																		className="filepond filepond-input-multiple"
																	/>
																</div>
															</div>
														</div>
													</div>
												</Col>

												<Col xl={6}>
													<div className="box-choose">
														<div className="mb-3">
															<h2>Our Partners</h2>
														</div>
														<TabContent activeTab={titleTap}>
															<TabPane tabId={"ENG"} id="eng">
																<div className="mb-3">
																	<Label className="form-label" htmlFor="subtitle-partner-input">
																		Subtitle Partner
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="subtitle-partner-input"
																		placeholder="Enter text"
																		name="subtitlePartner"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.subtitlePartner}
																		invalid={settingForm.touched.subtitlePartner && settingForm.errors.subtitlePartner ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="title-partner-input">
																		Title Partner
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="title-partner-input"
																		placeholder="Enter text"
																		name="titlePartner"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.titlePartner}
																		invalid={settingForm.touched.titlePartner && settingForm.errors.titlePartner ? true : false}
																	/>
																</div>
															</TabPane>
															<TabPane tabId={"KHM"} id="khm">
																<div className="mb-3">
																	<Label className="form-label" htmlFor="subtitle-partner-km-input">
																		Subtitle Partner Khmer
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="subtitle-partner-km-input"
																		placeholder="Enter text"
																		name="subtitlePartnerKm"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.subtitlePartnerKm}
																		invalid={settingForm.touched.subtitlePartnerKm && settingForm.errors.subtitlePartnerKm ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="title-partner-km-input">
																		Title Partner Khmer
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="title-partner-km-input"
																		placeholder="Enter text"
																		name="titlePartnerKm"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.titlePartnerKm}
																		invalid={settingForm.touched.titlePartnerKm && settingForm.errors.titlePartnerKm ? true : false}
																	/>
																</div>
															</TabPane>
														</TabContent>
														<div className="mb-3">
															<Label className="form-label" htmlFor="value-partner-input">
																Value Partner
															</Label>
															<Input
																type="text"
																className="form-control"
																id="value-partner-input"
																placeholder="Enter value"
																name="valuePartner"
																onChange={settingForm.handleChange}
																onBlur={settingForm.handleBlur}
																value={settingForm.values.valuePartner}
																invalid={settingForm.touched.valuePartner && settingForm.errors.valuePartner ? true : false}
															/>
														</div>
														<div className="mb-3">
															<Label className="form-label" htmlFor="thumbnail-input">
																Thumbnail <span className="danger">(570 x 455 px)</span>
															</Label>
															<div className="position-relative d-block mx-auto">
																<div style={{ width: "100%" }}>
																	<FilePond
																		labelIdle='<span class="filepond--label-action">Choose Image</span>'
																		files={fileFive}
																		onupdatefiles={setFileFive}
																		allowMultiple={false}
																		maxFiles={1}
																		name="file"
																		server={`${api.BASE_URL}/save-image/site-setting`}
																		className="filepond filepond-input-multiple"
																	/>
																</div>
															</div>
														</div>
													</div>
												</Col>		

												<Col xl={12}>
													<div>
														<div className="mb-3">
															<h2>Awards & Honors</h2>
														</div>
														<TabContent activeTab={titleTap}>
															<TabPane tabId={"ENG"} id="eng">
																<div className="mb-3">
																	<Label className="form-label" htmlFor="subtitle-award-input">
																		Subtitle
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="subtitle-award-input"
																		placeholder="Enter text"
																		name="subtitleAward"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.subtitleAward}
																		invalid={settingForm.touched.subtitleAward && settingForm.errors.subtitleAward ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="title-award-input">
																		Title
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="title-award-input"
																		placeholder="Enter text"
																		name="titleAward"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.titleAward}
																		invalid={settingForm.touched.titleAward && settingForm.errors.titleAward ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="summary-award-input">
																		Summary
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="summary-award-input"
																		placeholder="Enter text"
																		name="summaryAward"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.summaryAward}
																		invalid={settingForm.touched.summaryAward && settingForm.errors.summaryAward ? true : false}
																	/>
																</div>
															</TabPane>
															<TabPane tabId={"KHM"} id="khm">
																<div className="mb-3">
																	<Label className="form-label" htmlFor="subtitle-award-km-input">
																		Subtitle Khmer
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="subtitle-award-km-input"
																		placeholder="Enter text"
																		name="subtitleAwardKm"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.subtitleAwardKm}
																		invalid={settingForm.touched.subtitleAwardKm && settingForm.errors.subtitleAwardKm ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="title-award-km-input">
																		Title Khmer
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="title-award-km-input"
																		placeholder="Enter text"
																		name="titleAwardKm"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.titleAwardKm}
																		invalid={settingForm.touched.titleAwardKm && settingForm.errors.titleAwardKm ? true : false}
																	/>
																</div>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="summary-award-km-input">
																		Summary Khmer
																	</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="summary-award-km-input"
																		placeholder="Enter text"
																		name="summaryAwardKm"
																		onChange={settingForm.handleChange}
																		onBlur={settingForm.handleBlur}
																		value={settingForm.values.summaryAwardKm}
																		invalid={settingForm.touched.summaryAwardKm && settingForm.errors.summaryAwardKm ? true : false}
																	/>
																</div>
															</TabPane>
														</TabContent>
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
		</React.Fragment>
	);
};

export default withRouter(AboutCompany);
