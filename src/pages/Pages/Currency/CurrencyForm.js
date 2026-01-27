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
import { createCurrency, fetchCurrencyDetail, resetCurrencyShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
import axios from "axios";
import userProfile from "../../Authentication/user-profile";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CurrencyForm = (props) => {
	const { id } = useParams();
	document.title = `Currency: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const ref = useRef(null);
	const [file, setFile] = useState([]);
	const { token } = userProfile();
	const [subCurrency, setSubCurrency] = useState([]);
	const [selectItem, setSelectItem] = useState([]);
	const [rate, setRate] = useState("");
	const [active, setActive] = useState(false);

	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};

	const selectCurrency = (search) => {
		axios.get(`${api.BASE_URL}/currencies/dropdown?search=${search}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		}).then((res) => {
			if(res.status == "success"){
				setSelectItem(res.data);
				setActive(res.data.length > 0 ? true : false);
			}
		});
	}	

	const updateSubCurrency = (id, value) => {
		const subcurrency = subCurrency;
		const updateSub = subcurrency.map((q) => {
			if(q.id == id){
				return {...q, rate: value};
			} else {
				return q;
			}
		});
		setSubCurrency(updateSub);
	}

	const addSubCurrency = (q) => {
		const item = {id: q.id, image: q.image, title: q.currency, type: q.type};
		const addSub = subCurrency.find((qu) => qu.id == q.id);
		if(!addSub){
			setSubCurrency([...subCurrency, item]);
		}
	}

	const deleteSubCurrency = (id) => {
		const deleteSub = subCurrency.filter((qu) => qu.id != id);
		setSubCurrency(deleteSub);
	}

	useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

	const createCurrencySelector = createSelector(
		(state) => state.CreateCurrencyReducer,
		(layout) => layout
	);
	const useCurrencySelect = useSelector(createCurrencySelector);
	const createCurrencyDetailSelector = createSelector(
		(state) => state.CurrencyDetailReducer,
		(layout) => ({
			currency: layout.currency,
			isLoading: layout.isLoading,
		})
	);
	const { currency, isLoading } = useSelector(createCurrencyDetailSelector);

	useEffect(() => {
		if (id) dispatch(fetchCurrencyDetail(id));

		return () => {
			dispatch(resetCurrencyShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (currency) {
			if (currency.image) {
				setFile([
					{
						source: currency.image,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}
		}
	}, [currency]);

	const currencyValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			currency: currency ? currency.currency : "",
			rate: currency ? currency.rate : "",
			type: currency ? currency.type : "",
			subCurrency: currency ? currency.subCurrency : "",
			status: currency ? (currency.status == 1 ? true : false) : true,
			image: currency ? currency.image : "",
		},
		validationSchema: Yup.object({
			currency: Yup.string().required("Please Enter currency"),
			type: Yup.string().required("Please Enter type"),
			rate: Yup.string().required("Please Enter rate"),
		}),
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			values.subCurrency = subCurrency ? subCurrency : [];
			dispatch(createCurrency(values, props.router.navigate));
		},
	});

	useEffect(() => {
		if(currency){
			const items = JSON.parse(currency.subCurrency);
			setSubCurrency(items);
		}
	},[currency]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Currency Menu" pageTitle="Dashboard" pageLink="/currency-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Currency</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/currency-menu">
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
							currencyValidation.handleSubmit();
							return false;
						}}
						action="#"
					>
						<Row>
							<Col lg={8}>
								<Card>
									{/* <CardHeader>
										<div className="align-items-center d-flex">
											<div className="flex-shrink-0">
												<Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
													<NavItem>
														<NavLink
															style={{ cursor: "pointer" }}
															className={titleTap == "ENG" ? "active" : ""}
															onClick={() => {
																titleTapToggle("ENG");
															}}
														>
															English
														</NavLink>
													</NavItem>
													<NavItem>
														<NavLink
															style={{ cursor: "pointer" }}
															className={titleTap == "KHM" ? "active" : ""}
															onClick={() => {
																titleTapToggle("KHM");
															}}
														>
															Khmer
														</NavLink>
													</NavItem>
												</Nav>
											</div>
										</div>
									</CardHeader> */}
									<CardBody>
										<Row>
											<Col md={12}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="currency-title-input">
														Currency Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="currency-title-input"
														placeholder="Enter currency title"
														name="currency"
														onChange={currencyValidation.handleChange}
														onBlur={currencyValidation.handleBlur}
														value={currencyValidation.values.currency}
														invalid={currencyValidation.touched.currency && currencyValidation.errors.currency ? true : false}
													/>
													{currencyValidation.touched.currency && currencyValidation.errors.currency ? (
														<FormFeedback type="invalid">{currencyValidation.errors.currency}</FormFeedback>
													) : null}
												</div>
											</Col>
											<Col md={6}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="currency-type-input">
														Currency Type <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="currency-type-input"
														placeholder="Enter currency type"
														name="type"
														onChange={currencyValidation.handleChange}
														onBlur={currencyValidation.handleBlur}
														value={currencyValidation.values.type}
														invalid={currencyValidation.touched.type && currencyValidation.errors.type ? true : false}
													/>
													{currencyValidation.touched.type && currencyValidation.errors.type ? (
														<FormFeedback type="invalid">{currencyValidation.errors.type}</FormFeedback>
													) : null}
												</div>
											</Col>
											<Col md={6}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="currency-rate-input">
														Currency Main Rate <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="currency-rate-input"
														placeholder="Enter currency rate"
														name="rate"
														onChange={currencyValidation.handleChange}
														onBlur={currencyValidation.handleBlur}
														value={currencyValidation.values.rate}
														invalid={currencyValidation.touched.rate && currencyValidation.errors.rate ? true : false}
													/>
													{currencyValidation.touched.rate && currencyValidation.errors.rate ? (
														<FormFeedback type="invalid">{currencyValidation.errors.rate}</FormFeedback>
													) : null}
												</div>
											</Col>
										</Row>
										<div className="container-currency" style={{padding: 10, backgroundColor: "#f4f4f4", borderRadius: 5}}>
											<div className="header-currency" style={{position: "relative", marginBottom: 10}}>
												<div className="content-currency">
													<Input type="text" onChange={(e) => selectCurrency(e.target.value)} />
												</div>
												<ul ref={ref} className={`dropdown ${active ? "active" : ""}`}>
													{
														selectItem ? selectItem.map((q) => {
															return <li key={q.id}  onClick={(e) => { addSubCurrency(q); setActive(false); }}><img src={`${api.FILE_URI}/${q.image}`} width={20} /> {q.type} - {q.currency}</li>;
														}) : ""
													}
												</ul>
											</div>
											<div className="body-currency">
												{
													subCurrency.map((q) => (
														<div key={q.id} className="content-currency" style={{padding: 5, borderBottom: "1px solid #e3e3e3", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
															<div style={{flex: "50%", maxWidth: "50%"}}>
																<img src={`${api.FILE_URI}/${q.image}`} width={25} style={{marginRight: 10}} />
																{q.type} - {q.title}
															</div>
															<span style={{flex: "17%", maxWidth: "17%",fontSize: 14,lineHeight: 1}}>({currencyValidation.values.type}) {currencyValidation.values.rate} = </span>
															<Input style={{flex: "15%", maxWidth: "15%"}} type="text" value={q.rate} onChange={(e) =>  updateSubCurrency(q.id, e.target.value)}/>
															<span onClick={() => deleteSubCurrency(q.id)} style={{flex: "10%", maxWidth: "10%", borderRadius: "5px", cursor: "pointer", background: "#ca0000",color: "#fff", textAlign: "center", padding: "0.5rem", fontSize: 20,lineHeight: 1}} className="mdi mdi-delete-empty"></span>
														</div>
													))
												}
												
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
												onChange={currencyValidation.handleChange}
												onBlur={currencyValidation.handleBlur}
												checked={currencyValidation.values.status}
											/>
											<Label className="form-check-label" for="status">
												Status: <span className="fw-bolder">{currencyValidation.values.status ? "Active" : "In-Active"}</span>
											</Label>
										</div>
										{/* <div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isDisplayHomepage"
												name="isDisplayHomepage"
												onChange={currencyValidation.handleChange}
												onBlur={currencyValidation.handleBlur}
												checked={currencyValidation.values.isDisplayHomepage}
											/>
											<Label className="form-check-label" for="isDisplayHomepage">
												Display Homepage: <span className="fw-bolder">{currencyValidation.values.isDisplayHomepage ? "Show" : "Hide"}</span>
											</Label>
										</div> */}
									</CardBody>
								</Card>
								<Card>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="thumbnail-input">
												Flag <small className="text-danger">(100x100pixel)</small>
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
														server={`${api.BASE_URL}/save-image/currency`}
														className="filepond filepond-input-multiple"
														stylePanelLayout="compact"
													/>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useCurrencySelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Currency
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/currency-menu">
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

export default withRouter(CurrencyForm);
