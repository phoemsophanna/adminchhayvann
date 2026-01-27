import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, fetchBannerList, refreshBannerList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";

const BannerMenu = () => {
	document.title = "Banner | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);

	const bannerListSelector = createSelector(
		(state) => state.BannerListReducer,
		(layout) => ({
			banners: layout.banners,
			isLoading: layout.isLoading,
		})
	);
	const { banners, isLoading } = useSelector(bannerListSelector);
	const deleteBannerSelector = createSelector(
		(state) => state.BannerListReducer,
		(layout) => layout
	);
	const bannerSelector = useSelector(deleteBannerSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshBannerList());
	};

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteBanner(UID));
			if (!bannerSelector.isLoading) {
				dispatch(fetchBannerList());
				setDeleteModal(false);
			}
		}
	};

	useEffect(() => {
		dispatch(fetchBannerList());
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
				Header: "Banner",
				accessor: "title",
				filterable: false,
				Cell: (banner) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-shrink-0 me-3">
								<div className="avatar-sm bg-light rounded p-1 d-flex align-items-center">
									{banner.row.original.image ? (
										<img src={api.FILE_URI + banner.row.original.image} alt="" className="img-fluid d-block" />
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
										{banner.row.original.title}
									</Link>
								</h5>
								<p className="text-muted mb-0 text-truncate" style={{ width: "250px" }}>
									<span className="fw-medium ">{banner.row.original.subtitle}</span>
								</p>
							</div>
						</div>
					</>
				),
			},
			{
				Header: "Redirect To",
				accessor: "linkTo",
				Cell: (banner) => (
					<>
						{banner.row.original.redirectNewTap ? (
							<a href={banner.row.original.linkTo} target="_blank" rel="noreferrer">
								{banner.row.original.linkTo}
							</a>
						) : (
							<a href={`${api.WEBSITE}/${banner.row.original.linkTo}`} target="_blank" rel="noreferrer">
								{banner.row.original.linkTo}
							</a>
						)}
					</>
				),
				filterable: false,
			},
			{
				Header: "Ordering",
				accessor: "ordering",
				filterable: false,
			},
			{
				// End Table
				Header: "Status",
				accessor: "isActive",
				filterable: false,
				Cell: (banner) => (
					<>
						{banner.row.original.isActive ? (
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
								useCan("banner-menu.edit") ? (
									<li className="list-inline-item" title="Edit">
										<Link className="edit-item-btn" to={`/banner-menu/edit/${cellProps.row.original.id}`}>
											<i className="ri-pencil-fill align-bottom text-muted"></i>
										</Link>
									</li>
								) : ""
							}

							{
								useCan("banner-menu.delete") ? (
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

	const columnsCheck = useCanMultiple(["banner-menu.edit", "banner-menu.delete"]) ? columns : columns.filter((q,index) => index != columns.length - 1);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Banner Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										{
											useCan("banner-menu.create") ? (
												<Col lg={3}>
													<Link className="btn add-btn btn-primary" to="/banner-menu/create">
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
												data={banners || []}
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
			<DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={bannerSelector.isLoading} />
		</React.Fragment>
	);
};

export default BannerMenu;
