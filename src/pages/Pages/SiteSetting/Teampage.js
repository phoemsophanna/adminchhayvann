import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Nav, NavItem, NavLink, Col, Container, Form, Input, Label, Row, Spinner, TabContent, TabPane } from "reactstrap";
import { api } from "../../../config";
import TinymceEditor from "../../../Components/Common/TinymceEditor";

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
import LayoutNav from "./LayoutNav";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Teampage = () => {
	document.title = "Site Setting | Admin & Dashboard";

	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [fileTwo, setFileTwo] = useState([]);

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

	useEffect(() => {
		setFile([]);
		dispatch(getSiteSetting("TEAMPAGE"));
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "TEAMPAGE",
			background: siteSetting ? siteSetting?.background : "",
			backgroundCover: siteSetting ? siteSetting?.backgroundCover : "",
		},
		onSubmit: (values) => {
			values.background = file?.length > 0 ? (file[0]?.serverId ? file[0]?.serverId : file[0]?.source) : "";
			values.backgroundCover = fileTwo?.length > 0 ? (fileTwo[0]?.serverId ? fileTwo[0]?.serverId : fileTwo[0]?.source) : "";
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				refreshForm();
			}
		},
	});

	const refreshForm = () => {
		dispatch(getSiteSetting("TEAMPAGE"));
	};

	useEffect(() => {
		if (siteSetting) {
			if (siteSetting.background) {
				setFile([
					{
						source: siteSetting.background,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}

			if (siteSetting.backgroundCover) {
				setFileTwo([
					{
						source: siteSetting.backgroundCover,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFileTwo([]);
			}
		}
	}, [siteSetting]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Site Setting" pageTitle="Dashboard" pageLink="/" />
					<Row>
						<Col xs={12}>
							<Card>
								<CardBody>
									<LayoutNav />
								</CardBody>
							</Card>
						</Col>
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
												<Col xl={8}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="thumbnail-input">
															Background Banner <span className="text-danger">(1920 x 768 pixel)</span>
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
												<Col xl={4}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="thumbnail-input">
															Background Cover <span className="text-danger">(800 x 800 pixel)</span>
														</Label>
														<div className="position-relative d-block mx-auto">
															<div style={{ width: "100%" }}>
																<FilePond
																	labelIdle='<span class="filepond--label-action">Choose Image</span>'
																	files={fileTwo}
																	onupdatefiles={setFileTwo}
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

export default withRouter(Teampage);
