import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteApplication, deleteCareer, deleteCorporate, deleteIndividual, fetchApplicationDetail, fetchApplicationList, fetchCareerList, fetchCorporateDetail, fetchCorporateList, fetchIndividualDetail, fetchIndividualList, refreshCareerList, refreshCorporateList, refreshIndividualList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";

const IndividualMenu = () => {
	document.title = "Individual Register List | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [modal_backdrop, setModel_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const closeModal = () => {
		setModel_backdrop(false);
	}
	
	const careerListSelector = createSelector(
		(state) => state.IndividualListReducer,
		(layout) => ({
			individuals: layout.individuals,
			isLoading: layout.isLoading,
		})
	);
	const { individuals, isLoading } = useSelector(careerListSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshIndividualList());
	};

	const detailIndividualSelector = createSelector(
		(state) => state.IndividualDetailReducer,
		(layout) => ({
			individual: layout.individual,
			isLoading: layout.isLoading
		})
	);

	const detailIndividual = useSelector(detailIndividualSelector);

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteIndividual(UID));
			dispatch(fetchIndividualList());
			setDeleteModal(false);
		}
	};

	useEffect(() => {
		dispatch(fetchIndividualList());
	}, [dispatch]);

	console.log(detailIndividual);

	const columns = useMemo(
		() => [
			{
				Header: "ID",
				accessor: "id",
				Cell: (contact) => <span className="fw-semibold">{parseInt(contact.row.id) + 1}</span>,
				filterable: false,
			},
			{
				Header: "Fullname",
				accessor: "fullname",
				filterable: false,
				Cell: (career) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								<Link to="#" className="text-body">
									{career.row.original.firstname} {career.row.original.lastname}
								</Link>
							</h5>
						</div>
					</div>
				),
			},
			{
				Header: "National ID",
				accessor: "nationalID",
				filterable: false,
				Cell: (career) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								<Link to="#" className="text-body">
									{career.row.original.nidNumber}
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
								{career.row.original.phone}
							</h5>
						</div>
					</div>
				),
			},
			{
				Header: "Register Date",
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
								useCan("corporate-form.view") ? (
									<li className="list-inline-item" title="Edit">
										<Link className="edit-item-btn" to={`#`}
											onClick={() => {
												setModel_backdrop(true);
												dispatch(fetchIndividualDetail(cellProps.row.original?.id));
											}}
										>
											<i className="mdi mdi-eye-outline"></i>
										</Link>
									</li>
								) : ""
							}
							{
								useCan("corporate-form.delete") ? (
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
					<BreadCrumb title="Corporate Register List Menu" pageTitle="Home" />
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
												data={individuals || []}
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
						{"Individual Register Details"}
					</div>
				</ModalHeader>

				<ModalBody>
					<Row>
						<Col lg={6}>
							{
								detailIndividual?.individual?.frontCard ? (
									<div>
										<img
											src={api.FILE_URI + detailIndividual?.individual?.frontCard}
											width="100%"
											style={{overflowY: "hidden"}}
										/>
										<a href={api.FILE_URI + detailIndividual?.individual?.frontCard} className="btn btn-success mt-1 w-100" target="_blank">Download Image</a>
									</div>
								) : ""
							}

							{
								detailIndividual?.individual?.backCard ? (
									<div className="mt-2">
										<img
											src={api.FILE_URI + detailIndividual?.individual?.backCard}
											width="100%"
											style={{overflowY: "hidden"}}
										/>
										<a href={api.FILE_URI + detailIndividual?.individual?.backCard} className="btn btn-success mt-1 w-100" target="_blank">Download Image</a>
									</div>
								) : ""
							}
						</Col>
						
						<Col lg={6}>
							<h5>Individual Register Details</h5>
							<ul style={{listStyle: "none", paddingLeft: 0}}>
								<li>
									<h6>National Identification Number: {detailIndividual?.individual?.nidNumber}</h6>
								</li>
								<li>
									<h6>Fullname: {detailIndividual?.individual?.lastname} {detailIndividual?.individual?.firstname}</h6>
								</li>
								{
									detailIndividual?.individual?.date ? (
										<li>
											<h6>Date of Birth: {detailIndividual?.individual?.date}</h6>
										</li>
									) : ""
								}
								{
									detailIndividual?.individual?.phone ? (
										<li>
											<h6>Phone Number: {detailIndividual?.individual?.phone}</h6>
										</li>
									) : ""
								}
								{
									detailIndividual?.individual?.email ? (
										<li>
											<h6>Email: {detailIndividual?.individual?.email}</h6>
										</li>
									) : ""
								}
								<li>
									<h6>Register Date: {detailIndividual?.individual?.create_at}</h6>
								</li>
								<li>
									<h6>Terms and Conditions:</h6>
									<ul style={{paddingLeft: 15}}>
										{
											JSON.parse(detailIndividual?.individual?.privacy ? detailIndividual?.individual?.privacy : "[]").map((q,i) =>{
												return <li key={i}>{q}</li>;
											})
										}
									</ul>
								</li>
							</ul>
						</Col>
					</Row>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default IndividualMenu;
