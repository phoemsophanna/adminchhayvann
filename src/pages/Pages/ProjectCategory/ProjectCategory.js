import React from "react";
import { Button, Card, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableList from "./TableList";
import { useState } from "react";
import withRouter from "../../../Components/Common/withRouter";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createProjectCategory,
	deleteProjectCategory,
	fetchProjectCategoryDetail,
	refreshProjectCategoryList,
	resetCreateProjectCategoryFlag,
	resetProjectCategoryShowDetail,
} from "../../../store/actions";

import { createSelector } from "reselect";
import { useEffect } from "react";
import DeleteModal from "../../../Components/Common/DeleteModal";

const ProjectCategory = () => {
	document.title = "Project Category | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);

	const createProjectCategorySelector = createSelector(
		(state) => state.CreateProjectCategoryReducer,
		(layout) => layout
	);
	const createProjectCategoryDetailSelector = createSelector(
		(state) => state.ProjectCategoryDetailReducer,
		(layout) => layout
	);

	const useCreateProjectCategorySelect = useSelector(createProjectCategorySelector);
	const projectCategoryDetail = useSelector(createProjectCategoryDetailSelector);

	const projectCategoryValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: projectCategoryDetail.projectCategory?.id || "",
			name: projectCategoryDetail.projectCategory?.name || "",
			ordering: projectCategoryDetail.projectCategory?.ordering || "",
			isActive: projectCategoryDetail.projectCategory ? (projectCategoryDetail.projectCategory.isActive ? true : false) : true,
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please Enter Name"),
		}),
		onSubmit: (values) => {
			dispatch(createProjectCategory(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		projectCategoryValidation.resetForm();
		dispatch(resetProjectCategoryShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshProjectCategoryList());
	};

	const handleShowProjectCategoryDetail = (projectCategoryId) => {
		setmodal_backdrop(true);
		dispatch(fetchProjectCategoryDetail(projectCategoryId));
	};

	const handleDeleteProjectCategory = () => {
		if (UID) {
			dispatch(deleteProjectCategory(UID));
		}
	};

	useEffect(() => {
		if (useCreateProjectCategorySelect.success && !useCreateProjectCategorySelect.isLoading) {
			dispatch(resetCreateProjectCategoryFlag());
			setmodal_backdrop(false);
			projectCategoryValidation.resetForm();
			dispatch(resetProjectCategoryShowDetail());
			setDeleteModal(false);
			dispatch(refreshProjectCategoryList());
		}
	}, [dispatch, projectCategoryValidation, setDeleteModal, useCreateProjectCategorySelect, projectCategoryDetail]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Project Category" pageTitle="Dashboard" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
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
								onShowDetail={handleShowProjectCategoryDetail}
								onDeleteProjectCategory={(id) => {
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
				onDeleteClick={handleDeleteProjectCategory}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreateProjectCategorySelect.isLoading}
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
					{projectCategoryDetail.projectCategory ? "Update ProjectCategory" : "Create ProjectCategory"}
				</ModalHeader>

				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							projectCategoryValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<div className="mb-2">
							<Label htmlFor="name" className="form-label">
								ProjectCategory's name <small className="text-danger">(Required)</small>
							</Label>
							<Input
								id="name"
								name="name"
								type="text"
								className="form-control"
								placeholder="Enter name"
								onChange={projectCategoryValidation.handleChange}
								onBlur={projectCategoryValidation.handleBlur}
								value={projectCategoryValidation.values.name || ""}
								invalid={projectCategoryValidation.touched.name && projectCategoryValidation.errors.name ? true : false}
							/>
							{projectCategoryValidation.touched.name && projectCategoryValidation.errors.name ? (
								<FormFeedback type="invalid">{projectCategoryValidation.errors.name}</FormFeedback>
							) : null}
						</div>
						<div className="mb-2">
							<Label htmlFor="ordering" className="form-label">
								Ordering
							</Label>
							<Input
								id="ordering"
								name="ordering"
								type="text"
								className="form-control"
								placeholder="Enter ordering"
								onChange={projectCategoryValidation.handleChange}
								onBlur={projectCategoryValidation.handleBlur}
								value={projectCategoryValidation.values.ordering || ""}
							/>
						</div>

						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="isActive"
								onChange={projectCategoryValidation.handleChange}
								onBlur={projectCategoryValidation.handleBlur}
								checked={projectCategoryValidation.values.isActive}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{projectCategoryValidation.values.isActive ? "Active" : "In-Active"}</span>
							</Label>
						</div>
						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreateProjectCategorySelect.isLoading ? (
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

export default withRouter(ProjectCategory);
