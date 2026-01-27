import React, { useMemo } from "react";
import { Card, CardBody } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";
import { api } from "../../../config";

import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPartnerList } from "../../../store/actions";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";

const TableList = ({ onShowDetail, onDeletePartner }) => {
	const partnerListSelector = createSelector(
		(state) => state.PartnerListReducer,
		(layout) => ({
			partners: layout.partners,
			message: layout.message,
			isLoading: layout.isLoading,
			success: layout.success,
			error: layout.error,
		})
	);
	const { partners, isLoading, success } = useSelector(partnerListSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPartnerList());
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
				Header: "Image",
				accessor: "name",
				filterable: false,
				Cell: (contact) => <img src={`${api.FILE_URI}/${contact.row.original.image}`} style={{width: 80}} alt="" />,
			},
			{
				Header: "Status",
				accessor: "isActive",
				filterable: false,
				Cell: (partner) => (
					<>
						{partner.row.original.isActive ? (
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
								useCan("partners-menu.edit") ? (
									<li className="list-inline-item" title="Edit">
										<Link className="edit-item-btn" to="#" onClick={() => onShowDetail(cellProps.row.original.id)}>
											<i className="ri-pencil-fill align-bottom text-muted"></i>
										</Link>
									</li>
								) : ""
							}

							{
								useCan("partners-menu.delete") ? (
									<li className="list-inline-item" title="Delete">
										<Link className="remove-item-btn" onClick={() => onDeletePartner(cellProps.row.original.id)} to="#">
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
		[onShowDetail, onDeletePartner]
	);

	const columnsCheck = useCanMultiple(["partners-menu.edit", "partners-menu.delete"]) ? columns : columns.filter((q,index) => index != columns.length - 1);

	return (
		<React.Fragment>
			<Card id="contactList">
				<CardBody className="pt-0">
					<div>
						{success && !isLoading ? (
							<TableContainer
								columns={columnsCheck}
								data={partners || []}
								isGlobalFilter={true}
								isAddPartnerList={false}
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
