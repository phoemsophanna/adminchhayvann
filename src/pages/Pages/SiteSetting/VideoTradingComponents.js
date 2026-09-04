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

            <Modal isOpen={showModal} backdrop={"static"} centered>
                <ModalHeader toggle={() => { setShowModal(false); setEditId(null); }}>{editId ? 'Update Trading Video' : 'Create Trading Video'}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); return false; }}>
                        <div className="mb-3">
                            <Label className="form-label">Video Link</Label>
                            <Input type="text" name="videoLink" onChange={form.handleChange} value={form.values.videoLink} />
                        </div>
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

export default VideoTradingComponents;
