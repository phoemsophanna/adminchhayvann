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
	createPartner,
	deletePartner,
	fetchPartnerDetail,
	refreshPartnerList,
	resetCreatePartnerFlag,
	resetPartnerShowDetail,
} from "../../../store/actions";

import { createSelector } from "reselect";
import { useEffect } from "react";
import DeleteModal from "../../../Components/Common/DeleteModal";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { api } from "../../../config";
import { useCan } from "../../../Components/Common/Permission";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Partner = () => {
	document.title = "Partner | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);
	const [file, setFile] = useState([]);

	const createPartnerSelector = createSelector(
		(state) => state.CreatePartnerReducer,
		(layout) => layout
	);
	const createPartnerDetailSelector = createSelector(
		(state) => state.PartnerDetailReducer,
		(layout) => layout
	);

	const useCreatePartnerSelect = useSelector(createPartnerSelector);
	const partnerDetail = useSelector(createPartnerDetailSelector);

	const partnerValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: partnerDetail.partner?.id || "",
			link: partnerDetail.partner?.link || "",
			image: partnerDetail.partner?.image || "",
			isActive: partnerDetail.partner ? (partnerDetail.partner.isActive ? true : false) : true,
		},
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createPartner(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		partnerValidation.resetForm();
		dispatch(resetPartnerShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshPartnerList());
	};

	const handleShowPartnerDetail = (partnerId) => {
		setmodal_backdrop(true);
		dispatch(fetchPartnerDetail(partnerId));
	};

	const handleDeletePartner = () => {
		if (UID) {
			dispatch(deletePartner(UID));
		}
	};

	useEffect(() => {
		if (useCreatePartnerSelect.success && !useCreatePartnerSelect.isLoading) {
			dispatch(resetCreatePartnerFlag());
			setmodal_backdrop(false);
			partnerValidation.resetForm();
			dispatch(resetPartnerShowDetail());
			setDeleteModal(false);
			dispatch(refreshPartnerList());
		}
	}, [dispatch, partnerValidation, setDeleteModal, useCreatePartnerSelect, partnerDetail]);

	useEffect(() => {
		if(partnerDetail?.partner?.image) {
			setFile([
				{
					source: partnerDetail?.partner.image,
					options: {
						type: "local"
					}
				}
			])
		} else {
			setFile([]);
		}
	},[partnerDetail]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Partner" pageTitle="Dashboard" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										{
											useCan("partners-menu.create") ? (
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
								onShowDetail={handleShowPartnerDetail}
								onDeletePartner={(id) => {
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
				onDeleteClick={handleDeletePartner}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreatePartnerSelect.isLoading}
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
					{partnerDetail.partner ? "Update Partner" : "Create Partner"}
				</ModalHeader>

				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							partnerValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<div className="mb-3">
							<Label className="form-label" htmlFor="thumbnail-input">
								Thumbnail (280 x 150 px)
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
										server={`${api.BASE_URL}/save-image/partners`}
										className="filepond filepond-input-multiple"
										stylePanelLayout="compact"
									/>
								</div>
							</div>
						</div>
						<div className="mb-2">
							<Label htmlFor="link" className="form-label">
								Link
							</Label>
							<Input
								id="link"
								name="link"
								type="text"
								className="form-control"
								placeholder="Enter link"
								onChange={partnerValidation.handleChange}
								onBlur={partnerValidation.handleBlur}
								value={partnerValidation.values.link || ""}
							/>
						</div>

						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="isActive"
								onChange={partnerValidation.handleChange}
								onBlur={partnerValidation.handleBlur}
								checked={partnerValidation.values.isActive}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{partnerValidation.values.isActive ? "Active" : "In-Active"}</span>
							</Label>
						</div>
						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreatePartnerSelect.isLoading ? (
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

export default withRouter(Partner);
