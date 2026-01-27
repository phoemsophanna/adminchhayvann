import React, { useMemo } from "react";
import { Card, CardBody } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";

import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProjectCategoryList } from "../../../store/actions";

const TableList = ({ onShowDetail, onDeleteProjectCategory }) => {
	const projectCategoryListSelector = createSelector(
		(state) => state.ProjectCategoryListReducer,
		(layout) => ({
			projectCategories: layout.projectCategories,
			message: layout.message,
			isLoading: layout.isLoading,
			success: layout.success,
			error: layout.error,
		})
	);
	const { projectCategories, isLoading, success } = useSelector(projectCategoryListSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProjectCategoryList());
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
				Header: "Project's Name",
				accessor: "name",
				filterable: false,
				Cell: (contact) => <span className="fw-semibold">{contact.row.original.name}</span>,
			},
			{
				Header: "Ordering",
				accessor: "ordering",
				filterable: false,
			},
			{
				Header: "Status",
				accessor: "isActive",
				filterable: false,
				Cell: (projectCategory) => (
					<>
						{projectCategory.row.original.isActive ? (
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
							<li className="list-inline-item" title="Edit">
								<Link className="edit-item-btn" to="#" onClick={() => onShowDetail(cellProps.row.original.id)}>
									<i className="ri-pencil-fill align-bottom text-muted"></i>
								</Link>
							</li>
							<li className="list-inline-item" title="Delete">
								<Link className="remove-item-btn" onClick={() => onDeleteProjectCategory(cellProps.row.original.id)} to="#">
									<i className="ri-delete-bin-fill align-bottom text-muted"></i>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[onShowDetail, onDeleteProjectCategory]
	);
	return (
		<React.Fragment>
			<Card id="contactList">
				<CardBody className="pt-0">
					<div>
						{success && !isLoading ? (
							<TableContainer
								columns={columns}
								data={projectCategories || []}
								isGlobalFilter={true}
								isAddProjectCategoryList={false}
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
