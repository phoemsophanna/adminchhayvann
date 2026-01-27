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
	createPageBanner,
	deletePageBanner,
	fetchPageBannerDetail,
	refreshPageBannerList,
	resetCreatePageBannerFlag,
	resetPageBannerShowDetail,
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
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const PageBanner = () => {
	document.title = "Page Banner | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);
	const [file, setFile] = useState([]);

	const createPageBannerSelector = createSelector(
		(state) => state.CreatePageBannerReducer,
		(layout) => layout
	);
	const createPageBannerDetailSelector = createSelector(
		(state) => state.PageBannerDetailReducer,
		(layout) => layout
	);

	const useCreatePageBannerSelect = useSelector(createPageBannerSelector);
	const pageBannerDetail = useSelector(createPageBannerDetailSelector);

	const pageBannerValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: pageBannerDetail.pageBanner?.id || "",
			pageTitle: pageBannerDetail.pageBanner?.pageTitle || "",
			metaKeyword: pageBannerDetail.pageBanner?.metaKeyword || "",
			metaDesc: pageBannerDetail.pageBanner?.metaDesc || "",
			isActive: pageBannerDetail.pageBanner ? (pageBannerDetail.pageBanner.isActive ? true : false) : true,
			image: pageBannerDetail.pageBanner?.image || "",
		},
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createPageBanner(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		pageBannerValidation.resetForm();
		setFile([]);
		dispatch(resetPageBannerShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshPageBannerList());
	};

	const handleShowPageBannerDetail = (pageBannerId) => {
		setmodal_backdrop(true);
		dispatch(fetchPageBannerDetail(pageBannerId));
	};

	const handleDeletePageBanner = () => {
		if (UID) {
			dispatch(deletePageBanner(UID));
		}
	};

	useEffect(() => {
		if (useCreatePageBannerSelect.success && !useCreatePageBannerSelect.isLoading) {
			dispatch(resetCreatePageBannerFlag());
			setmodal_backdrop(false);
			pageBannerValidation.resetForm();
			setFile([]);
			dispatch(resetPageBannerShowDetail());
			setDeleteModal(false);
			dispatch(refreshPageBannerList());
		}
	}, [dispatch, pageBannerValidation, setDeleteModal, useCreatePageBannerSelect, pageBannerDetail]);

	useEffect(() => {
		if (pageBannerDetail.pageBanner && pageBannerDetail.pageBanner.image) {
			setFile([
				{
					source: pageBannerDetail.pageBanner.image,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile([]);
		}
	}, [pageBannerDetail, setFile]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Page Banner Management" pageTitle="Dashboard" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}></Col>
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
								onShowDetail={handleShowPageBannerDetail}
								onDeletePageBanner={(id) => {
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
				onDeleteClick={handleDeletePageBanner}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreatePageBannerSelect.isLoading}
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
					{pageBannerDetail.pageBanner ? "Update Banner" : "Create Banner"}
				</ModalHeader>

				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							pageBannerValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<div className="text-center">
							<div style={{ width: "100%" }}>
								<FilePond
									labelIdle='<span class="filepond--label-action">Choose Profile Image</span>'
									files={file}
									onupdatefiles={setFile}
									allowMultiple={false}
									maxFiles={1}
									name="file"
									server={`${api.BASE_URL}/save-image/pageBanner-profile`}
									className="filepond filepond-input-multiple"
									stylePanelLayout="compact"
									styleLoadIndicatorPosition="center bottom"
									styleButtonRemoveItemPosition="center bottom"
									styleProgressIndicatorPosition="center bottom"
								/>
							</div>
						</div>
						<div className="mb-2">
							<Label htmlFor="name" className="form-label">
								Page Title
							</Label>
							<Input
								id="pageTitle"
								name="pageTitle"
								type="text"
								className="form-control"
								placeholder="Enter text"
								onChange={pageBannerValidation.handleChange}
								onBlur={pageBannerValidation.handleBlur}
								value={pageBannerValidation.values.pageTitle || ""}
								disabled
							/>
						</div>
						<div className="mb-2">
							<Label htmlFor="metaKeyword" className="form-label">
								Meta Keyword
							</Label>
							<Input
								id="metaKeyword"
								name="metaKeyword"
								type="textarea"
								className="form-control"
								placeholder="Enter text"
								onChange={pageBannerValidation.handleChange}
								onBlur={pageBannerValidation.handleBlur}
								value={pageBannerValidation.values.metaKeyword || ""}
							/>
						</div>
						<div className="mb-2">
							<Label htmlFor="metaDesc" className="form-label">
								Meta Description
							</Label>
							<Input
								id="metaDesc"
								name="metaDesc"
								type="textarea"
								className="form-control"
								placeholder="Enter text"
								onChange={pageBannerValidation.handleChange}
								onBlur={pageBannerValidation.handleBlur}
								value={pageBannerValidation.values.metaDesc || ""}
							/>
						</div>

						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="isActive"
								onChange={pageBannerValidation.handleChange}
								onBlur={pageBannerValidation.handleBlur}
								checked={pageBannerValidation.values.isActive}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{pageBannerValidation.values.isActive ? "Active" : "In-Active"}</span>
							</Label>
						</div>

						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreatePageBannerSelect.isLoading ? (
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

export default withRouter(PageBanner);
