import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
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
import { createNews, fetchNewsDetail, resetNewsShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
import axios from "axios";
import userProfile from "../../Authentication/user-profile";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const NewsForm = (props) => {
	const { id } = useParams();
	document.title = `News: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const { token } = userProfile();
	const [file, setFile] = useState([]);
	const [contentDesc, setContentDesc] = useState("");
	const [contentDescKm, setContentDescKm] = useState("");

	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};

	const [active, setActive] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

	const createNewsSelector = createSelector(
		(state) => state.CreateNewsReducer,
		(layout) => layout
	);
	const useNewsSelect = useSelector(createNewsSelector);
	const createNewsDetailSelector = createSelector(
		(state) => state.NewsDetailReducer,
		(layout) => ({
			news: layout.news,
			isLoading: layout.isLoading,
		})
	);
	const { news, isLoading } = useSelector(createNewsDetailSelector);

	const [selectItem, setSelectItem] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);

	const handleSearch = (stringValue) => {
		console.log(stringValue);
		axios.get(`${api.BASE_URL}/categories/dropdown?type=NEWS&search=${stringValue}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		}).then((res) => {
			if(res.data.length > 0){
				var selectItems = [];
				res.data.map((q) => {
					selectItems.push({label: q.title, value: q.id});
				});
				setSelectItem(selectItems);
			}
		});
	}

	const handleSelect = (selected) => {
		setSelectedItem(selected);
	}

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	};

	const handleEditorChangeKm = (e) => {
		setContentDescKm(e.target.getContent());
	};

	useEffect(() => {
		if (id) dispatch(fetchNewsDetail(id));

		return () => {
			dispatch(resetNewsShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (news) {
			setContentDesc(news.content);
			setContentDescKm(news.contentKm);
			setSelectedItem({label: news?.category?.title, value: news?.category?.id});
			if (news.image) {
				setFile([
					{
						source: news.image,
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
			setSelectedItem({label: "", value: ""});
		}
	}, [news]);

	const newsValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			title: news ? news.title : "",
			titleKm: news ? news.titleKm : "",
			summary: news ? news.summary : "",
			summaryKm: news ? news.summaryKm : "",
			content: news ? news.content : "",
			contentKm: news ? news.contentKm : "",
			date: news ? news.date : "",
			category_id: news ? news.category_id : "",
			metaKeyword: news ? news.metaKeyword : "",
			metaDesc: news ? news.metaDesc : "",
			ordering: news ? news.ordering : 0,
			isActive: news ? (news.isActive === 1 ? true : false) : true,
			isDisplayHomepage: news ? (news.isDisplayHomepage === 1 ? true : false) : false,
			image: news ? news.image : "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Please Enter Title"),
		}),
		onSubmit: (values) => {
			values.content = contentDesc;
			values.contentKm = contentDescKm;
			values.category_id = selectedItem ? selectedItem?.value : "";
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createNews(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="News Menu" pageTitle="Dashboard" pageLink="/news-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} News</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/news-menu">
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
							newsValidation.handleSubmit();
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
													<Label className="form-label" htmlFor="news-title-input">
														News Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="news-title-input"
														placeholder="Enter news title"
														name="title"
														onChange={newsValidation.handleChange}
														onBlur={newsValidation.handleBlur}
														value={newsValidation.values.title}
														invalid={newsValidation.touched.title && newsValidation.errors.title ? true : false}
													/>
													{newsValidation.touched.title && newsValidation.errors.title ? (
														<FormFeedback type="invalid">{newsValidation.errors.title}</FormFeedback>
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
														placeholder="Enter summary"
														name="summary"
														onChange={newsValidation.handleChange}
														onBlur={newsValidation.handleBlur}
														value={newsValidation.values.summary}
													></textarea>
												</div>
												<div className="mb-3">
													<Label>Content</Label>
													<TinymceEditor onUploadImage={handleEditorChange} initDataValue={contentDesc} />
												</div>
											</TabPane>
											<TabPane tabId={"KHM"} id="khm">
												<div className="mb-3">
													<Label className="form-label" htmlFor="news-title-input">
														News Title Khmer
													</Label>
													<Input
														type="text"
														className="form-control"
														id="news-title-km-input"
														placeholder="Enter news title khmer"
														name="titleKm"
														onChange={newsValidation.handleChange}
														onBlur={newsValidation.handleBlur}
														value={newsValidation.values.titleKm}
														invalid={newsValidation.touched.titleKm && newsValidation.errors.titleKm ? true : false}
													/>
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="summary-km-input">
														Summary Khmer
													</Label>
													<textarea
														className="form-control"
														id="summary-km-input"
														rows="3"
														placeholder="Enter summary khmer"
														name="summaryKm"
														onChange={newsValidation.handleChange}
														onBlur={newsValidation.handleBlur}
														value={newsValidation.values.summaryKm}
													></textarea>
												</div>
												<div className="mb-3">
													<Label>Content Khmer</Label>
													<TinymceEditor onUploadImage={handleEditorChangeKm} initDataValue={contentDescKm} />
												</div>
											</TabPane>
										</TabContent>

										<div className="mb-3">
											<Label className="form-label" htmlFor="news-title-input">
												Date
											</Label>
											<Input
												type="date"
												className="form-control"
												id="news-title-km-input"
												placeholder="Enter news title"
												name="date"
												onChange={newsValidation.handleChange}
												onBlur={newsValidation.handleBlur}
												value={newsValidation.values.date}
												invalid={newsValidation.touched.date && newsValidation.errors.date ? true : false}
											/>
										</div>
										
										<div className="mb-3">
											<Label className="form-label" htmlFor="thumbnail-input">
												Thumbnail <small className="text-danger">(750x500 pixel)</small>
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
														server={`${api.BASE_URL}/save-image/news`}
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
												onChange={newsValidation.handleChange}
												onBlur={newsValidation.handleBlur}
												checked={newsValidation.values.isActive}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{newsValidation.values.isActive ? "Active" : "In-Active"}</span>
											</Label>
										</div>
										<div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isDisplayHomepage"
												name="isDisplayHomepage"
												onChange={newsValidation.handleChange}
												onBlur={newsValidation.handleBlur}
												checked={newsValidation.values.isDisplayHomepage}
											/>
											<Label className="form-check-label" for="isDisplayHomepage">
												Display Homepage: <span className="fw-bolder">{newsValidation.values.isDisplayHomepage ? "Show" : "Hide"}</span>
											</Label>
										</div>
									</CardBody>
								</Card>
								<Card>
									<CardBody>
										<div className="mb-3 header-currency" style={{position: "relative"}}>
											<Label className="form-label" htmlFor="news-category-input">
												Category
											</Label>
											<Select
												onChange={handleSelect}
												onInputChange={handleSearch}
												options={selectItem}
												defaultValue={selectedItem}
												value={selectedItem}
											/>
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="news-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="news-ordering-input"
												placeholder="Enter news ordering"
												name="ordering"
												onChange={newsValidation.handleChange}
												onBlur={newsValidation.handleBlur}
												value={newsValidation.values.ordering}
											/>
										</div>
										<div className="mb-2">
											<Label htmlFor="metaKeyword" className="form-label">
												Meta Keyword
											</Label>
											<Input
												id="metaKeyword"
												name="metaKeyword"
												type="textarea"
												className="form-control"
												placeholder="Enter text"
												onChange={newsValidation.handleChange}
												onBlur={newsValidation.handleBlur}
												value={newsValidation.values.metaKeyword || ""}
											/>
										</div>
										<div className="mb-2">
											<Label htmlFor="metaDesc" className="form-label">
												Meta Description
											</Label>
											<Input
												id="metaDesc"
												name="metaDesc"
												type="textarea"
												className="form-control"
												placeholder="Enter text"
												onChange={newsValidation.handleChange}
												onBlur={newsValidation.handleBlur}
												value={newsValidation.values.metaDesc || ""}
											/>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useNewsSelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save News
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/news-menu">
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

export default withRouter(NewsForm);
