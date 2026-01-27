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

const WhyChoose = () => {
	document.title = "Site Setting | Admin & Dashboard";

	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [fileTwo, setFileTwo] = useState([]);
	const [fileThree, setFileThree] = useState([]);
	const [fileFour, setFileFour] = useState([]);
	const [fileFive, setFileFive] = useState([]);
	const [fileSix, setFileSix] = useState([]);
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (lang) => {
		settitleTap(lang);
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
		setFileTwo([]);
		setFileThree([]);
		setFileSix([]);
		setFileFour([]);
		setFileFive([]);
		dispatch(getSiteSetting("WHYCHOOSE"));
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "WHYCHOOSE",
			subtitle: siteSetting ? siteSetting.subtitle : "",
			subtitleKm: siteSetting ? siteSetting.subtitleKm : "",
			title: siteSetting ? siteSetting.title : "",
			titleKm: siteSetting ? siteSetting.titleKm : "",
			summary: siteSetting ? siteSetting.summary : "",
			summaryKm: siteSetting ? siteSetting.summaryKm : "",
			titleOne: siteSetting ? siteSetting.titleOne : "",
			titleOneKm: siteSetting ? siteSetting.titleOneKm : "",
			titleTwo: siteSetting ? siteSetting.titleTwo : "",
			titleTwoKm: siteSetting ? siteSetting.titleTwoKm : "",
			titleThree: siteSetting ? siteSetting.titleThree : "",
			titleThreeKm: siteSetting ? siteSetting.titleThreeKm : "",
			titleFour: siteSetting ? siteSetting.titleFour : "",
			titleFourKm: siteSetting ? siteSetting.titleFourKm : "",
			titleFive: siteSetting ? siteSetting.titleFive : "",
			titleFiveKm: siteSetting ? siteSetting.titleFiveKm : "",
			titleSix: siteSetting ? siteSetting.titleSix : "",
			titleSixKm: siteSetting ? siteSetting.titleSixKm : "",
			desOne: siteSetting ? siteSetting.desOne : "",
			desOneKm: siteSetting ? siteSetting.desOneKm : "",
			desTwo: siteSetting ? siteSetting.desTwo : "",
			desTwoKm: siteSetting ? siteSetting.desTwoKm : "",
			desThree: siteSetting ? siteSetting.desThree : "",
			desThreeKm: siteSetting ? siteSetting.desThreeKm : "",
			desFour: siteSetting ? siteSetting.desFour : "",
			desFourKm: siteSetting ? siteSetting.desFourKm : "",
			desFive: siteSetting ? siteSetting.desFive : "",
			desFiveKm: siteSetting ? siteSetting.desFiveKm : "",
			desSix: siteSetting ? siteSetting.desSix : "",
			desSixKm: siteSetting ? siteSetting.desSixKm : "",
			image: siteSetting ? siteSetting.image : "",
			image2: siteSetting ? siteSetting.image2 : "",
			image3: siteSetting ? siteSetting.image3 : "",
			image4: siteSetting ? siteSetting.image4 : "",
			image5: siteSetting ? siteSetting.image5 : "",
			image6: siteSetting ? siteSetting.image6 : "",
		},
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			values.image2 = fileTwo?.length > 0 ? fileTwo[0]?.serverId : "";
			values.image3 = fileThree?.length > 0 ? fileThree[0]?.serverId : "";
			values.image4 = fileFour?.length > 0 ? fileFour[0]?.serverId : "";
			values.image5 = fileFive?.length > 0 ? fileFive[0]?.serverId : "";
			values.image6 = fileSix?.length > 0 ? fileSix[0]?.serverId : "";
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				refreshForm();
			}
		},
	});

	const refreshForm = () => {
		setFile([]);
		dispatch(getSiteSetting("WHYCHOOSE"));
	};

	useEffect(() => {
		if (siteSetting) {
			if (siteSetting.image) {
				setFile([
					{
						source: siteSetting.image,
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

			if (siteSetting.image6) {
				setFileSix([
					{
						source: siteSetting.image6,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFileSix([]);
			}
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
												<Col xl={12}>
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
																<Label className="form-label" htmlFor="title-input">
																	Titlte
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
																	Summary
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
																<Label className="form-label" htmlFor="subtitle-km-input">
																	Subtitle Khmer
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="subtitle-input"
																	placeholder="Enter text"
																	name="subtitleKm"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.subtitleKm}
																	invalid={settingForm.touched.subtitleKm && settingForm.errors.subtitleKm ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="title-km-input">
																	Title Khmer
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
																	Summary Khmer
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

												<Col xl={12}>
													<Row>
														<Col xl={4}>
															<div className="box-choose">
																<TabContent activeTab={titleTap}>
																	<TabPane tabId={"ENG"} id="eng">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-one-input">
																				Title
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-one-input"
																				placeholder="Enter text"
																				name="titleOne"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleOne}
																				invalid={settingForm.touched.titleOne && settingForm.errors.titleOne ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-one-input">
																				Summary
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-one-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desOne"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desOne}
																			></textarea>
																		</div>
																	</TabPane>
																	<TabPane tabId={"KHM"} id="khm">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-one-km-input">
																				Title Khmer
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-one-km-input"
																				placeholder="Enter text"
																				name="titleOneKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleOneKm}
																				invalid={settingForm.touched.titleOneKm && settingForm.errors.titleOneKm ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-one-km-input">
																				Summary Khmer
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-one-km-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desOneKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desOneKm}
																			></textarea>
																		</div>
																	</TabPane>
																</TabContent>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="image-input">
																		Icon
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
															</div>
														</Col>
														<Col xl={4}>
															<div className="box-choose">
																<TabContent activeTab={titleTap}>
																	<TabPane tabId={"ENG"} id="eng">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-two-input">
																				Title
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-two-input"
																				placeholder="Enter text"
																				name="titleTwo"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleTwo}
																				invalid={settingForm.touched.titleTwo && settingForm.errors.titleTwo ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-two-input">
																				Summary
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-two-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desTwo"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desTwo}
																			></textarea>
																		</div>
																	</TabPane>
																	<TabPane tabId={"KHM"} id="khm">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-two-km-input">
																				Title Khmer
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-two-km-input"
																				placeholder="Enter text"
																				name="titleTwoKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleTwoKm}
																				invalid={settingForm.touched.titleTwoKm && settingForm.errors.titleTwoKm ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-two-km-input">
																				Summary Khmer
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-two-km-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desTwoKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desTwoKm}
																			></textarea>
																		</div>
																	</TabPane>
																</TabContent>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="image-input">
																		Icon
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
														<Col xl={4}>
															<div className="box-choose">
																<TabContent activeTab={titleTap}>
																	<TabPane tabId={"ENG"} id="eng">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-three-input">
																				Title
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-three-input"
																				placeholder="Enter text"
																				name="titleThree"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleThree}
																				invalid={settingForm.touched.titleThree && settingForm.errors.titleThree ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-three-input">
																				Summary
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-three-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desThree"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desThree}
																			></textarea>
																		</div>
																	</TabPane>
																	<TabPane tabId={"KHM"} id="khm">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-three-km-input">
																				Title Khmer
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-three-km-input"
																				placeholder="Enter text"
																				name="titleThreeKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleThreeKm}
																				invalid={settingForm.touched.titleThreeKm && settingForm.errors.titleThreeKm ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-three-km-input">
																				Summary Khmer
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-three-km-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desThreeKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desThreeKm}
																			></textarea>
																		</div>
																	</TabPane>
																</TabContent>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="image-input">
																		Icon
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
														<Col xl={4}>
															<div className="box-choose">
																<TabContent activeTab={titleTap}>
																	<TabPane tabId={"ENG"} id="eng">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-four-input">
																				Title
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-four-input"
																				placeholder="Enter text"
																				name="titleFour"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleFour}
																				invalid={settingForm.touched.titleFour && settingForm.errors.titleFour ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-four-input">
																				Summary
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-four-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desFour"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desFour}
																			></textarea>
																		</div>
																	</TabPane>
																	<TabPane tabId={"KHM"} id="khm">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-four-km-input">
																				Title Khmer
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-four-km-input"
																				placeholder="Enter text"
																				name="titleFourKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleFourKm}
																				invalid={settingForm.touched.titleFourKm && settingForm.errors.titleFourKm ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-four-km-input">
																				Summary Khmer
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-four-km-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desFourKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desFourKm}
																			></textarea>
																		</div>
																	</TabPane>
																</TabContent>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="image-input">
																		Icon
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
														<Col xl={4}>
															<div className="box-choose">
																<TabContent activeTab={titleTap}>
																	<TabPane tabId={"ENG"} id="eng">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-five-input">
																				Title
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-five-input"
																				placeholder="Enter text"
																				name="titleFive"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleFive}
																				invalid={settingForm.touched.titleFive && settingForm.errors.titleFive ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-five-input">
																				Summary
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-five-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desFive"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desFive}
																			></textarea>
																		</div>
																	</TabPane>
																	<TabPane tabId={"KHM"} id="khm">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-five-km-input">
																				Title Khmer
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-five-km-input"
																				placeholder="Enter text"
																				name="titleFiveKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleFiveKm}
																				invalid={settingForm.touched.titleFiveKm && settingForm.errors.titleFiveKm ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-five-km-input">
																				Summary Khmer
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-five-km-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desFiveKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desFiveKm}
																			></textarea>
																		</div>
																	</TabPane>
																</TabContent>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="image-input">
																		Icon
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
														<Col xl={4}>
															<div className="box-choose">
																<TabContent activeTab={titleTap}>
																	<TabPane tabId={"ENG"} id="eng">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-six-input">
																				Title
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-six-input"
																				placeholder="Enter text"
																				name="titleSix"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleSix}
																				invalid={settingForm.touched.titleSix && settingForm.errors.titleSix ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-six-input">
																				Summary
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-six-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desSix"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desSix}
																			></textarea>
																		</div>
																	</TabPane>
																	<TabPane tabId={"KHM"} id="khm">
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="title-six-km-input">
																				Title Khmer
																			</Label>
																			<Input
																				type="text"
																				className="form-control"
																				id="title-six-km-input"
																				placeholder="Enter text"
																				name="titleSixKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.titleSixKm}
																				invalid={settingForm.touched.titleSixKm && settingForm.errors.titleSixKm ? true : false}
																			/>
																		</div>
																		<div className="mb-3">
																			<Label className="form-label" htmlFor="summary-six-km-input">
																				Summary Khmer
																			</Label>
																			<textarea
																				className="form-control"
																				id="summary-six-km-input"
																				rows="3"
																				placeholder="Enter text"
																				name="desSixKm"
																				onChange={settingForm.handleChange}
																				onBlur={settingForm.handleBlur}
																				value={settingForm.values.desSixKm}
																			></textarea>
																		</div>
																	</TabPane>
																</TabContent>
																<div className="mb-3">
																	<Label className="form-label" htmlFor="image-input">
																		Icon
																	</Label>
																	<div className="position-relative d-block mx-auto">
																		<div style={{ width: "100%" }}>
																			<FilePond
																				labelIdle='<span class="filepond--label-action">Choose Image</span>'
																				files={fileSix}
																				onupdatefiles={setFileSix}
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
													</Row>
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

export default withRouter(WhyChoose);
