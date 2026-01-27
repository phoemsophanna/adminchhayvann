import React from "react";
import { Button, Card, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableList from "./TableList";
import { useState } from "react";
import withRouter from "../../../Components/Common/withRouter";
import Select from "react-select";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser, fetchUserDetail, refreshUserList, resetCreateUserFlag, resetUserShowDetail } from "../../../store/actions";

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
import axios from "axios";
import { useProfile } from "../../../Components/Hooks/UserHooks";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const User = () => {
	document.title = "User | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);
	const [file, setFile] = useState([]);
	const [closePassword, setClosePassword] = useState(false);
	const { token } = useProfile();
	const [ selectItem, setSelectItem ] = useState([]);
	const [ selectedItem, setSelectedItem ] = useState({label: "", value: ""});

	const createUserSelector = createSelector(
		(state) => state.CreateUserReducer,
		(layout) => layout
	);
	const createUserDetailSelector = createSelector(
		(state) => state.UserDetailReducer,
		(layout) => layout
	);

	const useCreateUserSelect = useSelector(createUserSelector);
	const userDetail = useSelector(createUserDetailSelector);

	const userValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: userDetail.user?.id || "",
			name: userDetail.user?.name || "",
			email: userDetail.user?.email || "",
			phoneNumber: userDetail.user?.phoneNumber || "",
			userRole: userDetail.user?.userRole || "",
			password: "",
			isActive: userDetail.user ? (userDetail.user.isActive ? true : false) : true,
			image: userDetail.user?.image || "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please Enter Name"),
			email: Yup.string().required("Please Enter Email"),
			password: userDetail.user ? Yup.string().notRequired() : Yup.string().required("Please Enter Password"),
		}),
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			if (selectedItem.value) {
				values.userRole = selectedItem.value ? selectedItem.value : "";
				dispatch(createUser(values));
			}
		},
	});

	const handleSearch = (value) => {
		axios.get(`${api.BASE_URL}/roles/dropdown?search=${value}`,{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		}).then((res) => {
			if(res.data.length > 0){
				var selectItems = [];
				res.data.map((q) => {
					selectItems.push({label: q.name, value: q.name});
				});
				setSelectItem(selectItems);
			}
		});
	}

	const handleSelect = (value) => {
		setSelectedItem(value);
	}

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		userValidation.resetForm();
		setFile([]);
		dispatch(resetUserShowDetail());
		setClosePassword(false);
	}

	const handleRefresh = () => {
		dispatch(refreshUserList());
	};

	const handleShowUserDetail = (userId) => {
		setmodal_backdrop(true);
		setClosePassword(true);
		dispatch(fetchUserDetail(userId));
	};

	const handleDeleteUser = () => {
		if (UID) {
			dispatch(deleteUser(UID));
		}
	};

	useEffect(() => {
		if (useCreateUserSelect.success && !useCreateUserSelect.isLoading) {
			dispatch(resetCreateUserFlag());
			setmodal_backdrop(false);
			userValidation.resetForm();
			setFile([]);
			dispatch(resetUserShowDetail());
			setClosePassword(false);
			setDeleteModal(false);
			dispatch(refreshUserList());
		}
	}, [dispatch, userValidation, setDeleteModal, useCreateUserSelect, userDetail]);

	useEffect(() => {
		if (userDetail.user && userDetail.user.image) {
			setFile([
				{
					source: userDetail.user.image,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile([]);
		}
	}, [userDetail, setFile]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="User Management" pageTitle="Dashboard" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										{
											useCan('user-management.create') ? (
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
								onShowDetail={handleShowUserDetail}
								onDeleteUser={(id) => {
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
				onDeleteClick={handleDeleteUser}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreateUserSelect.isLoading}
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
					{userDetail.user ? "Update User" : "Create User"}
				</ModalHeader>

				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							userValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<div className="text-center">
							<div className="profile-user position-relative d-inline-block mx-auto  mb-2">
								<div style={{ width: "120px", height: "120px" }}>
									<FilePond
										labelIdle='<span class="filepond--label-action">Choose Profile Image</span>'
										files={file}
										onupdatefiles={setFile}
										allowMultiple={false}
										maxFiles={1}
										name="file"
										server={`${api.BASE_URL}/save-image/user-profile`}
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
								User's name <small className="text-danger">(Required)</small>
							</Label>
							<Input
								id="name"
								name="name"
								type="text"
								className="form-control"
								placeholder="Enter name"
								onChange={userValidation.handleChange}
								onBlur={userValidation.handleBlur}
								value={userValidation.values.name || ""}
								invalid={userValidation.touched.name && userValidation.errors.name ? true : false}
							/>
							{userValidation.touched.name && userValidation.errors.name ? (
								<FormFeedback type="invalid">{userValidation.errors.name}</FormFeedback>
							) : null}
						</div>
						<div className="mb-2">
							<Label htmlFor="emailInput" className="form-label">
								Email address <small className="text-danger">(Required)</small>
							</Label>
							<Input
								type="email"
								className="form-control"
								id="emailInput"
								placeholder="Enter email"
								name="email"
								onChange={userValidation.handleChange}
								onBlur={userValidation.handleBlur}
								value={userValidation.values.email || ""}
								invalid={userValidation.touched.email && userValidation.errors.email ? true : false}
							/>
							{userValidation.touched.email && userValidation.errors.email ? (
								<FormFeedback type="invalid">{userValidation.errors.email}</FormFeedback>
							) : null}
						</div>
						<div className="mb-2">
							<Label htmlFor="passwordInput" className="form-label">
								Password{" "}
								{userDetail.user ? (
									closePassword ? (
										<span className="badge border border-warning text-warning" role="button" onClick={() => setClosePassword(false)}>
											Change Password
										</span>
									) : (
										<span className="badge border border-secondary text-secondary" role="button" onClick={() => setClosePassword(true)}>
											Close Password
										</span>
									)
								) : (
									<small className="text-danger">(Required)</small>
								)}
							</Label>
							<Input
								type="password"
								className="form-control"
								id="passwordInput"
								placeholder="Enter password"
								name="password"
								onChange={userValidation.handleChange}
								onBlur={userValidation.handleBlur}
								value={userValidation.values.password || ""}
								autoComplete="new-password"
								invalid={userValidation.touched.password && userValidation.errors.password ? true : false}
								disabled={closePassword}
							/>
							{userValidation.touched.password && userValidation.errors.password ? (
								<FormFeedback type="invalid">{userValidation.errors.password}</FormFeedback>
							) : null}
						</div>
						<div className="mb-2">
							<Label htmlFor="phoneNumber" className="form-label">
								Phone number
							</Label>
							<Input
								type="text"
								className="form-control"
								id="phoneNumber"
								placeholder="Enter phone number"
								name="phoneNumber"
								onChange={userValidation.handleChange}
								onBlur={userValidation.handleBlur}
								value={userValidation.values.phoneNumber || ""}
							/>
						</div>
						<div className="mb-2">
							<Label htmlFor="phoneNumber" className="form-label">
								User's role <small className="text-danger">(Required)</small>
							</Label>
							<Select
								onChange={handleSelect}
								onInputChange={handleSearch}
								options={selectItem}
								defaultValue={selectedItem}
								value={selectedItem}
							/>
							{selectedItem.value == "" ? (
								<FormFeedback type="invalid">User role is required!</FormFeedback>
							) : null}
						</div>

						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="isActive"
								onChange={userValidation.handleChange}
								onBlur={userValidation.handleBlur}
								checked={userValidation.values.isActive}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{userValidation.values.isActive ? "Active" : "In-Active"}</span>
							</Label>
						</div>
						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreateUserSelect.isLoading ? (
								<Button color="primary" className="btn-load">
									<span className="d-flex align-items-center">
										<Spinner size="sm" className="flex-shrink-0">
											Loading...
										</Spinner>
										<span className="flex-grow-1 ms-2">Loading...</span>
									</span>
								</Button>
							) : (
								<Button type="submit" color="primary" className="btn-label" style={selectedItem.value == "" ? {border: "1px solid grey",backgroundColor: "grey"} : {}}>
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

export default withRouter(User);
