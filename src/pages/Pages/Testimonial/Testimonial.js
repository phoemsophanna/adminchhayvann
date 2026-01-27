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
	createTestimonial,
	deleteTestimonial,
	fetchTestimonialDetail,
	refreshTestimonialList,
	resetCreateTestimonialFlag,
	resetTestimonialShowDetail,
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

const Testimonial = () => {
	document.title = "Testimonial | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);
	const [file, setFile] = useState([]);

	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};

	const createTestimonialSelector = createSelector(
		(state) => state.CreateTestimonialReducer,
		(layout) => layout
	);
	const createTestimonialDetailSelector = createSelector(
		(state) => state.TestimonialDetailReducer,
		(layout) => layout
	);

	const useCreateTestimonialSelect = useSelector(createTestimonialSelector);
	const testimonialDetail = useSelector(createTestimonialDetailSelector);

	const testimonialValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: testimonialDetail.testimonial?.id || "",
			reviewerName: testimonialDetail.testimonial?.reviewerName || "",
			reviewerPosition: testimonialDetail.testimonial?.reviewerPosition || "",
			reviewerPositionKm: testimonialDetail.testimonial?.reviewerPositionKm || "",
			comment: testimonialDetail.testimonial?.comment || "",
			commentKm: testimonialDetail.testimonial?.commentKm || "",
			ordering: testimonialDetail.testimonial?.ordering || 0,
			isDisplayHomepage: testimonialDetail.testimonial ? (testimonialDetail.testimonial.isDisplayHomepage ? true : false) : false,
			isActive: testimonialDetail.testimonial ? (testimonialDetail.testimonial.isActive ? true : false) : true,
			reviewerProfile: testimonialDetail.testimonial?.reviewerProfile || "",
		},
		onSubmit: (values) => {
			values.reviewerProfile = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createTestimonial(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		testimonialValidation.resetForm();
		setFile([]);
		dispatch(resetTestimonialShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshTestimonialList());
	};

	const handleShowTestimonialDetail = (testimonialId) => {
		setmodal_backdrop(true);
		dispatch(fetchTestimonialDetail(testimonialId));
	};

	const handleDeleteTestimonial = () => {
		if (UID) {
			dispatch(deleteTestimonial(UID));
		}
	};

	useEffect(() => {
		if (useCreateTestimonialSelect.success && !useCreateTestimonialSelect.isLoading) {
			dispatch(resetCreateTestimonialFlag());
			setmodal_backdrop(false);
			testimonialValidation.resetForm();
			setFile([]);
			dispatch(resetTestimonialShowDetail());
			setDeleteModal(false);
			dispatch(refreshTestimonialList());
		}
	}, [dispatch, testimonialValidation, setDeleteModal, useCreateTestimonialSelect, testimonialDetail]);

	useEffect(() => {
		if (testimonialDetail.testimonial && testimonialDetail.testimonial.reviewerProfile) {
			setFile([
				{
					source: testimonialDetail.testimonial.reviewerProfile,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile([]);
		}
	}, [testimonialDetail, setFile]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Testimonial Management" pageTitle="Dashboard" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										{
											useCan("testimonial.create") ? (
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
								onShowDetail={handleShowTestimonialDetail}
								onDeleteTestimonial={(id) => {
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
				onDeleteClick={handleDeleteTestimonial}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreateTestimonialSelect.isLoading}
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
						{testimonialDetail.testimonial ? "Update Testimonial" : "Create Testimonial"}
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
							testimonialValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<div className="text-center">
							<div className="profile-testimonial position-relative d-inline-block mx-auto  mb-2">
								<div style={{ width: "120px", height: "120px" }}>
									<FilePond
										labelIdle='<span class="filepond--label-action">Choose Profile Image</span>'
										files={file}
										onupdatefiles={setFile}
										allowMultiple={false}
										maxFiles={1}
										name="file"
										server={`${api.BASE_URL}/save-image/testimonial-profile`}
										className="filepond filepond-input-multiple"
										stylePanelLayout="compact circle"
										styleLoadIndicatorPosition="center bottom"
										styleButtonRemoveItemPosition="center bottom"
										styleProgressIndicatorPosition="center bottom"
									/>
								</div>
							</div>
						</div>
						<div className="mb-2">
							<Label htmlFor="name" className="form-label">
								Reviewer's name
							</Label>
							<Input
								id="reviewerName"
								name="reviewerName"
								type="text"
								className="form-control"
								placeholder="Enter reviewer name"
								onChange={testimonialValidation.handleChange}
								onBlur={testimonialValidation.handleBlur}
								value={testimonialValidation.values.reviewerName || ""}
							/>
						</div>
						<TabContent activeTab={titleTap}>
							<TabPane tabId={"ENG"} id="eng">
								<div className="mb-2">
									<Label htmlFor="position-input" className="form-label">
										Position
									</Label>
									<Input
										type="text"
										className="form-control"
										id="position-input"
										placeholder="Enter position"
										name="reviewerPosition"
										onChange={testimonialValidation.handleChange}
										onBlur={testimonialValidation.handleBlur}
										value={testimonialValidation.values.reviewerPosition || ""}
									/>
								</div>
								<div className="mb-2">
									<Label htmlFor="comment" className="form-label">
										Comment
									</Label>
									<textarea
										className="form-control"
										id="comment-input"
										rows="3"
										placeholder="Enter comment"
										name="comment"
										onChange={testimonialValidation.handleChange}
										onBlur={testimonialValidation.handleBlur}
										value={testimonialValidation.values.comment}
									></textarea>
								</div>
							</TabPane>
							<TabPane tabId={"KHM"} id="khm">
								<div className="mb-2">
									<Label htmlFor="reviewerPositionKm" className="form-label">
										Position
									</Label>
									<Input
										type="text"
										className="form-control"
										id="reviewerPositionKm"
										placeholder="Enter position khmer"
										name="reviewerPositionKm"
										onChange={testimonialValidation.handleChange}
										onBlur={testimonialValidation.handleBlur}
										value={testimonialValidation.values.reviewerPositionKm || ""}
									/>
								</div>

								<div className="mb-2">
									<Label htmlFor="comment" className="form-label">
										Comment
									</Label>
									<textarea
										className="form-control"
										id="commentKm"
										rows="3"
										placeholder="Enter comment khmer"
										name="commentKm"
										onChange={testimonialValidation.handleChange}
										onBlur={testimonialValidation.handleBlur}
										value={testimonialValidation.values.commentKm}
									></textarea>
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
								onChange={testimonialValidation.handleChange}
								onBlur={testimonialValidation.handleBlur}
								value={testimonialValidation.values.ordering || ""}
							/>
						</div>
						<div className="form-check form-switch form-switch-md mb-2" dir="ltr" hidden>
							<Input
								type="checkbox"
								className="form-check-input"
								id="isDisplayHomepage"
								name="isDisplayHomepage"
								onChange={testimonialValidation.handleChange}
								onBlur={testimonialValidation.handleBlur}
								checked={testimonialValidation.values.isDisplayHomepage}
							/>
							<Label className="form-check-label" for="isDisplayHomepage">
								Display Homepage: <span className="fw-bolder">{testimonialValidation.values.isDisplayHomepage ? "Show" : "Hide"}</span>
							</Label>
						</div>
						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="isActive"
								onChange={testimonialValidation.handleChange}
								onBlur={testimonialValidation.handleBlur}
								checked={testimonialValidation.values.isActive}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{testimonialValidation.values.isActive ? "Active" : "In-Active"}</span>
							</Label>
						</div>

						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreateTestimonialSelect.isLoading ? (
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

export default withRouter(Testimonial);
