import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
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
import { deleteTrading, fetchTradingList, getSiteSetting, resetSiteSettingFlag, saveSiteSetting } from "../../../store/actions";
import { createSelector } from "reselect";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import withRouter from "../../../Components/Common/withRouter";
import LayoutNav from "./LayoutNav";
import CreateTrading from "./CreateTrading";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../Components/Common/Loader";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import CardComponents from "./CardComponents";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Platformpage = () => {
	document.title = "Site Setting | Admin & Dashboard";

	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [edit_id, setEdit_id] = useState(null);
	const [titleTap, settitleTap] = useState("ENG");
	const [image, setImage] = useState([]);
	const [image2, setImage2] = useState([]);
	const [platform1, setPlatform1] = useState([]);
	const [platform2, setPlatform2] = useState([]);
	const [platform3, setPlatform3] = useState([]);
	const [videoImage, setVideoImage] = useState([]);
	const [content, setContent] = useState("");
	const [contentKm, setContentKm] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setContent(e.target.getContent());
	}

	const handleChangeKm = (e) => {
		setContentKm(e.target.getContent());
	}

	const titleTapToggle = (lang) => {
		settitleTap(lang);
	}

	const createTradingSelector = createSelector(
		(state) => state.CreateTradingReducer,
		(layout) => ({
			isLoading: layout.isLoading,
			success: layout.success
		})
	);

	const useCreateTrading = useSelector(createTradingSelector);

	const listTradingSelector = createSelector(
		(state) => state.TradingListReducer,
		(layout) => ({
			tradings: layout.tradings,
			isLoading: layout.isLoading
		})
	);

	const trading = useSelector(listTradingSelector);

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
		dispatch(getSiteSetting("PLATFORM"));
		dispatch(fetchTradingList());
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "PLATFORM",
			title: siteSetting ? siteSetting.title : "",
			titleKm: siteSetting ? siteSetting.titleKm : "",
			description: siteSetting ? siteSetting?.description : "",
			descriptionKm: siteSetting ? siteSetting?.descriptionKm : "",
			label: siteSetting ? siteSetting?.label : "",
			labelKm: siteSetting ? siteSetting?.labelKm : "",
			linkTo: siteSetting ? siteSetting?.linkTo : "",
			image: siteSetting ? siteSetting?.image : "",
			service_title_eng: siteSetting ? siteSetting?.service_title_eng : "",
			service_title_km: siteSetting ? siteSetting?.service_title_km : "",
			image2: siteSetting ? siteSetting?.image2 : "",
			platform1: siteSetting ? siteSetting?.platform1 : "",
			link: siteSetting ? siteSetting?.link : "",
			platform2: siteSetting ? siteSetting?.platform2 : "",
			link2: siteSetting ? siteSetting?.link2 : "",
			platform3: siteSetting ? siteSetting?.platform3 : "",
			link3: siteSetting ? siteSetting?.link3 : "",
			phoneNumber: siteSetting ? siteSetting?.phoneNumber : "",
			whatsapp: siteSetting ? siteSetting?.whatsapp : "",
			linkedin: siteSetting ? siteSetting?.linkedin : "",
			guide_title_eng: siteSetting ? siteSetting?.guide_title_eng : "",
			guide_title_km: siteSetting ? siteSetting?.guide_title_km : "",
			video_title_eng: siteSetting ? siteSetting?.video_title_eng : "",
			video_title_km: siteSetting ? siteSetting?.video_title_km : "",
			video_thumbnail: siteSetting ? siteSetting?.video_thumbnail : "",
			video_link: siteSetting ? siteSetting?.video_link : "",
		},
		onSubmit: (values) => {
			values.image = image.length > 0 ? (image[0]?.serverId ? image[0]?.serverId : image[0]?.source) : "";
			values.image2 = image2.length > 0 ? (image2[0]?.serverId ? image2[0]?.serverId : image2[0]?.source) : "";
			values.platform1 = platform1.length > 0 ? (platform1[0]?.serverId ? platform1[0]?.serverId : platform1[0]?.source) : "";
			values.platform2 = platform2.length > 0 ? (platform2[0]?.serverId ? platform2[0]?.serverId : platform2[0]?.source) : "";
			values.platform3 = platform3.length > 0 ? (platform3[0]?.serverId ? platform3[0]?.serverId : platform3[0]?.source) : "";
			values.video_thumbnail = videoImage.length > 0 ? (videoImage[0]?.serverId ? videoImage[0]?.serverId : videoImage[0]?.source) : "";
			values.description = content;
			values.descriptionKm = contentKm;
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				refreshForm();
			}
		},
	});

	const refreshForm = () => {
		setImage([]);
		setImage2([]);
		setPlatform1([]);
		setPlatform2([]);
		setPlatform3([]);
		setVideoImage([]);
		setContent(null);
		setContentKm(null);
		dispatch(getSiteSetting("PLATFORM"));
	};

	useEffect(() => {
		if (siteSetting) {
			if (siteSetting.image) {
				setImage([
					{
						source: siteSetting.image,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setImage([]);
			}

			if (siteSetting.image2) {
				setImage2([
					{
						source: siteSetting.image2,
						options: { type: "local" },
					},
				]);
			} else {
				setImage2([]);
			}

			if (siteSetting.platform1) {
				setPlatform1([
					{ source: siteSetting.platform1, options: { type: "local" } },
				]);
			} else {
				setPlatform1([]);
			}

			if (siteSetting.platform2) {
				setPlatform2([
					{ source: siteSetting.platform2, options: { type: "local" } },
				]);
			} else {
				setPlatform2([]);
			}

			if (siteSetting.platform3) {
				setPlatform3([
					{ source: siteSetting.platform3, options: { type: "local" } },
				]);
			} else {
				setPlatform3([]);
			}

			if (siteSetting.video_thumbnail) {
				setVideoImage([
					{ source: siteSetting.video_thumbnail, options: { type: "local" } },
				]);
			} else {
				setVideoImage([]);
			}
			setContent(siteSetting?.description);
			setContentKm(siteSetting?.descriptionKm);
		}
	}, [siteSetting]);

	useEffect(() => {
		if(useCreateTrading.success && !useCreateTrading.isLoading){
			dispatch(fetchTradingList());
			setEdit_id(null);
		}
	},[dispatch,useCreateTrading.success,useCreateTrading.isLoading]);

	const [UID, setUID] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteTrading(UID));
			if (!trading.isLoading) {
				dispatch(fetchTradingList());
				setDeleteModal(false);
			}
		}
	};

	const columns = useMemo(
		() => [
			{
				Header: "ID",
				accessor: "id",
				Cell: (contact) => <span className="fw-semibold">{parseInt(contact.row.id) + 1}</span>,
				filterable: false,
			},
			{
				Header: "Image",
				accessor: "image",
				Cell: (item) => {
					return <img style={{width: 60}} src={api.FILE_URI + item.row.original.image} alt="" />;
				}
			},
			{
				Header: "Platform Guide",
				accessor: "title",
				filterable: false,
				Cell: (service) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-grow-1">
								<h5 className="fs-14 mb-1">
									{service.row.original.title}
								</h5>
							</div>
						</div>
					</>
				),
			},
			{
				Header: "Type",
				accessor: "type",
				filterable: false
			},
			{
				Header: "Ordering",
				accessor: "ordering",
				filterable: false,
			},
			{
				Header: "Action",
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							<li className="list-inline-item" title="Edit">
								<Link className="edit-item-btn" to={"#"} onClick={() => { 
									const LeadData = cellProps.row.original;
									setShow(true);
									setEdit_id(LeadData.id);
								}}>
									<i className="ri-pencil-fill align-bottom text-muted"></i>
								</Link>
							</li>
							<li className="list-inline-item" title="Delete">
								<Link
									className="remove-item-btn"
									onClick={() => {
										const LeadData = cellProps.row.original;
										setDeleteModal(true);
										setUID(LeadData.id);
									}}
									to="#"
								>
									<i className="ri-delete-bin-fill align-bottom text-muted"></i>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

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
																<Label className="form-label" htmlFor="title-input">
																	Title
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
																<Label className="form-label" htmlFor="description-input">
																	Description
																</Label>
																<TinymceEditor onUploadImage={handleChange} initDataValue={content} />
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="label-input">
																	Label
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="label-input"
																	placeholder="Enter text"
																	name="label"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.label}
																	invalid={settingForm.touched.label && settingForm.errors.label ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="linkTo-input">
																	Link
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="linkTo-input"
																	placeholder="Enter text"
																	name="linkTo"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.linkTo}
																	invalid={settingForm.touched.linkTo && settingForm.errors.linkTo ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="service-title-eng">
																	Service Title (English)
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="service-title-eng"
																	placeholder="Enter service title"
																	name="service_title_eng"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.service_title_eng}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="guide-title-eng">
																	Guide Title (English)
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="guide-title-eng"
																	placeholder="Enter guide title"
																	name="guide_title_eng"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.guide_title_eng}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="video-title-eng">
																	Video Title (English)
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="video-title-eng"
																	placeholder="Enter video title"
																	name="video_title_eng"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.video_title_eng}
																/>
															</div>
														</TabPane>
														<TabPane tabId={"KHM"} id="khm">
															<div className="mb-3">
																<Label className="form-label" htmlFor="title-km-input">
																	Title Khmer
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="title-km-input"
																	placeholder="Enter text khmer"
																	name="titleKm"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.titleKm}
																	invalid={settingForm.touched.titleKm && settingForm.errors.titleKm ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="description-input">
																	Description Khmer
																</Label>
																<TinymceEditor onUploadImage={handleChangeKm} initDataValue={contentKm} />
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="labelKm-input">
																	Label Khmer
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="labelKm-input"
																	placeholder="Enter text"
																	name="labelKm"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.labelKm}
																	invalid={settingForm.touched.labelKm && settingForm.errors.labelKm ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="linkTo-input">
																	Link
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="linkTo-input"
																	placeholder="Enter text"
																	name="linkTo"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.linkTo}
																	invalid={settingForm.touched.linkTo && settingForm.errors.linkTo ? true : false}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="service-title-km">
																	Service Title (Khmer)
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="service-title-km"
																	placeholder="Enter service title khmer"
																	name="service_title_km"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.service_title_km}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="guide-title-km">
																	Guide Title (Khmer)
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="guide-title-km"
																	placeholder="Enter guide title khmer"
																	name="guide_title_km"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.guide_title_km}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="video-title-km">
																	Video Title (Khmer)
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="video-title-km"
																	placeholder="Enter video title khmer"
																	name="video_title_km"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.video_title_km}
																/>
															</div>
														</TabPane>
													</TabContent>
													<div className="row">
														<div className="col-md-6">
															<div className="mb-3">
																<Label className="form-label" htmlFor="thumbnail-input">
																	Thumbnail <small className="text-danger">(1200 x 900 pixel)</small>
																</Label>
																<div className="position-relative d-block mx-auto">
																	<div style={{ width: "100%" }}>
																		<FilePond
																			labelIdle='<span class="filepond--label-action">Choose Image</span>'
																			files={image}
																			onupdatefiles={setImage}
																			allowMultiple={false}
																			maxFiles={1}
																			name="file"
																			server={`${api.BASE_URL}/save-image/sites-settings`}
																			className="filepond filepond-input-multiple"
																			stylePanelLayout="compact"
																		/>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="mb-3">
																<Label className="form-label" htmlFor="image2-input">
																	Thumbnail Two <small className="text-danger">(920 x 1300 pixel)</small>
																</Label>
																<div className="position-relative d-block mx-auto">
																	<div style={{ width: "100%" }}>
																		<FilePond
																			labelIdle='<span class="filepond--label-action">Choose Image</span>'
																			files={image2}
																			onupdatefiles={setImage2}
																			allowMultiple={false}
																			maxFiles={1}
																			name="file"
																			server={`${api.BASE_URL}/save-image/sites-settings`}
																			className="filepond filepond-input-multiple"
																			stylePanelLayout="compact"
																		/>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="row">
														<div className="col-md-4 mb-3">
															<Label className="form-label">Platform 1</Label>
															<FilePond
																labelIdle='<span class="filepond--label-action">Choose Image</span>'
																files={platform1}
																onupdatefiles={setPlatform1}
																allowMultiple={false}
																maxFiles={1}
																name="file"
																server={`${api.BASE_URL}/save-image/sites-settings`}
																className="filepond filepond-input-multiple"
																stylePanelLayout="compact"
															/>
															<Input
																className="form-control mt-2"
																placeholder="Link for platform 1"
																name="link"
																onChange={settingForm.handleChange}
																value={settingForm.values.link}
															/>
														</div>
														<div className="col-md-4 mb-3">
															<Label className="form-label">Platform 2</Label>
															<FilePond
																labelIdle='<span class="filepond--label-action">Choose Image</span>'
																files={platform2}
																onupdatefiles={setPlatform2}
																allowMultiple={false}
																maxFiles={1}
																name="file"
																server={`${api.BASE_URL}/save-image/sites-settings`}
																stylePanelLayout="compact"
																className="filepond filepond-input-multiple"
															/>
															<Input
																className="form-control mt-2"
																placeholder="Link for platform 2"
																name="link2"
																onChange={settingForm.handleChange}
																value={settingForm.values.link2}
															/>
														</div>
														<div className="col-md-4 mb-3">
															<Label className="form-label">QRCode</Label>
															<FilePond
																labelIdle='<span class="filepond--label-action">Choose Image</span>'
																files={platform3}
																onupdatefiles={setPlatform3}
																allowMultiple={false}
																maxFiles={1}
																name="file"
																server={`${api.BASE_URL}/save-image/sites-settings`}
																stylePanelLayout="compact"
																className="filepond filepond-input-multiple"
															/>
															<Input
																className="form-control mt-2"
																placeholder="Link for platform 3"
																name="link3"
																onChange={settingForm.handleChange}
																value={settingForm.values.link3}
															/>
														</div>
													</div>
													<div className="row">
														<div className="col-md-4 mb-3">
															<Label className="form-label">Phone Number</Label>
															<Input
																type="text"
																className="form-control"
																name="phoneNumber"
																onChange={settingForm.handleChange}
																value={settingForm.values.phoneNumber}
															/>
														</div>
														<div className="col-md-4 mb-3">
															<Label className="form-label">WhatsApp</Label>
															<Input
																type="text"
																className="form-control"
																name="whatsapp"
																onChange={settingForm.handleChange}
																value={settingForm.values.whatsapp}
															/>
														</div>
														<div className="col-md-4 mb-3">
															<Label className="form-label">LinkedIn</Label>
															<Input
																type="text"
																className="form-control"
																name="linkedin"
																onChange={settingForm.handleChange}
																value={settingForm.values.linkedin}
															/>
														</div>
													</div>
													<div className="mb-3">
														<Label className="form-label" htmlFor="video-thumbnail-input">
															Video Thumbnail <small className="text-danger">(1200 x 900 pixel)</small>
														</Label>
														<div className="position-relative d-block mx-auto">
															<div style={{ width: "100%" }}>
																<FilePond
																	labelIdle='<span class="filepond--label-action">Choose Image</span>'
																	files={videoImage}
																	onupdatefiles={setVideoImage}
																	allowMultiple={false}
																	maxFiles={1}
																	name="file"
																	server={`${api.BASE_URL}/save-image/sites-settings`}
																	stylePanelLayout="compact"
																/>
															</div>
														</div>
													</div>
													<div className="mb-3">
														<Label className="form-label" htmlFor="video-link-input">Video Link</Label>
														<Input
															className="form-control"
															name="video_link"
															onChange={settingForm.handleChange}
															value={settingForm.values.video_link}
														/>
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
						<Col xl={12}>
							<Card>
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
												<div className="mb-3">
													<div className="container-step">
														{!trading.isLoading ? (
															<TableContainer
																columns={columns}
																data={trading.tradings || []}
																isGlobalFilter={false}
																isAddUserList={false}
																customPageSize={8}
																className="custom-header-css"
																divClass="table-responsive table-card mb-2"
																tableClass="align-middle table-nowrap"
																theadClass="table-light"
																isContactsFilter={false}
																SearchPlaceholder="Search for contact..."
																isPagination={true}
															/>
														) : (
															<Loader error={true} />
														)}
													</div>
													<span className="mdi mdi-plus add-btn-step" onClick={() => setShow(true)}>Add Step</span>
												</div>
											</Col>
										</Row>
									)}
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
				<CardComponents />
			</div>
			<CreateTrading show={show} setShow={setShow} useCreateTrading={useCreateTrading} id={edit_id} setEdit_id={setEdit_id} />
			<DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={trading.isLoading} />
		</React.Fragment>
	);
};

export default withRouter(Platformpage);
