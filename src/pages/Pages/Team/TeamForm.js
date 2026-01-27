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
import { createTeam, fetchTeamDetail, resetTeamShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const TeamForm = (props) => {
	const { id } = useParams();
	document.title = `Team: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);

	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};


	const createTeamSelector = createSelector(
		(state) => state.CreateTeamReducer,
		(layout) => layout
	);
	const useTeamSelect = useSelector(createTeamSelector);
	const createTeamDetailSelector = createSelector(
		(state) => state.TeamDetailReducer,
		(layout) => ({
			team: layout.team,
			isLoading: layout.isLoading,
		})
	);
	const { team, isLoading } = useSelector(createTeamDetailSelector);

	useEffect(() => {
		if (id) dispatch(fetchTeamDetail(id));

		return () => {
			dispatch(resetTeamShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (team) {
			if (team.image) {
				setFile([
					{
						source: team.image,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}
		}
	}, [team]);

	const teamValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			name: team ? team.name : "",
			nameKm: team ? team.nameKm : "",
			position: team ? team.position : "",
			positionKm: team ? team.positionKm : "",
			experience: team ? team.experience : "",
			experienceKm: team ? team.experienceKm : "",
			facebook: team ? team.facebook : "",
			telegram: team ? team.telegram : "",
			linkedin: team ? team.linkedin : "",
			email: team ? team.email : "",
			ordering: team ? team.ordering : 0,
			isActive: team ? (team.isActive === 1 ? true : false) : true,
			image: team ? team.image : "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please Enter Name"),
		}),
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createTeam(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Team" pageTitle="Dashboard" pageLink="/team-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Team</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/team-menu">
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
							teamValidation.handleSubmit();
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
													<Label className="form-label" htmlFor="team-title-input">
														Name <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="team-name-input"
														placeholder="Enter name"
														name="name"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.name}
														invalid={teamValidation.touched.name && teamValidation.errors.name ? true : false}
													/>
													{teamValidation.touched.name && teamValidation.errors.name ? (
														<FormFeedback type="invalid">{teamValidation.errors.name}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="team-position-input">
														Position
													</Label>
													<Input
														type="text"
														className="form-control"
														id="team-position-input"
														placeholder="Enter position"
														name="position"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.position}
														invalid={teamValidation.touched.position && teamValidation.errors.position ? true : false}
													/>
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="experience-input">
														Experience
													</Label>
													<textarea
														className="form-control"
														id="experience-input"
														rows="3"
														placeholder="Enter experience"
														name="experience"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.experience}
													></textarea>
												</div>
											</TabPane>
											<TabPane tabId={"KHM"} id="khm">
												<div className="mb-3">
													<Label className="form-label" htmlFor="team-title-km-input">
														Name Khmer
													</Label>
													<Input
														type="text"
														className="form-control"
														id="team-name-km-input"
														placeholder="Enter name"
														name="nameKm"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.nameKm}
														invalid={teamValidation.touched.nameKm && teamValidation.errors.nameKm ? true : false}
													/>
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="team-position-km-input">
														Position Khmer
													</Label>
													<Input
														type="text"
														className="form-control"
														id="team-position-km-input"
														placeholder="Enter position"
														name="positionKm"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.positionKm}
														invalid={teamValidation.touched.positionKm && teamValidation.errors.positionKm ? true : false}
													/>
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="experience-km-input">
														Experience Khmer
													</Label>
													<textarea
														className="form-control"
														id="experience-km-input"
														rows="3"
														placeholder="Enter experience"
														name="experienceKm"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.experienceKm}
													></textarea>
												</div>
											</TabPane>
										</TabContent>
										<div className="mb-3">
											<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
												<Input
													type="checkbox"
													className="form-check-input"
													id="isActive"
													name="isActive"
													onChange={teamValidation.handleChange}
													onBlur={teamValidation.handleBlur}
													checked={teamValidation.values.isActive}
												/>
												<Label className="form-check-label" for="isActive">
													Status: <span className="fw-bolder">{teamValidation.values.isActive ? "Active" : "In-Active"}</span>
												</Label>
											</div>
										</div>
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
														server={`${api.BASE_URL}/save-image/team`}
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
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="team-facebook-input">
												Facebook
											</Label>
											<Input
												type="text"
												className="form-control"
												id="team-facebook-input"
												placeholder="Enter link"
												name="facebook"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.facebook}
											/>
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="team-telegram-input">
												Telegram
											</Label>
											<Input
												type="text"
												className="form-control"
												id="team-telegram-input"
												placeholder="Enter link"
												name="telegram"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.telegram}
											/>
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="team-linkedin-input">
												Linkedin
											</Label>
											<Input
												type="text"
												className="form-control"
												id="team-linkedin-input"
												placeholder="Enter link"
												name="linkedin"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.linkedin}
											/>
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="team-email-input">
												Email
											</Label>
											<Input
												type="text"
												className="form-control"
												id="team-email-input"
												placeholder="Enter link"
												name="email"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.email}
											/>
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="team-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="team-ordering-input"
												placeholder="Enter team ordering"
												name="ordering"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.ordering}
											/>
										</div>
									</CardBody>
								</Card>
								
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useTeamSelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Team
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/team-menu">
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

export default withRouter(TeamForm);
