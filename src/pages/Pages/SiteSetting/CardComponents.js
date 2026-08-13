import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, CardBody, Col, Container, Form, Input, Label, Row, Spinner, TabContent, TabPane, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink } from "reactstrap";
import { api } from "../../../config";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useProfile } from "../../../Components/Hooks/UserHooks";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CardComponents = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [iconFiles, setIconFiles] = useState([]);
    const [titleTap, setTitleTap] = useState("ENG");

    const titleTapToggle = (lang) => setTitleTap(lang);

    const { token } = useProfile();

    const authHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
    });

    const fetchList = () => {
        setLoading(true);
        fetch(`${api.BASE_URL}/cards`, { headers: authHeaders() })
            .then((r) => r.json())
            .then((data) => setCards(data.data || data))
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchList();
    }, []);

    const form = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: editId || "",
            title_eng: "",
            title_km: "",
            ordering: "",
            status: true,
            icon: "",
        },
        onSubmit: (values, { setSubmitting }) => {
            values.icon = iconFiles.length > 0 ? (iconFiles[0]?.serverId ? iconFiles[0].serverId : iconFiles[0]?.source) : values.icon || "";
            fetch(`${api.BASE_URL}/cards`, {
                    method: "POST",
                    headers: authHeaders(),
                    body: JSON.stringify(values),
                })
                .then((r) => r.json())
                .then(() => {
                    setShowModal(false);
                    setEditId(null);
                    setIconFiles([]);
                    fetchList();
                })
                .catch(() => {})
                .finally(() => setSubmitting(false));
        },
    });

    useEffect(() => {
        if (editId) {
            fetch(`${api.BASE_URL}/cards/detail?id=${editId}`, { headers: authHeaders() })
                .then((r) => r.json())
                .then((data) => {
                    const d = data.model || data;
                    form.setValues({
                        id: d.id,
                        title_eng: d.title_eng || "",
                        title_km: d.title_km || "",
                        ordering: d.ordering || "",
                        status: d.status ? true : false,
                        icon: d.icon || "",
                    });
                    if (d.icon) setIconFiles([{ source: d.icon, options: { type: "local" } }]);
                })
                .catch(() => {});
        } else {
            form.resetForm();
            setIconFiles([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editId, token]);

    const columns = useMemo(() => [
        { Header: "ID", accessor: "id", Cell: ({ row }) => <span className="fw-semibold">{row.original.id}</span> },
        { Header: "Title (ENG)", accessor: "title_eng" },
        { Header: "Title (KHM)", accessor: "title_km" },
        { Header: "Icon", accessor: "icon", Cell: (cell) => <img src={api.FILE_URI + cell.value} alt="" style={{ width: 36 }} /> },
        { Header: "Ordering", accessor: "ordering" },
        { Header: "Status", accessor: "status", Cell: (c) => (c.value ? 'Active' : 'Inactive') },
        { Header: "Action", accessor: "action", Cell: ({ row }) => (
            <ul className="list-inline hstack gap-2 mb-0">
                <li className="list-inline-item" title="Edit">
                    <Button color="link" onClick={() => { setEditId(row.original.id); setShowModal(true); }}>
                        <i className="ri-pencil-fill align-bottom text-muted"></i>
                    </Button>
                </li>
                <li className="list-inline-item" title="Delete">
                    <Button color="link" onClick={() => { setDeleteId(row.original.id); setDeleteModal(true); }}>
                        <i className="ri-delete-bin-fill align-bottom text-muted"></i>
                    </Button>
                </li>
            </ul>
        ) },
    ], []);

    const handleDelete = () => {
        if (!deleteId) return;
        fetch(`${api.BASE_URL}/cards/delete/${deleteId}`, { method: 'DELETE', headers: authHeaders() })
            .then((r) => r.json())
            .then(() => {
                setDeleteModal(false);
                setDeleteId(null);
                fetchList();
            })
            .catch(() => {});
    };

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="mb-0">Service Details Cards</h5>
                                    <Button color="primary" onClick={() => { setEditId(null); setShowModal(true); }}>Add Card</Button>
                                </div>

                                {loading ? (
                                    <div className="text-center"><Spinner /></div>
                                ) : (
                                    <TableContainer
                                        columns={columns}
                                        data={cards || []}
                                        isGlobalFilter={false}
                                        isAddUserList={false}
                                        customPageSize={8}
                                        className="custom-header-css"
                                        divClass="table-responsive table-card mb-2"
                                        tableClass="align-middle table-nowrap"
                                        theadClass="table-light"
                                    />
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={showModal} backdrop={"static"} centered>
                <ModalHeader toggle={() => { setShowModal(false); setEditId(null); }}>{editId ? 'Update Card' : 'Create Card'}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); return false; }}>
                        <div className="mb-3">
                            <Nav tabs className="nav">
                                <NavItem>
                                    <NavLink style={{ cursor: "pointer" }} className={titleTap == "ENG" ? "active" : ""} onClick={() => titleTapToggle('ENG')}>English</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{ cursor: "pointer" }} className={titleTap == "KHM" ? "active" : ""} onClick={() => titleTapToggle('KHM')}>Khmer</NavLink>
                                </NavItem>
                            </Nav>
                        </div>

                        <TabContent activeTab={titleTap}>
                            <TabPane tabId={"ENG"} id="eng">
                                <div className="mb-3">
                                    <Label className="form-label">Title (English)</Label>
                                    <Input name="title_eng" onChange={form.handleChange} value={form.values.title_eng} />
                                </div>
                            </TabPane>
                            <TabPane tabId={"KHM"} id="khm">
                                <div className="mb-3">
                                    <Label className="form-label">Title (Khmer)</Label>
                                    <Input name="title_km" onChange={form.handleChange} value={form.values.title_km} />
                                </div>
                            </TabPane>
                        </TabContent>

                        <div className="mb-3">
                            <Label className="form-label">Icon</Label>
                            <FilePond
                                labelIdle='<span class="filepond--label-action">Choose Image</span>'
                                files={iconFiles}
                                onupdatefiles={setIconFiles}
                                allowMultiple={false}
                                maxFiles={1}
                                name="file"
                                server={`${api.BASE_URL}/save-image/sites-settings`}
                                stylePanelLayout="compact"
                            />
                        </div>

                        <div className="mb-3">
                            <Label className="form-label">Ordering</Label>
                            <Input type="number" name="ordering" onChange={form.handleChange} value={form.values.ordering || ""} />
                        </div>

                        <div className="form-check form-switch mb-3">
                            <Input type="checkbox" name="status" onChange={(e) => form.setFieldValue('status', e.target.checked)} checked={form.values.status} />
                            <Label className="form-check-label ms-2">Status: {form.values.status ? 'Active' : 'Inactive'}</Label>
                        </div>

                        <div className="text-end">
                            <Button color="light" className="me-2" onClick={() => { setShowModal(false); setEditId(null); }}>Cancel</Button>
                            <Button type="submit" color="primary">Save</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>

            <DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={false} />
        </React.Fragment>
    );
};

export default CardComponents;
