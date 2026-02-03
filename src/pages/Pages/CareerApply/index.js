import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteApplication, deleteCareer, fetchApplicationDetail, fetchApplicationList, fetchCareerList, refreshCareerList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";
import axios from "axios";
import { useProfile } from "../../../Components/Hooks/UserHooks";

const CareerApplyMenu = () => {
	document.title = "Job Applications | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [modal_backdrop, setModel_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const closeModal = () => {
		setModel_backdrop(false);
	}
	
	const careerListSelector = createSelector(
		(state) => state.ApplicationListReducer,
		(layout) => ({
			applications: layout.applications,
			isLoading: layout.isLoading,
		})
	);
	const { applications, isLoading } = useSelector(careerListSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshCareerList());
	};

	const detailApplicationSelector = createSelector(
		(state) => state.ApplicationDetailReducer,
		(layout) => ({
			application: layout.application,
			isLoading: layout.isLoading
		})
	);

	const detailApplication = useSelector(detailApplicationSelector);

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteApplication(UID));
			dispatch(fetchApplicationList());
			setDeleteModal(false);
		}
	};

	useEffect(() => {
		dispatch(fetchApplicationList());
	}, [dispatch]);

	const columns = useMemo(
		() => [
			{
				Header: "ID",
				accessor: "id",
				Cell: (contact) => <span className="fw-semibold">{parseInt(contact.row.id) + 1}</span>,
				filterable: false,
			},
			{
				Header: "Name",
				accessor: "title",
				filterable: false,
				Cell: (career) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								<Link to="#" className="text-body">
									{career.row.original.lastname} {career.row.original.firstname}
								</Link>
							</h5>
						</div>
					</div>
				),
			},
			{
				Header: "Phone Number",
				accessor: "phoneNumber",
				filterable: false,
				Cell: (career) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								{career.row.original.phoneNumber}
							</h5>
						</div>
					</div>
				),
			},
			{
				Header: "Career",
				accessor: "careerId",
				filterable: false,
				Cell: (career) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								{career.row.original.career?.title}
							</h5>
						</div>
					</div>
				),
			},
			{
				Header: "Apply Date",
				accessor: "create_at",
				filterable: false,
				Cell: (career) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								{career.row.original.create_at}
							</h5>
						</div>
					</div>
				),
			},
			// {
			// 	Header: "Status",
			// 	accessor: "isActive",
			// 	filterable: false,
			// 	Cell: (career) => (
			// 		<>
			// 			{career.row.original.isActive ? (
			// 				<span className="badge bg-success-subtle text-success">ACTIVE</span>
			// 			) : (
			// 				<span className="badge bg-danger-subtle text-danger">IN-ACTIVE</span>
			// 			)}
			// 		</>
			// 	),
			// },

			// {
			// 	Header: "Ordering",
			// 	accessor: "ordering",
			// 	filterable: false,
			// },
			{
				Header: "Action",
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							{
								useCan("application-form.edit") ? (
									<li className="list-inline-item" title="Edit">
										<Link className="edit-item-btn" to={`#`}
											onClick={() => {
												setModel_backdrop(true);
												dispatch(fetchApplicationDetail(cellProps.row.original?.id));
											}}
										>
											<i className="mdi mdi-eye-outline"></i>
										</Link>
									</li>
								) : ""
							}
							{
								useCan("application-form.delete") ? (
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
								) : ""
							}
						</ul>
					);
				},
			},
		],
		[]
	);

	// const columnsCheck = useCanMultiple(["career-menu.edit", "career-menu.delete"]) ? columns : columns.filter((q,index) => index != columns.length - 1);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Job Applications Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
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

						<Col xs={12}>
							<Card id="contactList">
								<CardBody className="pt-0">
									<div>
										{!isLoading ? (
											<TableContainer
												columns={columns}
												data={applications || []}
												isGlobalFilter={true}
												isAddUserList={false}
												customPageSize={8}
												className="custom-header-css"
												divClass="table-responsive table-card mb-2"
												tableClass="align-middle table-nowrap"
												theadClass="table-light"
												isContactsFilter={true}
												SearchPlaceholder="Search for contact..."
												isPagination={true}
											/>
										) : (
											<Loader error={true} />
										)}
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			<DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} />
			<Modal
				isOpen={modal_backdrop}
				toggle={() => {
					closeModal();
				}}
				backdrop={"static"}
				id="staticBackdrop"
				size="lg"
				centered
			>
				<ModalHeader className="bg-light p-3 text-light" toggle={closeModal}>
					<div className="align-items-center d-flex" style={{gap: 15}}>
						{"View Application Job"}
					</div>
				</ModalHeader>

				<ModalBody>
					<Row>
						{
							detailApplication?.application?.fileCv ? (
								<Col lg={6}>
									<iframe
										src={api.FILE_URI + detailApplication?.application?.fileCv}
										width="100%"
										height={400}
										style={{overflowY: "hidden"}}
									/>
								</Col>
							) : ""
						}
						<Col lg={6}>
							<h5>Job Applicant Details</h5>
							<ul style={{listStyle: "none", paddingLeft: 0}}>
								<li>
									<h6>Fullname: {detailApplication?.application?.lastname} {detailApplication?.application?.firstname}</h6>
								</li>
								{
									detailApplication?.application?.email ? (
										<li>
											<h6>Email: {detailApplication?.application?.email}</h6>
										</li>
									) : ""
								}
								{
									detailApplication?.application?.phoneNumber ? (
										<li>
											<h6>Phone Number: {detailApplication?.application?.phoneNumber}</h6>
										</li>
									) : ""
								}
								<li>
									<h6>Apply Date: {detailApplication?.application?.create_at}</h6>
								</li>
								<li>
									<h6>Career: {detailApplication?.application?.career?.title} <small className="text-danger">(Deadline: {detailApplication?.application?.career?.deadline})</small></h6>
								</li>
								<li>
									<h6>Note:</h6>
									<p>
										{detailApplication?.application?.message}
									</p>
								</li>
							</ul>
						</Col>
					</Row>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default CareerApplyMenu;
