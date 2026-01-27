import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import { api } from "../../config";

const ProfileDropdown = () => {
	const selectDashboardData = createSelector(
		(state) => state.Login.user,
		(user) => user
	);

	// Inside your component
	const user = useSelector(selectDashboardData);

	const [userName, setUserName] = useState();
	const [userRole, setUserRole] = useState();
	const [userImage, setUserImage] = useState();

	useEffect(() => {
		if (user && sessionStorage.getItem("authUser")) {
			let authUser = JSON.parse(sessionStorage.getItem("authUser"))?.data;
			setUserName(user.name || authUser?.name);
			setUserRole(user.userRole || authUser?.userRole);
			setUserImage(user.image ? `${api.FILE_URI}${user.image}` : authUser?.image ? `${api.FILE_URI}${authUser?.image}` : avatar1);
		}
	}, [setUserName, setUserRole, setUserImage, user]);

	//Dropdown Toggle
	const [isProfileDropdown, setIsProfileDropdown] = useState(false);
	const toggleProfileDropdown = () => {
		setIsProfileDropdown(!isProfileDropdown);
	};
	return (
		<React.Fragment>
			<Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
				<DropdownToggle tag="button" type="button" className="btn shadow-none">
					<span className="d-flex align-items-center">
						<img className="rounded-circle header-profile-user" src={userImage} alt="Header Avatar" />
						<span className="text-start ms-xl-2">
							<span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userName}</span>
							<span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{userRole}</span>
						</span>
					</span>
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu-end">
					<h6 className="dropdown-header">Welcome {userName}!</h6>

					<div className="dropdown-divider"></div>
					<Link to={"/profile"}>
						<DropdownItem>
							<i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
							<span className="align-middle">Settings</span>
						</DropdownItem>
					</Link>
					<Link to={"/auth-lockscreen-basic"}>
						<DropdownItem>
							<i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>
							<span className="align-middle">Lock screen</span>
						</DropdownItem>
					</Link>
					<Link to={"/logout"}>
						<DropdownItem>
							<i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
							<span className="align-middle" data-key="t-logout">
								Logout
							</span>
						</DropdownItem>
					</Link>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};

export default ProfileDropdown;
