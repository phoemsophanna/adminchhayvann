import React, { useMemo, useState } from "react";
import { Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";

// Config
import { api } from "../../../config";

import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserList } from "../../../store/actions";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";

const TableList = ({ onShowDetail, onDeleteUser }) => {
	const userListSelector = createSelector(
		(state) => state.UserListReducer,
		(layout) => ({
			users: layout.users,
			message: layout.message,
			isLoading: layout.isLoading,
			success: layout.success,
			error: layout.error,
		})
	);
	const { users, isLoading, success } = useSelector(userListSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserList());
	}, [dispatch]);

	// Column
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
				accessor: "name",
				filterable: false,
				Cell: (contact) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-shrink-0">
								{contact.row.original.image ? (
									<img src={api.FILE_URI + contact.row.original.image} alt="" className="avatar-xxs rounded-circle" />
								) : (
									<div className="flex-shrink-0 avatar-xs me-2">
										<div className="avatar-title bg-success-subtle text-success rounded-circle fs-13">{contact.row.original.name.charAt(0)}</div>
									</div>
								)}
							</div>
							<div className="flex-grow-1 ms-2 name">{contact.row.original.name}</div>
						</div>
					</>
				),
			},
			{
				Header: "Email",
				accessor: "email",
				filterable: false,
			},
			{
				Header: "Phone No",
				accessor: "phoneNumber",
				filterable: false,
			},
			{
				Header: "Role",
				accessor: "userRole",
				filterable: false,
			},
			{
				Header: "Status",
				accessor: "isActive",
				filterable: false,
				Cell: (user) => (
					<>
						{user.row.original.isActive ? (
							<span className="badge bg-success-subtle text-success">ACTIVE</span>
						) : (
							<span className="badge bg-danger-subtle text-danger">IN-ACTIVE</span>
						)}
					</>
				),
			},
			{
				Header: "Action",
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							{
								useCan("user-management.edit") ? (
									<li className="list-inline-item" title="Edit">
										<Link className="edit-item-btn" to="#" onClick={() => onShowDetail(cellProps.row.original.id)}>
											<i className="ri-pencil-fill align-bottom text-muted"></i>
										</Link>
									</li>
								) : ""
							}
							{
								useCan("user-management.delete") ? (
									<li className="list-inline-item" title="Delete">
										<Link className="remove-item-btn" onClick={() => onDeleteUser(cellProps.row.original.id)} to="#">
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
		[onShowDetail, onDeleteUser]
	);

	const columnsCheck = useCanMultiple(["user-management.edit", "user-management.delete"]) ? columns : columns.filter((q,index) => index != columns.length - 1);

	return (
		<React.Fragment>
			<Card id="contactList">
				<CardBody className="pt-0">
					<div>
						{success && !isLoading ? (
							<TableContainer
								columns={columnsCheck}
								data={users || []}
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
		</React.Fragment>
	);
};

export default TableList;
