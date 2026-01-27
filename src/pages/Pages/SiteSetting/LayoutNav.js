import React, { useEffect } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import withRouter from "../../../Components/Common/withRouter";

const LayoutNav = (props) => {
	const toggle = (tab) => {
		props.router.navigate(`/site-setting/${tab}`);
	};

	return (
		<React.Fragment>
			<Nav tabs className="nav-tabs">
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/general" })}
						onClick={() => {
							toggle("general");
						}}
					>
						General
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/homepage" })}
						onClick={() => {
							toggle("homepage");
						}}
					>
						Homepage
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/about-company" })}
						onClick={() => {
							toggle("about-company");
						}}
					>
						About Company
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/contact-us" })}
						onClick={() => {
							toggle("contact-us");
						}}
					>
						Contact Us
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/why-choose" })}
						onClick={() => {
							toggle("why-choose");
						}}
					>
						Why Choose Us
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/how-trade" })}
						onClick={() => {
							toggle("how-trade");
						}}
					>
						How To Trade
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/services" })}
						onClick={() => {
							toggle("services");
						}}
					>
						Services
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/trading" })}
						onClick={() => {
							toggle("trading");
						}}
					>
						Trading Page
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/organization-chart" })}
						onClick={() => {
							toggle("organization-chart");
						}}
					>
						Organization Chart
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/career" })}
						onClick={() => {
							toggle("career");
						}}
					>
						Career
					</NavLink>
				</NavItem>
			</Nav>
		</React.Fragment>
	);
};

export default withRouter(LayoutNav);
