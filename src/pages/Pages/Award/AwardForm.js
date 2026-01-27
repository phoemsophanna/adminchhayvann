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
import { createAward, fetchAwardDetail, resetAwardShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AwardForm = (props) => {
	const { id } = useParams();
	document.title = `Awards & Honors: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);

	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};


	const createAwardSelector = createSelector(
		(state) => state.CreateAwardReducer,
		(layout) => layout
	);
	const useAwardSelect = useSelector(createAwardSelector);
	const createAwardDetailSelector = createSelector(
		(state) => state.AwardDetailReducer,
		(layout) => ({
			award: layout.award,
			isLoading: layout.isLoading,
		})
	);
	const { award, isLoading } = useSelector(createAwardDetailSelector);

	useEffect(() => {
		if (id) dispatch(fetchAwardDetail(id));

		return () => {
			dispatch(resetAwardShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (award) {
			if (award.image) {
				setFile([
					{
						source: award.image,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}
		}
	}, [award]);

	const awardValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			title: award ? award.title : "",
			titleKm: award ? award.titleKm : "",
			summary: award ? award.summary : "",
			summaryKm: award ? award.summaryKm : "",
			ordering: award ? award.ordering : 0,
			isActive: award ? (award.isActive === 1 ? true : false) : true,
			image: award ? award.image : "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Please Enter Title"),
		}),
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createAward(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Awards & Honors Menu" pageTitle="Dashboard" pageLink="/award-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Awards & Honors</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/award-menu">
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
							awardValidation.handleSubmit();
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
													<Label className="form-label" htmlFor="award-title-input">
														Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="award-title-input"
														placeholder="Enter award title"
														name="title"
														onChange={awardValidation.handleChange}
														onBlur={awardValidation.handleBlur}
														value={awardValidation.values.title}
														invalid={awardValidation.touched.title && awardValidation.errors.title ? true : false}
													/>
													{awardValidation.touched.title && awardValidation.errors.title ? (
														<FormFeedback type="invalid">{awardValidation.errors.title}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="summary-input">
														Summary
													</Label>
													<textarea
														className="form-control"
														id="summary-input"
														rows="3"
														placeholder="Enter text"
														name="summary"
														onChange={awardValidation.handleChange}
														onBlur={awardValidation.handleBlur}
														value={awardValidation.values.summary}
													></textarea>
												</div>
											</TabPane>
											<TabPane tabId={"KHM"} id="khm">
												<div className="mb-3">
													<Label className="form-label" htmlFor="award-title-km-input">
														Title Khmer
													</Label>
													<Input
														type="text"
														className="form-control"
														id="award-title-km-input"
														placeholder="Enter award title"
														name="title"
														onChange={awardValidation.handleChange}
														onBlur={awardValidation.handleBlur}
														value={awardValidation.values.titleKm}
														invalid={awardValidation.touched.titleKm && awardValidation.errors.titleKm ? true : false}
													/>
													{awardValidation.touched.titleKm && awardValidation.errors.titleKm ? (
														<FormFeedback type="invalid">{awardValidation.errors.titleKm}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="summary-km-input">
														Summary Khmer
													</Label>
													<textarea
														className="form-control"
														id="summary-km-input"
														rows="3"
														placeholder="Enter text"
														name="summaryKm"
														onChange={awardValidation.handleChange}
														onBlur={awardValidation.handleBlur}
														value={awardValidation.values.summaryKm}
													></textarea>
												</div>
											</TabPane>
										</TabContent>
										
										<div className="mb-3">
											<Label className="form-label" htmlFor="thumbnail-input">
												Thumbnail <small className="text-danger">(150x150 pixel)</small>
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
														server={`${api.BASE_URL}/save-image/award`}
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
												name="isActive"
												onChange={awardValidation.handleChange}
												onBlur={awardValidation.handleBlur}
												checked={awardValidation.values.isActive}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{awardValidation.values.isActive ? "Active" : "In-Active"}</span>
											</Label>
										</div>
										{/* <div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isDisplayHomepage"
												name="isDisplayHomepage"
												onChange={awardValidation.handleChange}
												onBlur={awardValidation.handleBlur}
												checked={awardValidation.values.isDisplayHomepage}
											/>
											<Label className="form-check-label" for="isDisplayHomepage">
												Display Homepage: <span className="fw-bolder">{awardValidation.values.isDisplayHomepage ? "Show" : "Hide"}</span>
											</Label>
										</div> */}
									</CardBody>
								</Card>
								<Card>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="award-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="award-ordering-input"
												placeholder="Enter award ordering"
												name="ordering"
												onChange={awardValidation.handleChange}
												onBlur={awardValidation.handleBlur}
												value={awardValidation.values.ordering}
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
												onChange={awardValidation.handleChange}
												onBlur={awardValidation.handleBlur}
												value={awardValidation.values.metaKeyword || ""}
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
												onChange={awardValidation.handleChange}
												onBlur={awardValidation.handleBlur}
												value={awardValidation.values.metaDesc || ""}
											/>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useAwardSelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Award
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/award-menu">
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

export default withRouter(AwardForm);
