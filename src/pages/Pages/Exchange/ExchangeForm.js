import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import TinymceEditor from "../../../Components/Common/TinymceEditor";

import * as Yup from "yup";
import { useFormik } from "formik";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { createExchange, fetchExchangeDetail, resetExchangeShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ExchangeForm = (props) => {
	const { id } = useParams();
	document.title = `Exchange Rate: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [contentDesc, setContentDesc] = useState("");
	const [contentKmDesc, setContentKmDesc] = useState("");

	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};


	const createExchangeSelector = createSelector(
		(state) => state.CreateExchangeReducer,
		(layout) => layout
	);
	const useExchangeSelect = useSelector(createExchangeSelector);
	const createExchangeDetailSelector = createSelector(
		(state) => state.ExchangeDetailReducer,
		(layout) => ({
			exchange: layout.exchange,
			isLoading: layout.isLoading,
		})
	);
	const { exchange, isLoading } = useSelector(createExchangeDetailSelector);

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	};

	const handleEditorChangeKm = (e) => {
		setContentKmDesc(e.target.getContent());
	};

	useEffect(() => {
		if (id) dispatch(fetchExchangeDetail(id));

		return () => {
			dispatch(resetExchangeShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (exchange) {
			setContentDesc(exchange.content);
			setContentKmDesc(exchange.contentKm);
			if (exchange.image) {
				setFile([
					{
						source: exchange.image,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}
		} else {
			setContentDesc("");
			setContentKmDesc("");
		}
	}, [exchange]);

	const exchangeValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			from: exchange ? exchange.from : "",
			to: exchange ? exchange.to : "",
			sell: exchange ? exchange.sell : "",
			buy: exchange ? exchange.buy : "",
			status: exchange ? (exchange.status === 1 ? true : false) : "",
			image: exchange ? exchange.image : "",
			ordering: exchange ? exchange.ordering : 0,
		},
		validationSchema: Yup.object({
			from: Yup.string().required("Please Enter From"),
			to: Yup.string().required("Please Enter To"),
		}),
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createExchange(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Exchange Rate Menu" pageTitle="Dashboard" pageLink="/exchange-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Exchange Rate</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/exchange-menu">
													<i className="ri-arrow-go-back-line me-1 align-bottom"></i> Back
												</Link>
											</div>
										</Col>
									</Row>
								</CardHeader>
							</Card>
						</Col>
					</Row>

					<Form
						onSubmit={(e) => {
							e.preventDefault();
							exchangeValidation.handleSubmit();
							return false;
						}}
						action="#"
					>
						<Row>
							<Col lg={8}>
								<Card>
									<CardBody>
										<Row>
											<Col md={6}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="exchange-rate-from-input">
														From <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="exchange-rate-from-input"
														placeholder="Enter exchange rate from"
														name="from"
														onChange={exchangeValidation.handleChange}
														onBlur={exchangeValidation.handleBlur}
														value={exchangeValidation.values.from}
														invalid={exchangeValidation.touched.from && exchangeValidation.errors.from ? true : false}
													/>
													{exchangeValidation.touched.from && exchangeValidation.errors.from ? (
														<FormFeedback type="invalid">{exchangeValidation.errors.from}</FormFeedback>
													) : null}
												</div>
											</Col>
											<Col md={6}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="exchange-rate-to-input">
														To <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="exchange-rate-to-input"
														placeholder="Enter exchange rate to"
														name="to"
														onChange={exchangeValidation.handleChange}
														onBlur={exchangeValidation.handleBlur}
														value={exchangeValidation.values.to}
														invalid={exchangeValidation.touched.to && exchangeValidation.errors.to ? true : false}
													/>
													{exchangeValidation.touched.to && exchangeValidation.errors.to ? (
														<FormFeedback type="invalid">{exchangeValidation.errors.to}</FormFeedback>
													) : null}
												</div>
											</Col>
											<Col md={6}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="exchange-rate-sell-input">
														Sell
													</Label>
													<Input
														type="text"
														className="form-control"
														id="exchange-rate-sell-input"
														placeholder="Enter exchange rate sell"
														name="sell"
														onChange={exchangeValidation.handleChange}
														onBlur={exchangeValidation.handleBlur}
														value={exchangeValidation.values.sell}
														invalid={exchangeValidation.touched.sell && exchangeValidation.errors.sell ? true : false}
													/>
												</div>
											</Col>
											<Col md={6}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="exchange-rate-buy-input">
														Buy
													</Label>
													<Input
														type="text"
														className="form-control"
														id="exchange-rate-buy-input"
														placeholder="Enter exchange rate buy"
														name="buy"
														onChange={exchangeValidation.handleChange}
														onBlur={exchangeValidation.handleBlur}
														value={exchangeValidation.values.buy}
														invalid={exchangeValidation.touched.buy && exchangeValidation.errors.buy ? true : false}
													/>
												</div>
											</Col>
										</Row>
										
										
										<div className="mb-3">
											<Label className="form-label" htmlFor="thumbnail-input">
												Logo <small className="text-danger">(600x260 px)</small>
											</Label>
											<div className="position-relative d-block mx-auto">
												<div style={{ width: "100%" }}>
													<FilePond
														labelIdle='<span class="filepond--label-action">Choose Image</span>'
														files={file}
														onupdatefiles={setFile}
														allowMultiple={false}
														maxFiles={1}
														name="file"
														server={`${api.BASE_URL}/save-image/exchange`}
														className="filepond filepond-input-multiple"
														stylePanelLayout="compact"
													/>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={4}>
								<Card>
									<CardHeader>
										<div className="fw-bold">Published</div>
									</CardHeader>
									<CardBody>
										<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isActive"
												name="status"
												onChange={exchangeValidation.handleChange}
												onBlur={exchangeValidation.handleBlur}
												checked={exchangeValidation.values.status}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{exchangeValidation.values.status ? "Active" : "In-Active"}</span>
											</Label>
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="exchange-rate-ordering-input">
												Ordering
											</Label>
											<Input
												type="text"
												className="form-control"
												id="exchange-rate-ordering-input"
												placeholder="Enter exchange rate ordering"
												name="ordering"
												onChange={exchangeValidation.handleChange}
												onBlur={exchangeValidation.handleBlur}
												value={exchangeValidation.values.ordering}
												invalid={exchangeValidation.touched.ordering && exchangeValidation.errors.ordering ? true : false}
											/>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useExchangeSelect.isLoading ? (
										<Button color="primary" className="btn-load">
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										</Button>
									) : (
										<Button type="submit" color="primary" className="btn-label">
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Exchange
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/exchange-menu">
										<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
									</Link>
								</div>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default withRouter(ExchangeForm);
