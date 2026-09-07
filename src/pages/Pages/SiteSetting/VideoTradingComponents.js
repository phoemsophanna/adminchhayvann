import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, CardBody, Col, Container, Form, Input, Label, Row, Spinner, Modal, ModalBody, ModalHeader } from "reactstrap";
import { api } from "../../../config";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useProfile } from "../../../Components/Hooks/UserHooks";
import defaultImage from "../../../assets/images/dummy_400x400_ffffff_cccccc.png";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const VideoTradingComponents = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);

    const { token } = useProfile();

    const authHeaders = () => ({
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
    });

    const fetchList = () => {
        setLoading(true);
        fetch(`${api.BASE_URL}/trading-video`, { headers: authHeaders() })
            .then((r) => r.json())
            .then((data) => setVideos(data.data || data))
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
            videoLink: "",
            subtitle_eng: "",
            subtitle_km: "",
            title_eng: "",
            title_km: "",
            des_eng: "",
            des_km: "",
            link: "",
            image: "",
            ordering: "",
            status: true,
        },
        onSubmit: (values, { setSubmitting }) => {
            values.image = imageFiles.length > 0 ? (imageFiles[0]?.serverId ? imageFiles[0].serverId : imageFiles[0]?.source) : values.image || "";
            fetch(`${api.BASE_URL}/trading-video`, {
                    method: "POST",
                    headers: authHeaders(),
                    body: JSON.stringify(values),
                })
                .then((r) => r.json())
                .then(() => {
                    setShowModal(false);
                    setEditId(null);
                    setImageFiles([]);
                    fetchList();
                })
                .catch(() => {})
                .finally(() => setSubmitting(false));
        },
    });

    useEffect(() => {
        if (editId) {
            fetch(`${api.BASE_URL}/trading-video/detail?id=${editId}`, { headers: authHeaders() })
                .then((r) => r.json())
                .then((data) => {
                    const d = data.model || data;
                    form.setValues({
                        id: d.id,
                        videoLink: d.videoLink || "",
                        subtitle_eng: d.subtitle_eng || "",
                        subtitle_km: d.subtitle_km || "",
                        title_eng: d.title_eng || "",
                        title_km: d.title_km || "",
                        des_eng: d.des_eng || "",
                        des_km: d.des_km || "",
                        link: d.link || "",
                        image: d.image || "",
                        ordering: d.ordering || "",
                        status: d.status ? true : false,
                    });
                    if (d.image) setImageFiles([{ source: d.image, options: { type: "local" } }]);
                })
                .catch(() => {});
        } else {
            form.resetForm();
            setImageFiles([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editId, token]);

    const columns = useMemo(() => [
        { Header: "ID", accessor: "id", Cell: ({ row }) => <span className="fw-semibold">{row.original.id}</span> },
        { Header: "Title (ENG)", accessor: "title_eng" },
        { Header: "Title (KHM)", accessor: "title_km" },
        { Header: "Video Link", accessor: "videoLink" },
        { Header: "Image", accessor: "image", Cell: (cell) => <img src={cell.value ? api.FILE_URI + cell.value : defaultImage} alt="" style={{ width: 64, height: 36, objectFit: "cover" }} /> },
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
        fetch(`${api.BASE_URL}/trading-video/delete/${deleteId}`, { method: 'DELETE', headers: authHeaders() })
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
                                    <h5 className="mb-0">Trading Videos</h5>
                                    <Button color="primary" onClick={() => { setEditId(null); form.resetForm(); setShowModal(true); }}>Add Video</Button>
                                </div>

                                {loading ? (
                                    <div className="text-center"><Spinner /></div>
                                ) : (
                                    <TableContainer
                                        columns={columns}
                                        data={videos || []}
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

            <Modal isOpen={showModal} backdrop={"static"} centered size="xl" scrollable>
                <ModalHeader className="border-bottom bg-light" toggle={() => { setShowModal(false); setEditId(null); }}>
                    <div className="d-flex align-items-center gap-2">
                        <span className="avatar-xs rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center">
                            <i className="ri-video-line"></i>
                        </span>
                        <span>{editId ? 'Update Trading Video' : 'Create Trading Video'}</span>
                    </div>
                </ModalHeader>
                <ModalBody className="p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); return false; }}>
                        <div className="border-bottom pb-2 mb-3">
                            <h6 className="text-primary mb-1">Content</h6>
                            <p className="text-muted mb-0 small">Add the video copy in both supported languages.</p>
                        </div>

                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="title_eng">Title (English)</Label>
                                    <Input id="title_eng" name="title_eng" placeholder="Enter English title" onChange={form.handleChange} value={form.values.title_eng} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="title_km">Title (Khmer)</Label>
                                    <Input id="title_km" name="title_km" placeholder="Enter Khmer title" onChange={form.handleChange} value={form.values.title_km} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="subtitle_eng">Subtitle (English)</Label>
                                    <Input id="subtitle_eng" name="subtitle_eng" placeholder="Enter English subtitle" onChange={form.handleChange} value={form.values.subtitle_eng} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="subtitle_km">Subtitle (Khmer)</Label>
                                    <Input id="subtitle_km" name="subtitle_km" placeholder="Enter Khmer subtitle" onChange={form.handleChange} value={form.values.subtitle_km} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="des_eng">Description (English)</Label>
                                    <Input type="textarea" rows="4" id="des_eng" name="des_eng" placeholder="Enter English description" onChange={form.handleChange} value={form.values.des_eng} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="des_km">Description (Khmer)</Label>
                                    <Input type="textarea" rows="4" id="des_km" name="des_km" placeholder="Enter Khmer description" onChange={form.handleChange} value={form.values.des_km} />
                                </div>
                            </Col>
                        </Row>

                        <div className="border-bottom pb-2 mb-3 mt-2">
                            <h6 className="text-primary mb-1">Media &amp; Links</h6>
                            <p className="text-muted mb-0 small">Connect the video and its call-to-action destination.</p>
                        </div>

                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="videoLink">Video Link</Label>
                                    <Input type="text" id="videoLink" name="videoLink" placeholder="https://youtube.com/..." onChange={form.handleChange} value={form.values.videoLink} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="link">Button Link</Label>
                                    <Input type="text" id="link" name="link" placeholder="https://example.com/..." onChange={form.handleChange} value={form.values.link} />
                                </div>
                            </Col>
                        </Row>

                        <div className="mb-3">
                            <Label className="form-label">Image</Label>
                            <FilePond
                                labelIdle='<span class="filepond--label-action">Choose Image</span>'
                                files={imageFiles}
                                onupdatefiles={setImageFiles}
                                allowMultiple={false}
                                maxFiles={1}
                                name="file"
                                server={`${api.BASE_URL}/save-image/sites-settings`}
                                stylePanelLayout="compact"
                            />
                        </div>

                        <Row className="align-items-end">
                            <Col md={6}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="ordering">Ordering</Label>
                                    <Input type="number" id="ordering" name="ordering" onChange={form.handleChange} value={form.values.ordering || ""} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-check form-switch mb-3">
                                    <Input type="checkbox" id="status" name="status" onChange={(e) => form.setFieldValue('status', e.target.checked)} checked={form.values.status} />
                                    <Label htmlFor="status" className="form-check-label ms-2">Status: {form.values.status ? 'Active' : 'Inactive'}</Label>
                                </div>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end gap-2 border-top pt-3 mt-2">
                            <Button color="light" onClick={() => { setShowModal(false); setEditId(null); }}>Cancel</Button>
                            <Button type="submit" color="primary" disabled={form.isSubmitting}>
                                {form.isSubmitting ? <Spinner size="sm" className="me-1" /> : <i className="ri-save-line me-1"></i>}
                                Save
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>

            <DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={false} />
        </React.Fragment>
    );
};

export default VideoTradingComponents;
