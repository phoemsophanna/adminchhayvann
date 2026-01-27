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
import { createHistory, fetchHistoryDetail, resetHistoryShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const HistoryForm = (props) => {
	const { id } = useParams();
	document.title = `History: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);

	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};


	const createHistorySelector = createSelector(
		(state) => state.CreateHistoryReducer,
		(layout) => layout
	);
	const useHistorySelect = useSelector(createHistorySelector);
	const createHistoryDetailSelector = createSelector(
		(state) => state.HistoryDetailReducer,
		(layout) => ({
			history: layout.history,
			isLoading: layout.isLoading,
		})
	);
	const { history, isLoading } = useSelector(createHistoryDetailSelector);

	useEffect(() => {
		if (id) dispatch(fetchHistoryDetail(id));

		return () => {
			dispatch(resetHistoryShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (history) {
			if (history.image) {
				setFile([
					{
						source: history.image,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}
		}
	}, [history]);

	const historyValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			title: history ? history.title : "",
			titleKm: history ? history.titleKm : "",
			summary: history ? history.summary : "",
			summaryKm: history ? history.summaryKm : "",
			year: history ? history.year : "",
			ordering: history ? history.ordering : 0,
			isActive: history ? (history.isActive === 1 ? true : false) : true,
			image: history ? history.image : "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Please Enter Title"),
			year: Yup.string().required("Please Enter Year"),
		}),
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createHistory(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="History" pageTitle="Dashboard" pageLink="/history-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} History</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/history-menu">
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
							historyValidation.handleSubmit();
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
													<Label className="form-label" htmlFor="history-title-input">
														Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="history-title-input"
														placeholder="Enter history title"
														name="title"
														onChange={historyValidation.handleChange}
														onBlur={historyValidation.handleBlur}
														value={historyValidation.values.title}
														invalid={historyValidation.touched.title && historyValidation.errors.title ? true : false}
													/>
													{historyValidation.touched.title && historyValidation.errors.title ? (
														<FormFeedback type="invalid">{historyValidation.errors.title}</FormFeedback>
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
														onChange={historyValidation.handleChange}
														onBlur={historyValidation.handleBlur}
														value={historyValidation.values.summary}
													></textarea>
												</div>
											</TabPane>
											<TabPane tabId={"KHM"} id="khm">
												<div className="mb-3">
													<Label className="form-label" htmlFor="history-title-km-input">
														Title Khmer
													</Label>
													<Input
														type="text"
														className="form-control"
														id="history-title-km-input"
														placeholder="Enter history title"
														name="title"
														onChange={historyValidation.handleChange}
														onBlur={historyValidation.handleBlur}
														value={historyValidation.values.titleKm}
														invalid={historyValidation.touched.titleKm && historyValidation.errors.titleKm ? true : false}
													/>
													{historyValidation.touched.titleKm && historyValidation.errors.titleKm ? (
														<FormFeedback type="invalid">{historyValidation.errors.titleKm}</FormFeedback>
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
														onChange={historyValidation.handleChange}
														onBlur={historyValidation.handleBlur}
														value={historyValidation.values.summaryKm}
													></textarea>
												</div>
											</TabPane>
										</TabContent>
										<div className="mb-3">
											<Label className="form-label" htmlFor="history-year-input">
												Year <small className="text-danger">(Required)</small>
											</Label>
											<Input
												type="text"
												className="form-control"
												id="history-year-input"
												placeholder="Enter year"
												name="year"
												onChange={historyValidation.handleChange}
												onBlur={historyValidation.handleBlur}
												value={historyValidation.values.year}
												invalid={historyValidation.touched.year && historyValidation.errors.year ? true : false}
											/>
											{historyValidation.touched.year && historyValidation.errors.year ? (
												<FormFeedback type="invalid">{historyValidation.errors.year}</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="thumbnail-input">
												Thumbnail <small className="text-danger">(370x295 pixel)</small>
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
														server={`${api.BASE_URL}/save-image/history`}
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
												onChange={historyValidation.handleChange}
												onBlur={historyValidation.handleBlur}
												checked={historyValidation.values.isActive}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{historyValidation.values.isActive ? "Active" : "In-Active"}</span>
											</Label>
										</div>
										{/* <div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isDisplayHomepage"
												name="isDisplayHomepage"
												onChange={historyValidation.handleChange}
												onBlur={historyValidation.handleBlur}
												checked={historyValidation.values.isDisplayHomepage}
											/>
											<Label className="form-check-label" for="isDisplayHomepage">
												Display Homepage: <span className="fw-bolder">{historyValidation.values.isDisplayHomepage ? "Show" : "Hide"}</span>
											</Label>
										</div> */}
									</CardBody>
								</Card>
								<Card>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="history-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="history-ordering-input"
												placeholder="Enter history ordering"
												name="ordering"
												onChange={historyValidation.handleChange}
												onBlur={historyValidation.handleBlur}
												value={historyValidation.values.ordering}
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
												onChange={historyValidation.handleChange}
												onBlur={historyValidation.handleBlur}
												value={historyValidation.values.metaKeyword || ""}
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
												onChange={historyValidation.handleChange}
												onBlur={historyValidation.handleBlur}
												value={historyValidation.values.metaDesc || ""}
											/>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useHistorySelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save History
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/history-menu">
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

export default withRouter(HistoryForm);
