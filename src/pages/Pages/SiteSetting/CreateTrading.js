import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Nav, NavItem, NavLink, Col, Container, Form, Input, Label, Row, Spinner, TabContent, TabPane,  Modal, ModalBody, ModalHeader, } from "reactstrap";
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
import { createTrading, fetchTradingDetail, fetchTradingList, getSiteSetting, resetSiteSettingFlag, resetTradingShowDetail, saveSiteSetting } from "../../../store/actions";
import { createSelector } from "reselect";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CreateTrading = ({show, setShow, id, useCreateTrading, setEdit_id}) => {
    const dispatch = useDispatch();
    const [titleTap, settitleTap] = useState("ENG");
    const titleTapToggle = (lang) => {
        settitleTap(lang);
    }

    const tradingDetailSelector = createSelector(
        (state) => state.TradingDetailReducer,
        (layout) => ({
            trading: layout.trading,
            message: layout.message,
            isLoading: layout.isLoading,
            success: layout.success,
            error: layout.error,
        })
    );
    const { trading, message, isLoading, success, error } = useSelector(tradingDetailSelector);

    useEffect(() => {
        if(useCreateTrading.success && !useCreateTrading.isLoading){
            closeModal();
        }
    },[dispatch,useCreateTrading.success,useCreateTrading.isLoading]);

    const tradingForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: id ? id : "",
            step: trading ? trading.step : "",
            stepKm: trading ? trading.stepKm : "",
            title: trading ? trading.title : "",
            titleKm: trading ? trading.titleKm : "",
            summary: trading ? trading.summary : "",
            summaryKm: trading ? trading.summaryKm : "",
            ordering: trading ? trading.ordering : "",
            status: trading ? trading.status ? true : false : true
        },
        onSubmit: (values) => {
            dispatch(createTrading(values));
        },
    });

    function closeModal() {
        setShow(false);
        tradingForm.resetForm();
        dispatch(resetTradingShowDetail());
        setEdit_id(null);
    }

    useEffect(() => {
        if(id){
            dispatch(fetchTradingDetail(id));
        }
    }, [dispatch,id]);

    return (
        <React.Fragment>
            <Modal
				isOpen={show}
				backdrop={"static"}
				id="staticBackdrop"
				centered
			>
				<ModalHeader className="bg-light p-3 text-light" toggle={closeModal}>
					<div className="align-items-center d-flex" style={{gap: 15}}>
						{id ? "Update Trading" : "Create Trading"}
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
							tradingForm.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<TabContent activeTab={titleTap}>
                            <TabPane tabId={"ENG"} id="eng">
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="step-input">
                                        Step 
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="step-input"
                                        placeholder="Enter text"
                                        name="step"
                                        onChange={tradingForm.handleChange}
                                        onBlur={tradingForm.handleBlur}
                                        value={tradingForm.values.step}
                                        invalid={tradingForm.touched.step && tradingForm.errors.step ? true : false}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="title-input">
                                        Title
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="title-input"
                                        placeholder="Enter text"
                                        name="title"
                                        onChange={tradingForm.handleChange}
                                        onBlur={tradingForm.handleBlur}
                                        value={tradingForm.values.title}
                                        invalid={tradingForm.touched.title && tradingForm.errors.title ? true : false}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="summary-input">
                                        Summary
                                    </Label>
                                    <textarea
                                        className="form-control"
                                        id="summary-input"
                                        placeholder="Enter text"
                                        rows={4}
                                        name="summary"
                                        onChange={tradingForm.handleChange}
                                        value={tradingForm.values.summary}
                                    />
                                </div>
                            </TabPane>
                            <TabPane tabId={"KHM"} id="khm">
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="step-km-input">
                                        Step Khmer
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="step-km-input"
                                        placeholder="Enter text"
                                        name="stepKm"
                                        onChange={tradingForm.handleChange}
                                        onBlur={tradingForm.handleBlur}
                                        value={tradingForm.values.stepKm}
                                        invalid={tradingForm.touched.stepKm && tradingForm.errors.stepKm ? true : false}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="title-km-input">
                                        Title Khmer
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="title-km-input"
                                        placeholder="Enter text"
                                        name="titleKm"
                                        onChange={tradingForm.handleChange}
                                        onBlur={tradingForm.handleBlur}
                                        value={tradingForm.values.titleKm}
                                        invalid={tradingForm.touched.titleKm && tradingForm.errors.titleKm ? true : false}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="summary-km-input">
                                        Summary Khmer
                                    </Label>
                                    <textarea
                                        className="form-control"
                                        id="summary-km-input"
                                        placeholder="Enter text"
                                        rows={4}
                                        name="summaryKm"
                                        onChange={tradingForm.handleChange}
                                        value={tradingForm.values.summaryKm}
                                    />
                                </div>
                            </TabPane>
                        </TabContent>
						<div className="mb-2">
							<Label htmlFor="ordering-input" className="form-label">
								Ordering
							</Label>
							<Input
								type="number"
								className="form-control"
								id="ordering-input"
								placeholder="Enter ordering"
								name="ordering"
								onChange={tradingForm.handleChange}
								onBlur={tradingForm.handleBlur}
								value={tradingForm.values.ordering || ""}
							/>
						</div>
						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="isActive"
								onChange={tradingForm.handleChange}
								onBlur={tradingForm.handleBlur}
								checked={tradingForm.values.status}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{tradingForm.values.status ? "Active" : "In-Active"}</span>
							</Label>
						</div>

						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreateTrading.isLoading ? (
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

export default CreateTrading;
