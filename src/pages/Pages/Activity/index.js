import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Loader from "../../../Components/Common/Loader";

import { api } from "../../../config";

const ActivityMenu = () => {
    document.title = "Activity Logs | Admin & Dashboards";

    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedActivity, setSelectedActivity] = useState(null);
    const [detailModal, setDetailModal] = useState(false);

    const [search, setSearch] = useState("");

    // ==========================
    // Fetch Activities
    // ==========================
    const fetchActivities = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(
                `${api.BASE_URL}/activities`
            );

            if (response.status === "success") {
                const result = response.activities.data;

                setActivities(
                    Array.isArray(result)
                        ? result
                        : result?.activities || []
                );
            }
        } catch (error) {
            console.error("Get activity list error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================
    // Activity Detail
    // ==========================
    const handleView = async (id) => {
        try {
			console.log(id);
            const response = await axios.get(
                `${api.BASE_URL}/activities/${id}`
            );

            if (response.status == "success") {
                setSelectedActivity(response.data);
                setDetailModal(true);
            }
        } catch (error) {
            console.error("Get activity detail error:", error);
        }
    };

    // ==========================
    // Close Modal
    // ==========================
    const handleCloseDetail = () => {
        setDetailModal(false);
        setSelectedActivity(null);
    };

    // ==========================
    // Load
    // ==========================
    useEffect(() => {
        fetchActivities();
    }, []);

    // ==========================
    // Date
    // ==========================
    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // ==========================
    // Action Badge
    // ==========================
    const getActionBadge = (action) => {
        const value = action?.toLowerCase();

        const actions = {
            login: {
                className: "bg-success-subtle text-success",
                icon: "ri-login-box-line",
            },

            logout: {
                className: "bg-warning-subtle text-warning",
                icon: "ri-logout-box-line",
            },

            create: {
                className: "bg-primary-subtle text-primary",
                icon: "ri-add-circle-line",
            },

            update: {
                className: "bg-info-subtle text-info",
                icon: "ri-edit-line",
            },

            delete: {
                className: "bg-danger-subtle text-danger",
                icon: "ri-delete-bin-line",
            },

            import: {
                className: "bg-primary-subtle text-primary",
                icon: "ri-download-2-line",
            },
        };

        const item = actions[value] || {
            className: "bg-secondary-subtle text-secondary",
            icon: "ri-history-line",
        };

        return (
            <span
                className={`badge rounded-pill px-3 py-2 ${item.className}`}
            >
                <i className={`${item.icon} me-1`}></i>

                {action?.toUpperCase() || "UNKNOWN"}
            </span>
        );
    };

    // ==========================
    // Filter
    // ==========================
    const filteredActivities = activities.filter((item) => {
        const keyword = search.toLowerCase();

        return (
            item?.user?.name?.toLowerCase().includes(keyword) ||
            item?.user?.email?.toLowerCase().includes(keyword) ||
            item?.action?.toLowerCase().includes(keyword) ||
            item?.module?.toLowerCase().includes(keyword) ||
            item?.description?.toLowerCase().includes(keyword) ||
            item?.ip_address?.toLowerCase().includes(keyword)
        );
    });

    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>

                    <BreadCrumb
                        title="Activity Logs"
                        pageTitle="Home"
                    />

                    {/* ==========================
                        Header
                    ========================== */}
                    <Card className="border-0 shadow-sm">

                        <CardHeader className="bg-white border-0 py-3">

                            <Row className="align-items-center">

                                <Col>
                                    <div className="d-flex align-items-center">

                                        <div
                                            className="avatar-md me-3"
                                            style={{
                                                minWidth: "48px",
                                            }}
                                        >
                                            <div className="avatar-title rounded-circle bg-primary-subtle text-primary fs-20">
                                                <i className="ri-history-line"></i>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="mb-1">
                                                Activity Logs
                                            </h5>

                                            <p className="text-muted mb-0">
                                                Monitor user activities and
                                                system actions.
                                            </p>
                                        </div>

                                    </div>
                                </Col>

                                <Col
                                    xs="12"
                                    lg="auto"
                                    className="mt-3 mt-lg-0"
                                >

                                    <Button
                                        color="dark"
                                        outline
                                        onClick={fetchActivities}
                                        disabled={isLoading}
                                    >
                                        <i className="ri-refresh-line me-1"></i>

                                        Refresh
                                    </Button>

                                </Col>

                            </Row>

                        </CardHeader>

                    </Card>

                    {/* ==========================
                        Activity Card
                    ========================== */}
                    <Card className="border-0 shadow-sm">

                        <CardBody className="p-0">

                            {/* Search */}
                            <div className="p-3 border-bottom">

                                <Row className="align-items-center">

                                    <Col
                                        xs="12"
                                        md="6"
                                        lg="4"
                                    >

                                        <div className="position-relative">

                                            <Input
                                                type="text"
                                                placeholder="Search activity..."
                                                value={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                                className="ps-5"
                                            />

                                            <i
                                                className="ri-search-line position-absolute text-muted"
                                                style={{
                                                    left: "16px",
                                                    top: "50%",
                                                    transform:
                                                        "translateY(-50%)",
                                                }}
                                            ></i>

                                        </div>

                                    </Col>

                                    <Col className="text-md-end mt-3 mt-md-0">

                                        <span className="text-muted fs-13">
                                            {filteredActivities.length}{" "}
                                            activities
                                        </span>

                                    </Col>

                                </Row>

                            </div>

                            {/* Loading */}
                            {isLoading ? (
                                <div className="py-5">
                                    <Loader error={true} />
                                </div>
                            ) : filteredActivities.length === 0 ? (

                                /* Empty */
                                <div className="text-center py-5">

                                    <div className="avatar-lg mx-auto mb-3">
                                        <div className="avatar-title rounded-circle bg-light text-muted fs-30">
                                            <i className="ri-history-line"></i>
                                        </div>
                                    </div>

                                    <h5>
                                        No activities found
                                    </h5>

                                    <p className="text-muted mb-0">
                                        There are no activity records matching
                                        your search.
                                    </p>

                                </div>

                            ) : (

                                /* ==========================
                                   Custom Table
                                ========================== */
                                <div className="table-responsive">

                                    <table className="table table-hover align-middle mb-0">

                                        <thead className="table-light">

                                            <tr>

                                                <th
                                                    className="ps-4"
                                                    style={{
                                                        width: "70px",
                                                    }}
                                                >
                                                    #
                                                </th>

                                                <th>
                                                    User
                                                </th>

                                                <th>
                                                    Activity
                                                </th>

                                                <th>
                                                    Description
                                                </th>

                                                <th>
                                                    Date
                                                </th>

                                                <th
                                                    className="text-end pe-4"
                                                >
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {filteredActivities.map(
                                                (activity, index) => (

                                                    <tr
                                                        key={activity.id}
                                                        style={{
                                                            transition:
                                                                "background-color .2s ease",
                                                        }}
                                                    >

                                                        {/* ID */}
                                                        <td className="ps-4">

                                                            <span className="text-muted fw-medium">
                                                                {activity.id}
                                                            </span>

                                                        </td>

                                                        {/* User */}
                                                        <td>

                                                            <div className="d-flex align-items-center">

                                                                <div
                                                                    className="avatar-sm me-2"
                                                                    style={{
                                                                        minWidth:
                                                                            "36px",
                                                                    }}
                                                                >

                                                                    <div className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                                        <i className="ri-user-line"></i>
                                                                    </div>

                                                                </div>

                                                                <div>

                                                                    <h6 className="mb-0 fs-14">

                                                                        {activity
                                                                            .user
                                                                            ?.name ||
                                                                            "Deleted User"}

                                                                    </h6>

                                                                    <small className="text-muted">

                                                                        {activity
                                                                            .user
                                                                            ?.email ||
                                                                            "User account removed"}

                                                                    </small>

                                                                </div>

                                                            </div>

                                                        </td>

                                                        {/* Activity */}
                                                        <td>

                                                            <div>
                                                                {getActionBadge(
                                                                    activity.action
                                                                )}
                                                            </div>

                                                        </td>

                                                        {/* Description */}
                                                        <td>

                                                            <div
                                                                className="text-muted"
                                                                style={{
                                                                    maxWidth:
                                                                        "300px",
                                                                }}
                                                            >

                                                                <span
                                                                    className="d-block text-truncate"
                                                                    title={
                                                                        activity.description
                                                                    }
                                                                >
                                                                    {activity.description ||
                                                                        "-"}
                                                                </span>

                                                            </div>

                                                        </td>

                                                        {/* Date */}
                                                        <td>

                                                            <div>

                                                                <span className="text-body d-block fs-13">

                                                                    {new Date(
                                                                        activity.created_at
                                                                    ).toLocaleDateString(
                                                                        "en-US",
                                                                        {
                                                                            month: "short",
                                                                            day: "2-digit",
                                                                            year: "numeric",
                                                                        }
                                                                    )}

                                                                </span>

                                                                <small className="text-muted">

                                                                    {new Date(
                                                                        activity.created_at
                                                                    ).toLocaleTimeString(
                                                                        "en-US",
                                                                        {
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                        }
                                                                    )}

                                                                </small>

                                                            </div>

                                                        </td>

                                                        {/* View */}
                                                        <td className="text-end pe-4">

                                                            <Button
                                                                color="soft-primary"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleView(
                                                                        activity.id
                                                                    )
                                                                }
                                                            >

                                                                <i className="ri-eye-line me-1"></i>

                                                                View

                                                            </Button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </CardBody>

                    </Card>

                </Container>
            </div>

            {/* ==========================
                Detail Modal
            ========================== */}
            <Modal
                isOpen={detailModal}
                toggle={handleCloseDetail}
                centered
                size="lg"
            >

                <ModalHeader toggle={handleCloseDetail}>

                    <div className="d-flex align-items-center">

                        <div className="avatar-sm me-2">

                            <div className="avatar-title rounded-circle bg-primary-subtle text-primary">

                                <i className="ri-history-line fs-18"></i>

                            </div>

                        </div>

                        <div>

                            <h5 className="modal-title mb-0">
                                Activity Details
                            </h5>

                            <small className="text-muted">
                                Activity #
                                {selectedActivity?.id}
                            </small>

                        </div>

                    </div>

                </ModalHeader>

                <ModalBody>

                    {selectedActivity && (

                        <>

                            {/* User */}
                            <div className="bg-light rounded-3 p-3 mb-4">

                                <div className="d-flex align-items-center">

                                    <div className="avatar-md me-3">

                                        <div className="avatar-title rounded-circle bg-primary-subtle text-primary fs-20">

                                            <i className="ri-user-line"></i>

                                        </div>

                                    </div>

                                    <div>

                                        <h5 className="mb-1">

                                            {selectedActivity.user?.name ||
                                                "Deleted User"}

                                        </h5>

                                        <p className="text-muted mb-0">

                                            {selectedActivity.user?.email ||
                                                "User account has been deleted"}

                                        </p>

                                    </div>

                                </div>

                            </div>

                            <Row>

                                {/* Action */}
                                <Col md="6">

                                    <div className="mb-4">

                                        <label className="text-muted fs-12 text-uppercase fw-medium">
                                            Action
                                        </label>

                                        <div className="mt-1">
                                            {getActionBadge(
                                                selectedActivity.action
                                            )}
                                        </div>

                                    </div>

                                </Col>

                                {/* Module */}
                                <Col md="6">

                                    <div className="mb-4">

                                        <label className="text-muted fs-12 text-uppercase fw-medium">
                                            Module
                                        </label>

                                        <div className="fw-medium text-capitalize mt-1">

                                            {selectedActivity.module || "-"}

                                        </div>

                                    </div>

                                </Col>

                                {/* IP */}
                                <Col md="6">

                                    <div className="mb-4">

                                        <label className="text-muted fs-12 text-uppercase fw-medium">
                                            IP Address
                                        </label>

                                        <div className="fw-medium mt-1">

                                            {selectedActivity.ip_address ||
                                                "-"}

                                        </div>

                                    </div>

                                </Col>

                                {/* Date */}
                                <Col md="6">

                                    <div className="mb-4">

                                        <label className="text-muted fs-12 text-uppercase fw-medium">
                                            Date
                                        </label>

                                        <div className="fw-medium mt-1">

                                            {formatDate(
                                                selectedActivity.created_at
                                            )}

                                        </div>

                                    </div>

                                </Col>

                                {/* Description */}
                                <Col xs="12">

                                    <div className="mb-4">

                                        <label className="text-muted fs-12 text-uppercase fw-medium">
                                            Description
                                        </label>

                                        <div className="bg-light rounded p-3 mt-1">

                                            {selectedActivity.description ||
                                                "-"}

                                        </div>

                                    </div>

                                </Col>

                                {/* User Agent */}
                                <Col xs="12">

                                    <div>

                                        <label className="text-muted fs-12 text-uppercase fw-medium">
                                            User Agent
                                        </label>

                                        <div className="bg-light rounded p-3 mt-1 text-break">

                                            {selectedActivity.user_agent ||
                                                "-"}

                                        </div>

                                    </div>

                                </Col>

                            </Row>

                        </>

                    )}

                </ModalBody>

            </Modal>

        </React.Fragment>
    );
};

export default ActivityMenu;