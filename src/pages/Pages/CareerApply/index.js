import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteCareer, fetchCareerList, refreshCareerList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";
import axios from "axios";
import { useProfile } from "../../../Components/Hooks/UserHooks";

const CareerApplyMenu = () => {
	document.title = "Career Apply | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);
	const { token } = useProfile();
	const fetchCareerApply = async () => {
		await axios.get(`${api.BASE_URL}/careers/application`,{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		}).then((res) => {
			console.log(res);
		});
	}

	useEffect(() => {
		fetchCareerApply();
	},[]);

	// const columns = useMemo(
	// 	() => [
	// 		{
	// 			Header: "ID",
	// 			accessor: "id",
	// 			Cell: (contact) => <span className="fw-semibold">{parseInt(contact.row.id) + 1}</span>,
	// 			filterable: false,
	// 		},
	// 		{
	// 			Header: "Career",
	// 			accessor: "title",
	// 			filterable: false,
	// 			Cell: (career) => (
	// 				<div className="d-flex align-items-center">
	// 					<div className="flex-grow-1">
	// 						<h5 className="fs-14 mb-1">
	// 							<Link to="#" className="text-body">
	// 								{career.row.original.title}
	// 							</Link>
	// 						</h5>
	// 						<p className="text-muted mb-0 text-truncate" style={{ width: "250px" }}>
	// 							<span className="fw-medium ">{career.row.original.summary}</span>
	// 						</p>
	// 					</div>
	// 				</div>
	// 			),
	// 		},
	// 		{
	// 			Header: "Location",
	// 			accessor: "location",
	// 			filterable: false,
	// 			Cell: (career) => (
	// 				<div className="d-flex align-items-center">
	// 					<div className="flex-grow-1">
	// 						<h5 className="fs-14 mb-1">
	// 							{career.row.original.location}
	// 						</h5>
	// 					</div>
	// 				</div>
	// 			),
	// 		},
	// 		{
	// 			Header: "Deadline",
	// 			accessor: "deadline",
	// 			filterable: false,
	// 			Cell: (career) => (
	// 				<div className="d-flex align-items-center">
	// 					<div className="flex-grow-1">
	// 						<h5 className="fs-14 mb-1">
	// 							{career.row.original.deadline}
	// 						</h5>
	// 					</div>
	// 				</div>
	// 			),
	// 		},
	// 		{
	// 			Header: "Status",
	// 			accessor: "isActive",
	// 			filterable: false,
	// 			Cell: (career) => (
	// 				<>
	// 					{career.row.original.isActive ? (
	// 						<span className="badge bg-success-subtle text-success">ACTIVE</span>
	// 					) : (
	// 						<span className="badge bg-danger-subtle text-danger">IN-ACTIVE</span>
	// 					)}
	// 				</>
	// 			),
	// 		},

	// 		{
	// 			Header: "Ordering",
	// 			accessor: "ordering",
	// 			filterable: false,
	// 		},
	// 		{
	// 			Header: "Action",
	// 			Cell: (cellProps) => {
	// 				return (
	// 					<ul className="list-inline hstack gap-2 mb-0">
	// 						{
	// 							useCan("career-menu.edit") ? (
	// 								<li className="list-inline-item" title="Edit">
	// 									<Link className="edit-item-btn" to={`/career-menu/edit/${cellProps.row.original.id}`}>
	// 										<i className="ri-pencil-fill align-bottom text-muted"></i>
	// 									</Link>
	// 								</li>
	// 							) : ""
	// 						}
	// 						{
	// 							useCan("career-menu.delete") ? (
	// 								<li className="list-inline-item" title="Delete">
	// 									<Link
	// 										className="remove-item-btn"
	// 										onClick={() => {
	// 											const LeadData = cellProps.row.original;
	// 											setDeleteModal(true);
	// 											setUID(LeadData.id);
	// 										}}
	// 										to="#"
	// 									>
	// 										<i className="ri-delete-bin-fill align-bottom text-muted"></i>
	// 									</Link>
	// 								</li>
	// 							) : ""
	// 						}
	// 					</ul>
	// 				);
	// 			},
	// 		},
	// 	],
	// 	[]
	// );

	// const columnsCheck = useCanMultiple(["career-menu.edit", "career-menu.delete"]) ? columns : columns.filter((q,index) => index != columns.length - 1);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Career Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										{
											useCan("career-menu.create") ? (
												<Col lg={3}>
													<Link className="btn add-btn btn-primary" to="/career-menu/create">
														<i className="ri-add-fill me-1 align-bottom"></i> Create New
													</Link>
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

						<Col xs={12}>
							<Card id="contactList">
								<CardBody className="pt-0">
									<div>
										{!isLoading ? (
											<TableContainer
												columns={columns}
												data={careers || []}
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
			<DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={careerSelector.isLoading} />
		</React.Fragment>
	);
};

export default CareerApplyMenu;
