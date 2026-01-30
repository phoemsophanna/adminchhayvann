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
import { fetchPageBannerList } from "../../../store/actions";
import { useCan } from "../../../Components/Common/Permission";

const TableList = ({ onShowDetail, onDeletePageBanner }) => {
	const PageBannerListSelector = createSelector(
		(state) => state.PageBannerListReducer,
		(layout) => ({
			pageBanners: layout.pageBanners,
			message: layout.message,
			isLoading: layout.isLoading,
			success: layout.success,
			error: layout.error,
		})
	);
	const { pageBanners, isLoading, success } = useSelector(PageBannerListSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPageBannerList());
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
				Header: "Page Banner",
				accessor: "pageTitle",
				filterable: false,
				Cell: (PageBanner) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-shrink-0 me-3">
								<div className="avatar-sm bg-light rounded p-1 d-flex align-items-center" style={{ width: "160px" }}>
									{PageBanner.row.original.image ? (
										<img src={api.FILE_URI + PageBanner.row.original.image} alt="" className="img-fluid d-block" />
									) : (
										<div className="mx-auto w-100 h-100">
											<div className="avatar-title bg-success-subtle text-success fs-24">
												<i className="mdi mdi-image-filter-hdr"></i>
											</div>
										</div>
									)}
								</div>
							</div>
							<div className="flex-grow-1">
								<h5 className="fs-14 mb-1">
									<Link to="#" className="text-body">
										{PageBanner.row.original.pageTitle}
									</Link>
								</h5>
							</div>
						</div>
					</>
				),
			},
			// {
			// 	// End Table
			// 	Header: "Status",
			// 	accessor: "isActive",
			// 	filterable: false,
			// 	Cell: (PageBanner) => (
			// 		<>
			// 			{PageBanner.row.original.isActive ? (
			// 				<span className="badge bg-success-subtle text-success">ACTIVE</span>
			// 			) : (
			// 				<span className="badge bg-danger-subtle text-danger">IN-ACTIVE</span>
			// 			)}
			// 		</>
			// 	),
			// },
			{
				Header: "Action",
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack mb-0">
							{
								useCan("page-banner.edit") ? (
									<li className="list-inline-item" title="Edit">
										<Link className="edit-item-btn" to="#" onClick={() => onShowDetail(cellProps.row.original.id)}>
											<i className="ri-pencil-fill align-bottom text-muted"></i>
										</Link>
									</li>
								) : ""
							}
						</ul>
					);
				},
			},
		],
		[onShowDetail]
	);

	const columnsCheck = useCan("page-banner.edit") ? columns : columns.filter((q,index) => index != columns.length - 1);

	return (
		<React.Fragment>
			<Card id="contactList">
				<CardBody className="pt-0">
					<div>
						{success && !isLoading ? (
							<TableContainer
								columns={columnsCheck}
								data={pageBanners || []}
								isGlobalFilter={true}
								isAddPageBannerList={false}
								customPageSize={13}
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
