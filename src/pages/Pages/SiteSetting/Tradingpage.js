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
import { Link } from "react-router-dom";
import Loader from "../../../Components/Common/Loader";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Tradingpage = () => {
	document.title = "Site Setting | Admin & Dashboard";

	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [edit_id, setEdit_id] = useState(null);
	const [titleTap, settitleTap] = useState("ENG");
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
		dispatch(getSiteSetting("TRADING"));
		dispatch(fetchTradingList());
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "TRADING",
			subtitle: siteSetting ? siteSetting.subtitle : "",
			subtitleKm: siteSetting ? siteSetting.subtitleKm : "",
			title: siteSetting ? siteSetting.title : "",
			titleKm: siteSetting ? siteSetting.titleKm : "",
			tradingStep: siteSetting ? siteSetting.tradingStep : []
		},
		onSubmit: (values) => {
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				refreshForm();
			}
		},
	});

	const refreshForm = () => {
		dispatch(getSiteSetting("TRADING"));
	};

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
				Header: "Trading Step",
				accessor: "step",
				filterable: false,
				Cell: (service) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-grow-1">
								<h5 className="fs-14 mb-1">
									{service.row.original.step}
								</h5>
							</div>
						</div>
					</>
				),
			},
			{
				Header: "Trading",
				accessor: "title",
				filterable: false,
				Cell: (service) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-grow-1">
								<h5 className="fs-14 mb-1">
									{service.row.original.title}
								</h5>
								<p className="text-muted text-truncate mb-0">
									<span className="fw-medium">{service.row.original.summary}</span>
								</p>
							</div>
						</div>
					</>
				),
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
																	placeholder="Enter text khmer"
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
																	placeholder="Enter text khmer"
																	name="titleKm"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.titleKm}
																	invalid={settingForm.touched.titleKm && settingForm.errors.titleKm ? true : false}
																/>
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
			</div>

			<CreateTrading show={show} setShow={setShow} useCreateTrading={useCreateTrading} id={edit_id} setEdit_id={setEdit_id} />
			<DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={trading.isLoading} />
		</React.Fragment>
	);
};

export default withRouter(Tradingpage);
