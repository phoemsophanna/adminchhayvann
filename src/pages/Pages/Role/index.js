import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteRole, fetchRoleList, refreshRoleList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";

const RoleMenu = () => {
	document.title = "Roles | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);

	const roleListSelector = createSelector(
		(state) => state.RoleListReducer,
		(layout) => ({
			roles: layout.roles,
			isLoading: layout.isLoading,
		})
	);

	const { roles, isLoading } = useSelector(roleListSelector);
	const deleteRoleSelector = createSelector(
		(state) => state.RoleListReducer,
		(layout) => layout
	);
	const roleSelector = useSelector(deleteRoleSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshRoleList());
	};

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteRole(UID));
			if (!roleSelector.isLoading) {
				dispatch(fetchRoleList());
				setDeleteModal(false);
			}
		}
	};

	useEffect(() => {
		dispatch(fetchRoleList());
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
				Header: "Role",
				accessor: "title",
				filterable: false,
				Cell: (role) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-grow-1">
								<h5 className="fs-14 mb-1">
									{role.row.original.name}
								</h5>
							</div>
						</div>
					</>
				),
			},
			{
				Header: "Action",
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							{
								useCan("role-menu.edit") ? (
									<li className="list-inline-item" title="Edit">
										<Link className="edit-item-btn" to={`/role-menu/edit/${cellProps.row.original.id}`}>
											<i className="ri-pencil-fill align-bottom text-muted"></i>
										</Link>
									</li>
								) : ""
							}

							{
								useCan("role-menu.delete") ? (
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

	const columnsCheck = useCanMultiple(["role-menu.edit", "role-menu.delete"]) ? columns : columns.filter((q,index) => index != columns.length - 1);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Role Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										{
											useCan("role-menu.create") ? (
												<Col lg={3}>
													<Link className="btn add-btn btn-primary" to="/role-menu/create">
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
												data={roles || []}
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
			<DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={roleSelector.isLoading} />
		</React.Fragment>
	);
};

export default RoleMenu;
