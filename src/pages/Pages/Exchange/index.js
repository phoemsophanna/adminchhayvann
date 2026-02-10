import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteExchange, fetchExchangeList, refreshExchangeList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useCan, useCanMultiple } from "../../../Components/Common/Permission";
import logoExcel from "../../../assets/images/excel.png";
import simpleExcel from "../../../assets/exchangeImportExcel.xlsx";
import * as XLSX from "xlsx";
import axios from "axios";
import { useProfile } from "../../../Components/Hooks/UserHooks";
import UploadImage from "./UploadImage";
import { toast } from "react-toastify";

const ExchangeMenu = () => {
	document.title = "Exchange Rate | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const { token } = useProfile();
	const [deleteModal, setDeleteModal] = useState(false);
	const [modal_backdrop, setModel_backdrop] = useState(false);
	const [modal_image, setModel_image] = useState(false);
	const [excelData, setExcelData] = useState([]);
	const [insertExcel, setInsertExcel] = useState(false);

	const closeModal = () => {
		setModel_backdrop(false);
		setExcelData([]);
	}

	const exchangeListSelector = createSelector(
		(state) => state.ExchangeListReducer,
		(layout) => ({
			exchanges: layout.exchanges,
			isLoading: layout.isLoading,
		})
	);
	const { exchanges, isLoading } = useSelector(exchangeListSelector);
	const deleteExchangeSelector = createSelector(
		(state) => state.ExchangeListReducer,
		(layout) => layout
	);
	const exchangeSelector = useSelector(deleteExchangeSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshExchangeList());
	};

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteExchange(UID));
			if (!exchangeSelector.isLoading) {
				dispatch(fetchExchangeList());
				setDeleteModal(false);
			}
		}
	};

	useEffect(() => {
		dispatch(fetchExchangeList());
	}, [dispatch]);

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (evt) => {
				const bstr = evt.target.result;
				const workbook = XLSX.read(bstr, { type: "binary" });

				// Get first sheet
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];

				// Convert to JSON
				const jsonData = XLSX.utils.sheet_to_json(worksheet);
				setExcelData(jsonData);
			};
			reader.readAsBinaryString(file);
		}
	};

	const columns = useMemo(
		() => [
			{
				Header: "ID",
				accessor: "id",
				Cell: (contact) => <span className="fw-semibold">{parseInt(contact.row.id) + 1}</span>,
				filterable: false,
			},
			{
				Header: "Exchange",
				accessor: "title",
				filterable: false,
				Cell: (exchange) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-shrink-0 me-3">
								<div className="avatar-sm bg-light rounded p-1 d-flex align-items-center">
									{exchange.row.original.image ? (
										<img src={(exchange.row.original.image?.includes("http") ? exchange.row.original.image : api.FILE_URI + exchange.row.original.image)} alt="" className="img-fluid d-block" />
									) : (
										<div className="mx-auto w-100 h-100">
											<div className="avatar-title bg-success-subtle text-success fs-24">
												<i className="mdi mdi-image-filter-hdr"></i>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</>
				),
			},
			{
				Header: "From",
				accessor: "from",
				filterable: false,
			},
			{
				Header: "To",
				accessor: "to",
				filterable: false,
			},
			{
				Header: "Sell",
				accessor: "sell",
				filterable: false,
			},
			{
				Header: "Buy",
				accessor: "buy",
				filterable: false,
			},
			{
				// End Table
				Header: "Status",
				accessor: "isActive",
				filterable: false,
				Cell: (exchange) => (
					<>
						{exchange.row.original.status ? (
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
								useCan("exchange-menu.edit") ? (
									<li className="list-inline-item" title="Edit">
										<Link className="edit-item-btn" to={`/exchange-menu/edit/${cellProps.row.original.id}`}>
											<i className="ri-pencil-fill align-bottom text-muted"></i>
										</Link>
									</li>
								) : ""
							}

							{
								useCan("exchange-menu.delete") ? (
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

	const columnsCheck = useCanMultiple(["exchange-menu.edit", "exchange-menu.delete"]) ? columns : columns.filter((q,index) => index != columns.length - 1);

	const importExcelData = () => {
		setInsertExcel(true);
		axios.post(`${api.BASE_URL}/exchanges/import`, {exchanges: excelData}, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		}).then((res) => {
			if(res?.status == "success") {
				setInsertExcel(false);
				dispatch(fetchExchangeList());
				setExcelData([]);
				setModel_backdrop(false);
			}
		});
	}

	const exportToExcel = () => {
		if(exchanges.length > 0){
			try {
				const items = exchanges.map((q) => {
					return {
						from: q.from,
						to: q.to,
						buy: q.buy,
						sell: q.sell,
						image: q.image.split(":").length > 1 ? q.image : api.FILE_URI + q.image,
						ordering: q.ordering
					};
				});
				const worksheet = XLSX.utils.json_to_sheet(items);
				const workbook = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
				XLSX.writeFile(workbook, "export_excel.xlsx");
			} catch (error) {
				console.log(error);
			}
		} else {
			toast.warning("Not have data to export!");
		}
	}

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Exchange Rate Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										{
											useCan("exchange-menu.create") ? (
												<>
													<Col lg={8}>
														<Link className="btn add-btn btn-primary" to="/exchange-menu/create">
															<i className="ri-add-fill me-1 align-bottom"></i> Create New
														</Link>
														<Link className="btn add-btn btn-success" onClick={() => setModel_backdrop(true)} style={{marginLeft: 10}} to="#">
															<span className="mdi mdi-import"></span> Import Excel
														</Link>
														<Link className="btn add-btn btn-danger" onClick={() => setModel_image(true)} style={{marginLeft: 10}} to="#">
															<span className="mdi mdi-image"></span> Image Exchange
														</Link>
														<Link className="btn add-btn btn-info" onClick={() => exportToExcel()} style={{marginLeft: 10}} to="#">
															<span className="mdi mdi-export"></span> Export
														</Link>
													</Col>
												</>

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
												data={exchanges || []}
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
			<DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={exchangeSelector.isLoading} />
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
						{"Import Exchange Excel"}
					</div>
				</ModalHeader>

				<ModalBody>
					<Row>
						<div className="mb-3">
							<Label className="form-label file-uploads" htmlFor="exchange-rate-to-input">
							<div className="file-upload">
								<div className="content-Image">
									<img src={logoExcel} alt={logoExcel} />
								</div>
								<div className="content-text">
									Drag&Drop file here or <span>Choose File</span>
								</div>
							</div>
							</Label>
							<small className="text-danger">Supported format: .xlsx</small>
							<Input
								type="file"
								className="form-control"
								id="exchange-rate-to-input"
								placeholder="Enter exchange rate to"
								name="to"
								onChange={(e) => handleFileUpload(e)}
								style={{visibility: "hidden", position: "absolute"}}
								accept=".xlsx,.xls"
							/>
							{
								excelData?.length > 0 ? (
									<div className="list-exchnage-rate mt-2">
										{
											insertExcel ? (
												<Button color="success" className="btn-load mb-2">
													<span className="d-flex align-items-center">
														<Spinner size="sm" className="flex-shrink-0">
															Loading...
														</Spinner>
														<span className="flex-grow-1 ms-2">Loading...</span>
													</span>
												</Button>
											) : (
												<button className="btn btn-success mb-2" onClick={() => importExcelData()}>
													<i className="ri-add-fill me-1 align-bottom"></i>Import
												</button>
											)
										}
										<table className="table table-bordered">
											<thead>
												<tr>
													<th>No.</th>
													<th>Image</th>
													<th>From</th>
													<th>To</th>
													<th>Buy</th>
													<th>Sell</th>
													<th>Ordering</th>
												</tr>
											</thead>
											<tbody>
												{
													excelData.map((q,i) => {
														return <tr key={i}>
															<td>{i + 1}</td>
															<td><img src={q?.image} alt={q?.image} width={70} style={{paddingLeft: 0}} /></td>
															<td>{q?.from}</td>
															<td>{q?.to}</td>
															<td>{q?.buy}</td>
															<td>{q?.sell}</td>
															<td>{q?.ordering}</td>
														</tr>
													})
												}
											</tbody>
										</table>
									</div>
									
								) : ""
							}
							<div className="sample-excel mt-2">
								<div className="content-Image">
									<img src={logoExcel} alt={logoExcel} />
								</div>
								<div className="content-text">
									<h6 style={{marginBottom: 5, lineHeight: 1}}>Simple Template</h6>
									<p style={{fontSize: 12,marginBottom: 5}}>
										You can download template as starting point for your own file.
									</p>
									<a className="btn btn-success" href={simpleExcel} download={`sample.xlsx`}>Download</a>
								</div>
							</div>
						</div>
					</Row>
				</ModalBody>
			</Modal>
			<UploadImage modal={modal_image} setModal={setModel_image} />
		</React.Fragment>
	);
};

export default ExchangeMenu;
