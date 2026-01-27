import React, { useMemo } from "react";
import { Card, CardBody } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";

import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFaqList } from "../../../store/actions";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";

const TableList = ({ onShowDetail, onDeleteFaq }) => {
	const faqListSelector = createSelector(
		(state) => state.FaqListReducer,
		(layout) => ({
			faqs: layout.faqs,
			message: layout.message,
			isLoading: layout.isLoading,
			success: layout.success,
			error: layout.error,
		})
	);
	const { faqs, isLoading, success } = useSelector(faqListSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchFaqList());
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
				Header: "Faq",
				accessor: "question",
				filterable: false,
				Cell: (faq) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								<Link to="#" className="text-body">
									{faq.row.original.question}
								</Link>
							</h5>
							<p className="text-muted mb-0 text-truncate" style={{ width: "250px" }}>
								<span className="fw-medium ">{faq.row.original.answer}</span>
							</p>
						</div>
					</div>
				),
			},
			{
				Header: "Status",
				accessor: "isActive",
				filterable: false,
				Cell: (faq) => (
					<>
						{faq.row.original.isActive ? (
							<span className="badge bg-success-subtle text-success">ACTIVE</span>
						) : (
							<span className="badge bg-danger-subtle text-danger">IN-ACTIVE</span>
						)}
					</>
				),
			},

			{
				Header: "Ordering",
				accessor: "ordering",
				filterable: false,
			},
			{
				Header: "Action",
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							{
								useCan("faq.edit") ? (
									<li className="list-inline-item" title="Edit">
										<Link className="edit-item-btn" to="#" onClick={() => onShowDetail(cellProps.row.original.id)}>
											<i className="ri-pencil-fill align-bottom text-muted"></i>
										</Link>
									</li>
								) : ""
							}

							{
								useCan("faq.delete") ? (
									<li className="list-inline-item" title="Delete">
										<Link className="remove-item-btn" onClick={() => onDeleteFaq(cellProps.row.original.id)} to="#">
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
		[onShowDetail, onDeleteFaq]
	);

	const columnsCheck = useCanMultiple(["faq.edit", "faq.delete"]) ? columns : columns.filter((q,index) => index != columns.length - 1);
	return (
		<React.Fragment>
			<Card id="contactList">
				<CardBody className="pt-0">
					<div>
						{success && !isLoading ? (
							<TableContainer
								columns={columnsCheck}
								data={faqs || []}
								isGlobalFilter={true}
								isAddFaqList={false}
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
