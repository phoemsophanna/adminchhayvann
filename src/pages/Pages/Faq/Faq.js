import React from "react";
import { Button, Card, CardHeader, Col, Container, Form, Input, Label, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableList from "./TableList";
import { useState } from "react";
import withRouter from "../../../Components/Common/withRouter";
import Select from "react-select";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createFaq, deleteFaq, fetchFaqDetail, refreshFaqList, resetCreateFaqFlag, resetFaqShowDetail } from "../../../store/actions";

import { createSelector } from "reselect";
import { useEffect } from "react";
import DeleteModal from "../../../Components/Common/DeleteModal";
import axios from "axios";
import userProfile from "../../Authentication/user-profile";
import { api } from "../../../config";
import { useCan } from "../../../Components/Common/Permission";

const Faq = () => {
	document.title = "Faq | Admin & Dashboards";
	const dispatch = useDispatch();
	const { token } = userProfile();
	const [UID, setUID] = useState(null);
	const [selectItem, setSelectItem] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};

	const createFaqSelector = createSelector(
		(state) => state.CreateFaqReducer,
		(layout) => layout
	);
	const createFaqDetailSelector = createSelector(
		(state) => state.FaqDetailReducer,
		(layout) => layout
	);

	const useCreateFaqSelect = useSelector(createFaqSelector);
	const faqDetail = useSelector(createFaqDetailSelector);

	const faqValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: faqDetail.faq?.id || "",
			question: faqDetail.faq?.question || "",
			questionKm: faqDetail.faq?.questionKm || "",
			answer: faqDetail.faq?.answer || "",
			answerKm: faqDetail.faq?.answerKm || "",
			mainId: faqDetail.faq?.mainId || "",
			ordering: faqDetail.faq?.ordering || 0,
			isActive: faqDetail.faq ? (faqDetail.faq.isActive ? true : false) : true,
		},
		onSubmit: (values) => {
			values.mainId = selectedItem ? selectedItem.value : "";
			dispatch(createFaq(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		faqValidation.resetForm();
		dispatch(resetFaqShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshFaqList());
	};

	const handleShowFaqDetail = (faqId) => {
		setmodal_backdrop(true);
		dispatch(fetchFaqDetail(faqId));
	};

	const handleDeleteFaq = () => {
		if (UID) {
			dispatch(deleteFaq(UID));
		}
	};

	const handleSearch = (stringValue) => {
		console.log(stringValue);
		axios.get(`${api.BASE_URL}/categories/dropdown?type=FAQ&search=${stringValue}`, {
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

	useEffect(() => {
		if (useCreateFaqSelect.success && !useCreateFaqSelect.isLoading) {
			dispatch(resetCreateFaqFlag());
			setmodal_backdrop(false);
			faqValidation.resetForm();
			dispatch(resetFaqShowDetail());
			setDeleteModal(false);
			dispatch(refreshFaqList());
		}
	}, [dispatch, faqValidation, setDeleteModal, useCreateFaqSelect, faqDetail]);

	useEffect(() => {
		if(faqDetail.faq?.mainFaq) {
			setSelectedItem({label: faqDetail.faq?.mainFaq?.title ,value: faqDetail.faq?.mainFaq?.id});
		}
	}, [faqDetail.faq]);

	console.log(selectedItem);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Faq Management" pageTitle="Dashboard" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										{
											useCan("faq.create") ? (
												<Col lg={3}>
													<Button
														color="primary"
														className="btn add-btn"
														data-bs-toggle="modal"
														data-bs-target="#showModal"
														onClick={() => setmodal_backdrop(true)}
													>
														<i className="ri-add-fill me-1 align-bottom"></i> Create New
													</Button>
												</Col>
											) : ""
										}
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Button color="dark" className="btn" outline onClick={handleRefresh}>
													<i className="ri-refresh-line me-1 align-bottom"></i> Refresh
												</Button>
											</div>
										</Col>
									</Row>
								</CardHeader>
							</Card>
						</Col>
					</Row>

					<Row>
						<Col lg={12}>
							<TableList
								onShowDetail={handleShowFaqDetail}
								onDeleteFaq={(id) => {
									setDeleteModal(true);
									setUID(id);
								}}
							/>
						</Col>
					</Row>
				</Container>
			</div>
			<DeleteModal
				show={deleteModal}
				onDeleteClick={handleDeleteFaq}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreateFaqSelect.isLoading}
			/>
			<Modal
				isOpen={modal_backdrop}
				toggle={() => {
					closeModal();
				}}
				backdrop={"static"}
				id="staticBackdrop"
				centered
			>
				<ModalHeader className="bg-light p-3 text-light" toggle={closeModal}>
					<div className="align-items-center d-flex" style={{gap: 15}}>
					{faqDetail.faq ? "Update Faq" : "Create Faq"}
					<div className="flex-shrink-0">
						<Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
							<NavItem>
								<NavLink
									style={{ cursor: "pointer", padding: "0.5rem", lineHeight: 1 }}
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
									style={{ cursor: "pointer", padding: "0.5rem", lineHeight: 1 }}
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
				</ModalHeader>

				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							faqValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<TabContent activeTab={titleTap}>
							<TabPane tabId={"ENG"} id="eng">
								<div className="mb-2">
									<Label htmlFor="question" className="form-label">
										Question
									</Label>
									<textarea
										className="form-control"
										id="question-input"
										rows="2"
										placeholder="Enter question"
										name="question"
										onChange={faqValidation.handleChange}
										onBlur={faqValidation.handleBlur}
										value={faqValidation.values.question}
									></textarea>
								</div>
								<div className="mb-2">
									<Label htmlFor="answer" className="form-label">
										Answer
									</Label>
									<textarea
										className="form-control"
										id="answer-input"
										rows="5"
										placeholder="Enter answer"
										name="answer"
										onChange={faqValidation.handleChange}
										onBlur={faqValidation.handleBlur}
										value={faqValidation.values.answer}
									></textarea>
								</div>
							</TabPane>
							<TabPane tabId={"KHM"} id="khm">
								<div className="mb-2">
									<Label htmlFor="questionKm" className="form-label">
										Question Khmer
									</Label>
									<textarea
										className="form-control"
										id="question-km-input"
										rows="2"
										placeholder="Enter question khmer"
										name="questionKm"
										onChange={faqValidation.handleChange}
										onBlur={faqValidation.handleBlur}
										value={faqValidation.values.questionKm}
									></textarea>
								</div>
								<div className="mb-2">
									<Label htmlFor="answerKm" className="form-label">
										Answer Khmer
									</Label>
									<textarea
										className="form-control"
										id="answer-km-input"
										rows="5"
										placeholder="Enter answer khmer"
										name="answerKm"
										onChange={faqValidation.handleChange}
										onBlur={faqValidation.handleBlur}
										value={faqValidation.values.answerKm}
									></textarea>
								</div>
							</TabPane>
						</TabContent>

						<div className="mb-2">
							<Label htmlFor="category" className="form-label">
								Main FAQ's
							</Label>
							<Select
								onChange={handleSelect}
								onInputChange={handleSearch}
								options={selectItem}
								defaultValue={selectedItem}
								value={selectedItem}
							/>
						</div>

						<div className="mb-2">
							<Label htmlFor="ordering" className="form-label">
								Ordering
							</Label>
							<Input
								id="ordering"
								name="ordering"
								type="number"
								className="form-control"
								placeholder="Enter ordering"
								onChange={faqValidation.handleChange}
								onBlur={faqValidation.handleBlur}
								value={faqValidation.values.ordering || ""}
							/>
						</div>

						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="isActive"
								onChange={faqValidation.handleChange}
								onBlur={faqValidation.handleBlur}
								checked={faqValidation.values.isActive}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{faqValidation.values.isActive ? "Active" : "In-Active"}</span>
							</Label>
						</div>
						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreateFaqSelect.isLoading ? (
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
							)}
						</div>
					</Form>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default withRouter(Faq);
