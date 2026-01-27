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
import { createProduct, fetchProductDetail, resetProductShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ProductForm = (props) => {
	const { id } = useParams();
	document.title = `Product: ${id ? "Edit" : "create"} | Admin & Dashboards`;
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


	const createProductSelector = createSelector(
		(state) => state.CreateProductReducer,
		(layout) => layout
	);
	const useProductSelect = useSelector(createProductSelector);
	const createProductDetailSelector = createSelector(
		(state) => state.ProductDetailReducer,
		(layout) => ({
			product: layout.product,
			isLoading: layout.isLoading,
		})
	);
	const { product, isLoading } = useSelector(createProductDetailSelector);

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	};

	const handleEditorChangeKm = (e) => {
		setContentKmDesc(e.target.getContent());
	};

	useEffect(() => {
		if (id) dispatch(fetchProductDetail(id));

		return () => {
			dispatch(resetProductShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (product) {
			setContentDesc(product.description);
			setContentKmDesc(product.descriptionKm);
			if (product.gallery) {
				const images = product.gallery?.map((image) => ({
					source: image,
					options: { type: "local" },
				}));
				setFile(images);
			} else {
				setFile([]);
			}
		} else {
			setContentDesc("");
			setContentKmDesc("");
		}
	}, [product]);

	const productValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			title: product ? product.title : "",
			titleKm: product ? product.titleKm : "",
			description: product ? product.description : "",
			descriptionKm: product ? product.descriptionKm : "",
			type: product ? product.type : "",
			country: product ? product.country : "",
			ordering: product ? product.ordering : 0,
			status: product ? (product.status === 1 ? true : false) : true,
			gallery: product ? product.gallery : "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Please Enter Title"),
		}),
		onSubmit: (values) => {
			values.description = contentDesc;
			values.descriptionKm = contentKmDesc;
			values.gallery = file?.length > 0 ? file.map((el) => (el.serverId ? el.serverId : el.source)) : [];
			dispatch(createProduct(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Product Menu" pageTitle="Dashboard" pageLink="/product-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Product</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/product-menu">
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
							productValidation.handleSubmit();
							return false;
						}}
						action="#"
					>
						<Row>
							<Col lg={8}>
								<Card>
									<CardHeader>
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
									</CardHeader>
									<CardBody>
										<TabContent activeTab={titleTap}>
											<TabPane tabId={"ENG"} id="eng">
												<div className="mb-3">
													<Label className="form-label" htmlFor="product-title-input">
														Product Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="product-title-input"
														placeholder="Enter product title"
														name="title"
														onChange={productValidation.handleChange}
														onBlur={productValidation.handleBlur}
														value={productValidation.values.title}
														invalid={productValidation.touched.title && productValidation.errors.title ? true : false}
													/>
													{productValidation.touched.title && productValidation.errors.title ? (
														<FormFeedback type="invalid">{productValidation.errors.title}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label>Description</Label>
													<TinymceEditor onUploadImage={handleEditorChange} initDataValue={contentDesc} />
												</div>
											</TabPane>
											<TabPane tabId={"KHM"} id="khm">
												<div className="mb-3">
													<Label className="form-label" htmlFor="product-title-km-input">
														Product Title Khmer <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="product-title-km-input"
														placeholder="Enter product title"
														name="title"
														onChange={productValidation.handleChange}
														onBlur={productValidation.handleBlur}
														value={productValidation.values.titleKm}
														invalid={productValidation.touched.titleKm && productValidation.errors.titleKm ? true : false}
													/>
													{productValidation.touched.titleKm && productValidation.errors.titleKm ? (
														<FormFeedback type="invalid">{productValidation.errors.titleKm}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label>Description Khmer</Label>
													<TinymceEditor onUploadImage={handleEditorChangeKm} initDataValue={contentKmDesc} />
												</div>
											</TabPane>
										</TabContent>

										<div className="mb-3">
											<Label className="form-label" htmlFor="product-type-input">
												Product Type
											</Label>
											<Input
												type="text"
												className="form-control"
												id="product-type-input"
												placeholder="Enter product type"
												name="type"
												onChange={productValidation.handleChange}
												onBlur={productValidation.handleBlur}
												value={productValidation.values.type}
												invalid={productValidation.touched.type && productValidation.errors.type ? true : false}
											/>
										</div>

										<div className="mb-3">
											<Label className="form-label" htmlFor="product-country-input">
												Country
											</Label>
											<Input
												type="text"
												className="form-control"
												id="product-country-input"
												placeholder="Enter product country"
												name="country"
												onChange={productValidation.handleChange}
												onBlur={productValidation.handleBlur}
												value={productValidation.values.country}
												invalid={productValidation.touched.country && productValidation.errors.country ? true : false}
											/>
										</div>
										
										<div className="mb-3">
											<Label className="form-label" htmlFor="thumbnail-input">
												Image <small className="text-danger">(350x660pixel)</small>
											</Label>
											<div className="position-relative d-block mx-auto">
												<div style={{ width: "100%" }}>
													<FilePond
														labelIdle='<span class="filepond--label-action">Choose Image</span>'
														files={file}
														onupdatefiles={setFile}
														allowMultiple={true}
														maxFiles={5}
														name="file"
														server={`${api.BASE_URL}/save-image/product`}
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
												onChange={productValidation.handleChange}
												onBlur={productValidation.handleBlur}
												checked={productValidation.values.status}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{productValidation.values.status ? "Active" : "In-Active"}</span>
											</Label>
										</div>
										{/* <div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isDisplayHomepage"
												name="isDisplayHomepage"
												onChange={productValidation.handleChange}
												onBlur={productValidation.handleBlur}
												checked={productValidation.values.isDisplayHomepage}
											/>
											<Label className="form-check-label" for="isDisplayHomepage">
												Display Homepage: <span className="fw-bolder">{productValidation.values.isDisplayHomepage ? "Show" : "Hide"}</span>
											</Label>
										</div> */}
									</CardBody>
								</Card>
								<Card>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="product-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="product-ordering-input"
												placeholder="Enter product ordering"
												name="ordering"
												onChange={productValidation.handleChange}
												onBlur={productValidation.handleBlur}
												value={productValidation.values.ordering}
											/>
										</div>
										<div className="mb-2" hidden>
											<Label htmlFor="metaKeyword" className="form-label">
												Meta Keyword
											</Label>
											<Input
												id="metaKeyword"
												name="metaKeyword"
												type="textarea"
												className="form-control"
												placeholder="Enter text"
												onChange={productValidation.handleChange}
												onBlur={productValidation.handleBlur}
												value={productValidation.values.metaKeyword || ""}
											/>
										</div>
										<div className="mb-2" hidden>
											<Label htmlFor="metaDesc" className="form-label">
												Meta Description
											</Label>
											<Input
												id="metaDesc"
												name="metaDesc"
												type="textarea"
												className="form-control"
												placeholder="Enter text"
												onChange={productValidation.handleChange}
												onBlur={productValidation.handleBlur}
												value={productValidation.values.metaDesc || ""}
											/>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useProductSelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Product
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/product-menu">
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

export default withRouter(ProductForm);
