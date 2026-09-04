import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, CardBody, Col, Container, Form, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from "reactstrap";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { useProfile } from "../../../Components/Hooks/UserHooks";

const QR_SIZE = 2400;
const QR_SERVICE = "https://api.qrserver.com/v1/create-qr-code/";

const QRCode = () => {
    const { token } = useProfile();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [form, setForm] = useState({ link: "" });
    const [selected, setSelected] = useState(null);

    const headers = useMemo(() => ({
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
    }), [token]);

    const fetchList = () => {
        setLoading(true);
        fetch(`${api.BASE_URL}/qr-code`, { headers })
            .then((response) => response.json())
            .then((data) => {
                const result = data.data || data;
                setItems(Array.isArray(result) ? result : []);
            })
            .catch(() => setItems([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchList();
    }, [token]);

    const qrUrl = (link) => `${QR_SERVICE}?size=${QR_SIZE}x${QR_SIZE}&margin=20&data=${encodeURIComponent(link || " ")}`;

    const openCreate = () => {
        setEditId(null);
        setForm({ link: "" });
        setShowModal(true);
    };

    const openEdit = (item) => {
        setEditId(item.id);
        setForm({ link: item.link || "" });
        setShowModal(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSaving(true);
        fetch(`${api.BASE_URL}/qr-code`, {
            method: "POST",
            headers,
            body: JSON.stringify({ id: editId || "", link: form.link }),
        })
            .then((response) => response.json())
            .then(() => {
                setShowModal(false);
                fetchList();
            })
            .catch(() => {})
            .finally(() => setSaving(false));
    };

    const handleDelete = () => {
        if (!deleteId) return;
        fetch(`${api.BASE_URL}/qr-code/delete/${deleteId}`, { method: "DELETE", headers })
            .then((response) => response.json())
            .then(() => {
                setDeleteId(null);
                fetchList();
            })
            .catch(() => {});
    };

    const downloadQRCode = async (item) => {
        const response = await fetch(qrUrl(item.link));
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = `qr-code-${item.id || "image"}-${QR_SIZE}x${QR_SIZE}.png`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(downloadUrl);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <p className="text-uppercase text-primary fw-semibold mb-1 small">Digital access</p>
                            <h4 className="mb-1">QR Code Studio</h4>
                            <p className="text-muted mb-0">Create sharp, print-ready QR codes for every destination.</p>
                        </div>
                        <Button color="primary" onClick={openCreate}>
                            <i className="ri-add-line me-1" /> New QR code
                        </Button>
                    </div>

                    <Row className="g-4">
                        <Col xl={4} lg={5}>
                            <Card className="border-0 shadow-sm h-100">
                                <CardBody className="p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div>
                                            <h5 className="mb-1">Live preview</h5>
                                            <span className="text-muted small">{selected ? "Selected destination" : "Choose a code to preview"}</span>
                                        </div>
                                        <span className="badge bg-light text-primary">HD {QR_SIZE}px</span>
                                    </div>
                                    {selected ? (
                                        <React.Fragment>
                                            <div className="bg-light rounded-3 p-3 text-center mb-3 position-relative">
                                                <img src={qrUrl(selected.link)} alt="QR code preview" className="img-fluid" style={{ maxHeight: 300 }} />
                                            </div>
                                            <div className="text-truncate fw-semibold mb-1">{selected.link}</div>
                                            <div className="text-muted small mb-3">Download produces a {QR_SIZE} x {QR_SIZE} PNG.</div>
                                            <Button color="dark" className="w-100" onClick={() => downloadQRCode(selected)}>
                                                <i className="ri-download-2-line me-1" /> Download PNG
                                            </Button>
                                        </React.Fragment>
                                    ) : (
                                        <div className="text-center text-muted py-5">
                                            <i className="ri-qr-code-line display-4 d-block mb-3 text-primary" />
                                            Select a saved QR code to see it here.
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl={8} lg={7}>
                            <Card className="border-0 shadow-sm h-100">
                                <CardBody className="p-0">
                                    <div className="p-4 border-bottom">
                                        <h5 className="mb-1">Saved codes</h5>
                                        <span className="text-muted small">Each QR code stores one destination link.</span>
                                    </div>
                                    {loading ? <div className="text-center p-5"><Spinner /></div> : items.length === 0 ? (
                                        <div className="text-center text-muted p-5">No QR codes yet. Create your first one.</div>
                                    ) : items.map((item) => (
                                        <div key={item.id} className={`d-flex align-items-center gap-3 p-3 border-bottom ${selected?.id === item.id ? "bg-light" : ""}`}>
                                            <img src={qrUrl(item.link)} alt="" width="68" height="68" className="rounded border p-1" />
                                            <div className="flex-grow-1 min-width-0">
                                                <div className="text-truncate fw-semibold">{item.link}</div>
                                            </div>
                                            <div className="d-flex gap-1">
                                                <Button color="light" title="Preview" onClick={() => setSelected(item)}><i className="ri-eye-line" /></Button>
                                                <Button color="light" title="Download" onClick={() => downloadQRCode(item)}><i className="ri-download-2-line" /></Button>
                                                <Button color="light" title="Edit" onClick={() => openEdit(item)}><i className="ri-pencil-line" /></Button>
                                                <Button color="light" title="Delete" onClick={() => setDeleteId(item.id)}><i className="ri-delete-bin-line text-danger" /></Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal isOpen={showModal} centered toggle={() => setShowModal(false)}>
                <ModalHeader toggle={() => setShowModal(false)}>{editId ? "Edit QR code" : "Create QR code"}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Label>Destination link</Label>
                            <Input type="url" required placeholder="https://example.com" value={form.link} onChange={(event) => setForm({ ...form, link: event.target.value })} />
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <Button color="light" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
                            <Button color="primary" type="submit" disabled={saving}>{saving ? <Spinner size="sm" /> : "Save QR code"}</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
            <DeleteModal show={Boolean(deleteId)} onDeleteClick={handleDelete} onCloseClick={() => setDeleteId(null)} isLoading={false} />
        </React.Fragment>
    );
};

export default QRCode;
