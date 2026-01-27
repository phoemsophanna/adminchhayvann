import React from "react";
import { Button, Card, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableList from "./TableList";
import { useState } from "react";
import withRouter from "../../../Components/Common/withRouter";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createCategory,
	deleteCategory,
	fetchCategoryDetail,
	refreshCategoryList,
	resetCreateCategoryFlag,
	resetCategoryShowDetail,
} from "../../../store/actions";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { createSelector } from "reselect";
import { useEffect } from "react";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { api } from "../../../config";
import { useCan } from "../../../Components/Common/Permission";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MainFaq = () => {
	document.title = "Main FAQ's | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);
	const [file, setFile] = useState([]);

	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};

	const createCategorySelector = createSelector(
		(state) => state.CreateCategoryReducer,
		(layout) => layout
	);
	const createCategoryDetailSelector = createSelector(
		(state) => state.CategoryDetailReducer,
		(layout) => layout
	);

	const useCreateCategorySelect = useSelector(createCategorySelector);
	const categoryDetail = useSelector(createCategoryDetailSelector);

	const categoryValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: categoryDetail.category?.id || "",
			type: "FAQ",
			title: categoryDetail.category?.title || "",
			titleKm: categoryDetail.category?.titleKm || "",
			ordering: categoryDetail.category?.ordering || 0,
			status: categoryDetail.category ? (categoryDetail.category.status ? true : false) : true,
		},
		onSubmit: (values) => {
			dispatch(createCategory(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		categoryValidation.resetForm();
		setFile([]);
		dispatch(resetCategoryShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshCategoryList("FAQ"));
	};

	const handleShowCategoryDetail = (categoryId) => {
		setmodal_backdrop(true);
		dispatch(fetchCategoryDetail(categoryId));
	};

	const handleDeleteCategory = () => {
		if (UID) {
			dispatch(deleteCategory(UID));
		}
	};

	useEffect(() => {
		if (useCreateCategorySelect.success && !useCreateCategorySelect.isLoading) {
			dispatch(resetCreateCategoryFlag());
			setmodal_backdrop(false);
			categoryValidation.resetForm();
			setFile([]);
			dispatch(resetCategoryShowDetail());
			setDeleteModal(false);
			dispatch(refreshCategoryList("FAQ"));
		}
	}, [dispatch, categoryValidation, setDeleteModal, useCreateCategorySelect, categoryDetail]);

	useEffect(() => {
		if (categoryDetail.category && categoryDetail.category.reviewerProfile) {
			setFile([
				{
					source: categoryDetail.category.reviewerProfile,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile([]);
		}
	}, [categoryDetail, setFile]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Main FAQ's Management" pageTitle="Dashboard" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										{
											useCan("faq.create") ? (
												<Col lg={3}>
													<Button
														color="primary"
														className="btn add-btn"
														data-bs-toggle="modal"
														data-bs-target="#showModal"
														onClick={() => setmodal_backdrop(true)}
													>
														<i className="ri-add-fill me-1 align-bottom"></i> Create New
													</Button>
												</Col>
											) : ""
										}
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Button color="dark" className="btn" outline onClick={handleRefresh}>
													<i className="ri-refresh-line me-1 align-bottom"></i> Refresh
												</Button>
											</div>
										</Col>
									</Row>
								</CardHeader>
							</Card>
						</Col>
					</Row>

					<Row>
						<Col lg={12}>
							<TableList
								onShowDetail={handleShowCategoryDetail}
								onDeleteCategory={(id) => {
									setDeleteModal(true);
									setUID(id);
								}}
							/>
						</Col>
					</Row>
				</Container>
			</div>
			<DeleteModal
				show={deleteModal}
				onDeleteClick={handleDeleteCategory}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreateCategorySelect.isLoading}
			/>
			<Modal
				isOpen={modal_backdrop}
				toggle={() => {
					closeModal();
				}}
				backdrop={"static"}
				id="staticBackdrop"
				centered
			>
				<ModalHeader className="bg-light p-3 text-light" toggle={closeModal}>
					<div className="align-items-center d-flex" style={{gap: 15}}>
						{categoryDetail.category ? "Update Category" : "Create Category"}
						<div className="flex-shrink-0">
							<Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
								<NavItem>
									<NavLink
										style={{ cursor: "pointer", padding: "0.5rem", lineHeight: 1 }}
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
										style={{ cursor: "pointer", padding: "0.5rem", lineHeight: 1 }}
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
				</ModalHeader>

				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							categoryValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<TabContent activeTab={titleTap}>
							<TabPane tabId={"ENG"} id="eng">
								<div className="mb-2">
									<Label htmlFor="title-input" className="form-label">
										Title
									</Label>
									<Input
										type="text"
										className="form-control"
										id="title-input"
										placeholder="Enter title"
										name="title"
										onChange={categoryValidation.handleChange}
										onBlur={categoryValidation.handleBlur}
										value={categoryValidation.values.title || ""}
									/>
								</div>
							</TabPane>
							<TabPane tabId={"KHM"} id="khm">
								<div className="mb-2">
									<Label htmlFor="title-km-input" className="form-label">
										Title Khmer
									</Label>
									<Input
										type="text"
										className="form-control"
										id="title-km-input"
										placeholder="Enter title khmer"
										name="titleKm"
										onChange={categoryValidation.handleChange}
										onBlur={categoryValidation.handleBlur}
										value={categoryValidation.values.titleKm || ""}
									/>
								</div>
							</TabPane>
						</TabContent>
						<div className="mb-2">
							<Label htmlFor="ordering-input" className="form-label">
								Ordering
							</Label>
							<Input
								type="number"
								className="form-control"
								id="ordering-input"
								placeholder="Enter ordering"
								name="ordering"
								onChange={categoryValidation.handleChange}
								onBlur={categoryValidation.handleBlur}
								value={categoryValidation.values.ordering || ""}
							/>
						</div>
						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="status"
								onChange={categoryValidation.handleChange}
								onBlur={categoryValidation.handleBlur}
								checked={categoryValidation.values.status}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{categoryValidation.values.status ? "Active" : "In-Active"}</span>
							</Label>
						</div>

						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreateCategorySelect.isLoading ? (
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
							)}
						</div>
					</Form>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default withRouter(MainFaq);
