import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Nav,
	NavItem,
	NavLink, Row, Spinner, 
	TabContent,
	TabPane} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";

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
import { createBanner, fetchBannerDetail, resetBannerShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const BannerForm = (props) => {
	const { id } = useParams();
	document.title = `Banner: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);

	const createBannerSelector = createSelector(
		(state) => state.CreateBannerReducer,
		(layout) => layout
	);
	const useBannerSelect = useSelector(createBannerSelector);
	const createBannerDetailSelector = createSelector(
		(state) => state.BannerDetailReducer,
		(layout) => ({
			banner: layout.banner,
			isLoading: layout.isLoading,
		})
	);
	const { banner, isLoading } = useSelector(createBannerDetailSelector);

	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};

	useEffect(() => {
		if (id) dispatch(fetchBannerDetail(id));

		return () => {
			dispatch(resetBannerShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (banner) {
			if (banner.image) {
				setFile([
					{
						source: banner.image,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}
		}
	}, [banner]);

	const bannerValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			title: banner ? banner.title : "",
			titleKm: banner ? banner.titleKm : "",
			subtitle: banner ? banner.subtitle : "",
			linkLabel: banner ? banner.linkLabel : "",
			linkLabelKm: banner ? banner.linkLabelKm : "",
			linkTo: banner ? banner.linkTo : "",
			redirectNewTap: banner ? (banner.redirectNewTap === 1 ? true : false) : false,
			description: banner ? banner.description : "",
			descriptionKm: banner ? banner.descriptionKm : "",
			ordering: banner ? banner.ordering : 0,
			isActive: banner ? (banner.isActive === 1 ? true : false) : true,
			image: banner ? banner.image : "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Please Enter Title"),
		}),
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createBanner(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Banner Menu" pageTitle="Dashboard" pageLink="/banner-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Banner</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/banner-menu">
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
							bannerValidation.handleSubmit();
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
											<TabPane tabId="ENG" id="eng">
												<div className="mb-3">
													<Label className="form-label" htmlFor="banner-title-input">
														Banner Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="banner-title-input"
														placeholder="Enter banner title"
														name="title"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.title}
														invalid={bannerValidation.touched.title && bannerValidation.errors.title ? true : false}
													/>
													{bannerValidation.touched.title && bannerValidation.errors.title ? (
														<FormFeedback type="invalid">{bannerValidation.errors.title}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="description-input">
														Description
													</Label>
													<textarea
														className="form-control"
														id="description-input"
														rows="3"
														placeholder="Enter description"
														name="description"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.description}
													></textarea>
												</div>
											</TabPane>
											<TabPane tabId="KHM" id="khm">
												<div className="mb-3">
													<Label className="form-label" htmlFor="banner-title-input">
														Banner Title Khmer <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="banner-title-khm-input"
														placeholder="Enter banner title khmer"
														name="titleKm"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.titleKm}
														invalid={bannerValidation.touched.titleKm && bannerValidation.errors.titleKm ? true : false}
													/>
													{bannerValidation.touched.titleKm && bannerValidation.errors.titleKm ? (
														<FormFeedback type="invalid">{bannerValidation.errors.titleKm}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="description-khm-input">
														Description Khmer
													</Label>
													<textarea
														className="form-control"
														id="description-khm-input"
														rows="3"
														placeholder="Enter description khmer"
														name="descriptionKm"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.descriptionKm}
													></textarea>
												</div>
											</TabPane>
										</TabContent>
										<div className="mb-3">
											<Label className="form-label" htmlFor="thumbnail-input">
												Thumbnail <small className="text-danger">(1920x1000 pixel)</small>
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
														server={`${api.BASE_URL}/save-image/banner`}
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
										<div className="fw-bold">Link</div>
									</CardHeader>
									<CardBody>
										<TabContent activeTab={titleTap}>
											<TabPane tabId="ENG" id="eng">
												<div className="mb-3">
													<Label className="form-label" htmlFor="banner-linkLabel-input">
														Label
													</Label>
													<Input
														type="text"
														className="form-control"
														id="banner-linkLabel-input"
														placeholder="Enter banner label"
														name="linkLabelKm"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.linkLabel}
													/>
												</div>
											</TabPane>
											<TabPane tabId="KHM" id="khm">
												<div className="mb-3">
													<Label className="form-label" htmlFor="banner-linkLabel-khm-input">
														Label Khmer
													</Label>
													<Input
														type="text"
														className="form-control"
														id="banner-linkLabel-khm-input"
														placeholder="Enter banner label khmer"
														name="linkLabelKm"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.linkLabelKm}
													/>
												</div>
											</TabPane>
										</TabContent>
										<div className="mb-3">
											<Label className="form-label" htmlFor="banner-linkTo-input">
												Redirect To
											</Label>
											<Input
												type="text"
												className="form-control"
												id="banner-linkTo-input"
												placeholder="Enter banner link"
												name="linkTo"
												onChange={bannerValidation.handleChange}
												onBlur={bannerValidation.handleBlur}
												value={bannerValidation.values.linkTo}
											/>
										</div>
										<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="redirectNewTap"
												name="redirectNewTap"
												onChange={bannerValidation.handleChange}
												onBlur={bannerValidation.handleBlur}
												checked={bannerValidation.values.redirectNewTap}
											/>
											<Label className="form-check-label" for="redirectNewTap">
												Redirect: <span className="fw-bolder">{bannerValidation.values.redirectNewTap ? "New Tab" : "Static"}</span>
											</Label>
										</div>
									</CardBody>
								</Card>
								<Card>
									<CardHeader>
										<div className="fw-bold">Published</div>
									</CardHeader>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="banner-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="banner-ordering-input"
												placeholder="Enter banner ordering"
												name="ordering"
												onChange={bannerValidation.handleChange}
												onBlur={bannerValidation.handleBlur}
												value={bannerValidation.values.ordering}
											/>
										</div>
										<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isActive"
												name="isActive"
												onChange={bannerValidation.handleChange}
												onBlur={bannerValidation.handleBlur}
												checked={bannerValidation.values.isActive}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{bannerValidation.values.isActive ? "Active" : "In-Active"}</span>
											</Label>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useBannerSelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Banner
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/banner-menu">
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

export default withRouter(BannerForm);
