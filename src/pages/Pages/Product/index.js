import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProductList, refreshProductList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";

const ProductMenu = () => {
	document.title = "Product | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);

	const productListSelector = createSelector(
		(state) => state.ProductListReducer,
		(layout) => ({
			products: layout.products,
			isLoading: layout.isLoading,
		})
	);
	const { products, isLoading } = useSelector(productListSelector);
	const deleteProductSelector = createSelector(
		(state) => state.ProductListReducer,
		(layout) => layout
	);
	const productSelector = useSelector(deleteProductSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshProductList());
	};

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteProduct(UID));
			if (!productSelector.isLoading) {
				dispatch(fetchProductList());
				setDeleteModal(false);
			}
		}
	};

	console.log(isLoading);

	useEffect(() => {
		dispatch(fetchProductList());
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
				Header: "Product",
				accessor: "title",
				filterable: false,
				Cell: (product) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-shrink-0 me-3">
								<div className="avatar-sm bg-light rounded p-1 d-flex align-items-center">
									{product.row.original.image ? (
										<img src={api.FILE_URI + product.row.original.image} alt="" className="img-fluid d-block" />
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
										{product.row.original.title}
									</Link>
								</h5>
							</div>
						</div>
					</>
				),
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
				Cell: (product) => (
					<>
						{product.row.original.status ? (
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
								useCan("product-menu.edit") ? (
									<li className="list-inline-item" title="Edit">
										<Link className="edit-item-btn" to={`/product-menu/edit/${cellProps.row.original.id}`}>
											<i className="ri-pencil-fill align-bottom text-muted"></i>
										</Link>
									</li>
								) : ""
							}
							{
								useCan("product-menu.delete") ? (
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

	const columnsCheck = useCanMultiple(["product-menu.edit", "product-menu.delete"]) ? columns : columns.filter((q,index) => index != columns.length - 1);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Product Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										{
											useCan("product-menu.create") ? (
												<Col lg={3}>
													<Link className="btn add-btn btn-primary" to="/product-menu/create">
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
												columns={columnsCheck}
												data={products || []}
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
			<DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={productSelector.isLoading} />
		</React.Fragment>
	);
};

export default ProductMenu;
