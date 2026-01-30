import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from "reactstrap";
import { api } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { getSiteSetting, resetSiteSettingFlag, saveSiteSetting } from "../../../store/actions";
import { createSelector } from "reselect";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import withRouter from "../../../Components/Common/withRouter";
import TinymceEditor from "../../../Components/Common/TinymceEditor";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const PrivacyPolicy = () => {
	document.title = "Privacy Policy | Admin & Dashboard";

	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [contentDesc, setContentDesc] = useState("");
	const [contentDescKm, setContentDescKm] = useState("");
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (lang) => {
		settitleTap(lang);
	}

	const siteSettingSelector = createSelector(
		(state) => state.SiteSettingReducer,
		(layout) => ({
			siteSetting: layout.siteSetting,
			message: layout.message,
			isLoading: layout.isLoading,
			success: layout.success,
			error: layout.error,
		})
	);
	const { siteSetting, message, isLoading, success, error } = useSelector(siteSettingSelector);

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	};

	const handleEditorChangeKm = (e) => {
		setContentDescKm(e.target.getContent());
	};

	useEffect(() => {
		setFile([]);
		dispatch(getSiteSetting("PRIVACY_POLICY"));
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);
	const refreshForm = () => {
		setFile([]);
		dispatch(getSiteSetting("PRIVACY_POLICY"));
	};

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "PRIVACY_POLICY",
			description: siteSetting ? siteSetting.description : "",
			descriptionKm: siteSetting ? siteSetting.descriptionKm : "",
			thumbnail: siteSetting ? siteSetting.thumbnail : "",
		},
		onSubmit: (values) => {
			values.thumbnail = file?.length > 0 ? file[0]?.serverId : siteSetting.thumbnail;
			values.description = contentDesc;
			values.descriptionKm = contentDescKm;
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				refreshForm();
			}
		},
	});

	useEffect(() => {
		if (siteSetting) {
			setContentDesc(siteSetting.description);
			setContentDescKm(siteSetting?.descriptionKm);
			if (siteSetting.thumbnail) {
				setFile([
					{
						source: siteSetting.thumbnail,
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
			setContentDescKm("");
		}
	}, [siteSetting]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Privacy Policy" pageTitle="Dashboard" pageLink="/" />
					<Row>
						<Col xl={12}>
							<Form
								onSubmit={(e) => {
									e.preventDefault();
									settingForm.handleSubmit();
									return false;
								}}
								action="#"
							>
								{/* <h5 className="fs-14 mb-3">General</h5> */}
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
										{isLoading ? (
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										) : (
											<Row>
												<Col xl={12}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="thumbnail-input">
															Banner <small className="text-danger">(1920x400 pixel)</small>
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
																	server={`${api.BASE_URL}/save-image/site-setting`}
																	className="filepond filepond-input-multiple"
																/>
															</div>
														</div>
													</div>
												</Col>
												<Col xl={12}>
													<TabContent activeTab={titleTap} >
														<TabPane tabId={`ENG`} id="eng">
															<div className="mb-3">
																<Label className="form-label" htmlFor="description-input">
																	Description
																</Label>
																<TinymceEditor onUploadImage={handleEditorChange} initDataValue={contentDesc} />
															</div>
														</TabPane>
														<TabPane tabId={`KHM`} id="khm">
															<div className="mb-3">
																<Label className="form-label" htmlFor="description-input">
																	Description Khmer
																</Label>
																<TinymceEditor onUploadImage={handleEditorChangeKm} initDataValue={contentDescKm} />
															</div>
														</TabPane>
													</TabContent>
												</Col>
											</Row>
										)}
									</CardBody>
								</Card>
								<div className="text-start mb-4">
									{isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save
										</Button>
									)}{" "}
									<Button color="dark" className="btn" outline onClick={() => refreshForm()}>
										<i className="ri-refresh-line me-1 align-bottom"></i> Refresh
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default withRouter(PrivacyPolicy);
