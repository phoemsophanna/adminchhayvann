import React, { useEffect, useState } from "react";
import { Button, Col, Container, Input, Label, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from "reactstrap";
import { deleteExchange, fetchExchangeList, refreshExchangeList } from "../../../store/actions";
import { api } from "../../../config";
import axios from "axios";
import { useProfile } from "../../../Components/Hooks/UserHooks";
import { Link } from "react-router-dom";

const UploadImage = ({modal, setModal}) => {
    document.title = "Exchange Rate | Admin & Dashboards";
    const { token } = useProfile();
    const [imageAll, setImageAll] = useState([]);
    const [fileAll, setFileAll] = useState([]);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [listImage, setListImage] = useState([]);
    const [copied, setCopied] = useState(false);

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const image = files.map((q) => {
            return URL.createObjectURL(q);
        });
        setImageAll(image);
        setFileAll(files);
        e.target.value = null;
    }

    const removeImage = (index) => {
        const removeImage = imageAll.filter((q,i) => index != i);
        const removeFile = fileAll.filter((q,i) => i != index);
        setImageAll(removeImage);
        setFileAll(removeFile);
    }

    const getImage = () => {
        axios.get(`${api.BASE_URL}/uploadImages`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if(res.status == "success") {
                setListImage(res.data);
            }
        })
    }

    const uploadFiles = () => {
        setUploadSuccess(true);
        axios.post(`${api.BASE_URL}/uploadImages`, {galleries: fileAll, type: "EXCHANGE"}, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if(res.status == "success"){
                setFileAll([]);
                setImageAll([]);
                setUploadSuccess(false);
                getImage();
            }
        })
    }

    const deleteImage = (id) => {
        axios.delete(`${api.BASE_URL}/uploadImages/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if(res.status == "success"){
                getImage();
            }
        })
    }

    const closeModal = () => {
        setModal(false);
    }

    const [titleTap, settitleTap] = useState("LIST");
    const titleTapToggle = (tab) => {
        if (titleTap !== tab) {
            settitleTap(tab);
        }
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        const timeout = setTimeout(() => {
            setCopied(false);
        },1000);
    }

    useEffect(() => {
        getImage();
    },[]);

    return (
        <>
        <Modal
            isOpen={modal}
            toggle={() => {
                closeModal();
            }}
            backdrop={"static"}
            id="staticBackdrop"
            size="xl"
            centered
        >
            <ModalHeader className="bg-light p-3 text-light" toggle={closeModal}>
                <Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={titleTap == "LIST" ? "active" : ""}
                            onClick={() => {
                                titleTapToggle("LIST");
                            }}
                        >
                            List Image
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={titleTap == "UPLOAD" ? "active" : ""}
                            onClick={() => {
                                titleTapToggle("UPLOAD");
                            }}
                        >
                            Upload Image
                        </NavLink>
                    </NavItem>
                </Nav>
            </ModalHeader>

            <ModalBody>
                <TabContent activeTab={titleTap}>
                    <TabPane tabId={`LIST`} id="list">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">URL</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listImage.map((q,i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td><img src={api.FILE_URI + q.image} alt={q.image} width={40} /></td>
                                            <td>
                                                <Link className="uploadPhotoLink" href={`#`} 
                                                    onClick={() => copyText(api.FILE_URI + q.image)} 
                                                >
                                                    {api.FILE_URI + q.image} <i style={{lineHeight: 1}} className="ri-file-copy-line"></i>
                                                </Link>
                                            </td>
                                            <td><i onClick={() => deleteImage(q.id)} style={{fontSize: 18, color: "red", cursor: "pointer"}} className="ri-delete-bin-6-line"></i></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tabId={`UPLOAD`} id="upload">
                        <Row>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="exchange-title-input">
                                    Image <small className="text-danger">(600x250 pixel)</small>
                                </Label>
                                <Input
                                    type="file"
                                    className="form-control"
                                    id="exchange-rate-to-input"
                                    placeholder="Enter exchange rate to"
                                    name="to"
                                    onChange={(e) => handleFileUpload(e)}
                                    accept=".png,.jpg,.webp"
                                    multiple
                                />
                            </div>
                            {
                                imageAll.length > 0 ? (
                                    <div className="container-image">
                                        {
                                            imageAll.map((q,i) => {
                                                return <div className="item" key={i}>
                                                    <i className="ri-close-circle-fill" onClick={() => removeImage(i)}></i>
                                                    <img src={q} alt={q} />
                                                </div>;
                                            })
                                        }
                                    </div>
                                ) : ""
                            }
                            {
                                uploadSuccess ? (
                                    <Button color="success" className="btn-load mb-2">
                                        <span className="d-flex align-items-center">
                                            <Spinner size="sm" className="flex-shrink-0">
                                                Loading...
                                            </Spinner>
                                            <span className="flex-grow-1 ms-2">Loading...</span>
                                        </span>
                                    </Button>
                                ) : (
                                    <button className="btn btn-success mb-2" onClick={() => uploadFiles()}>
                                        <i className="ri-add-fill me-1 align-bottom"></i>Upload
                                    </button>
                                )
                            }
                        </Row>
                    </TabPane>
                </TabContent>  
            </ModalBody>
            {
                copied ? (
                    <div style={{
                        boxShadow: "0px 10px 25px 0px rgba(37, 42, 52, 0.08)",
                        padding: 10,
                        position: "absolute", 
                        width: "100%",
                        textAlign: "center",
                        backgroundColor: "#fff",
                        fontSize: 14,
                        bottom: 0
                    }}>
                        <span style={{color: "green"}} className="mdi mdi-check-circle"></span> Copied
                    </div>
                ) : ""
            }
        </Modal>
        </>
    );
};

export default UploadImage;