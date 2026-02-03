import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteApplication, deleteCareer, deleteCorporate, fetchApplicationDetail, fetchApplicationList, fetchCareerList, fetchCorporateDetail, fetchCorporateList, refreshCareerList, refreshCorporateList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";

const CorporateMenu = () => {
	document.title = "Corporate Register List | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [modal_backdrop, setModel_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const closeModal = () => {
		setModel_backdrop(false);
	}
	
	const careerListSelector = createSelector(
		(state) => state.CorporateListReducer,
		(layout) => ({
			corporates: layout.corporates,
			isLoading: layout.isLoading,
		})
	);
	const { corporates, isLoading } = useSelector(careerListSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshCorporateList());
	};

	const detailCorporateSelector = createSelector(
		(state) => state.CorporateDetailReducer,
		(layout) => ({
			corporate: layout.corporate,
			isLoading: layout.isLoading
		})
	);

	const detailCorporate = useSelector(detailCorporateSelector);

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteCorporate(UID));
			dispatch(fetchCorporateList());
			setDeleteModal(false);
		}
	};

	useEffect(() => {
		dispatch(fetchCorporateList());
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
				Header: "Company",
				accessor: "company",
				filterable: false,
				Cell: (career) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								<Link to="#" className="text-body">
									{career.row.original.companyName}
								</Link>
							</h5>
						</div>
					</div>
				),
			},
			{
				Header: "Contact Name",
				accessor: "contactName",
				filterable: false,
				Cell: (career) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								<Link to="#" className="text-body">
									{career.row.original.contactName}
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
												dispatch(fetchCorporateDetail(cellProps.row.original?.id));
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
												data={corporates || []}
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
						{"Corporate Register Details"}
					</div>
				</ModalHeader>

				<ModalBody>
					<Row>
						{
							detailCorporate?.corporate?.file ? (
								<Col lg={6}>
									<img
										src={api.FILE_URI + detailCorporate?.corporate?.file}
										width="100%"
										style={{overflowY: "hidden"}}
									/>
									<a href={api.FILE_URI + detailCorporate?.corporate?.file} className="btn btn-success mt-1 w-100" target="_blank">Download Image</a>
								</Col>
							) : ""
						}
						<Col lg={6}>
							<h5>Corporate Register Details</h5>
							<ul style={{listStyle: "none", paddingLeft: 0}}>
								<li>
									<h6>Certificate of Incorporation Number: {detailCorporate?.corporate?.certificateNumber}</h6>
								</li>
								<li>
									<h6>Company: {detailCorporate?.corporate?.companyName}</h6>
								</li>
								{
									detailCorporate?.corporate?.contactName ? (
										<li>
											<h6>Contact Name: {detailCorporate?.corporate?.contactName}</h6>
										</li>
									) : ""
								}
								{
									detailCorporate?.corporate?.phoneNumber ? (
										<li>
											<h6>Contact Phone Number: {detailCorporate?.corporate?.phoneNumber}</h6>
										</li>
									) : ""
								}
								{
									detailCorporate?.corporate?.email ? (
										<li>
											<h6>Email: {detailCorporate?.corporate?.email}</h6>
										</li>
									) : ""
								}
								<li>
									<h6>Register Date: {detailCorporate?.corporate?.create_at}</h6>
								</li>
								<li>
									<h6>Terms and Conditions:</h6>
									<ul style={{paddingLeft: 15}}>
										{
											JSON.parse(detailCorporate?.corporate?.privacy ? detailCorporate?.corporate?.privacy : "[]").map((q,i) =>{
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

export default CorporateMenu;
