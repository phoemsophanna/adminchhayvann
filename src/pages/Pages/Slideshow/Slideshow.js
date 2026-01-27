import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Slideshow = () => {
  document.title = "Slideshow | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Slideshow" pageTitle="Pages" />
          <Row>
            <Col xs={12}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Slideshow;
