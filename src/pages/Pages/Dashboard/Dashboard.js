import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";

const Dashboard = () => {
	document.title = "Dashboard | Admin & Dashboard";

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Dashboard" pageTitle="Home" />
					<Row className="project-wrapper">
						<Col xxl={12}>
							<Widgets />
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
