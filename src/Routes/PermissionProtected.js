import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";

import { useProfile } from "../Components/Hooks/UserHooks";

import axios from "axios";
import { api } from "../config";

const PermissionProtected = (props) => {
  const { userProfile, loading, token } = useProfile();
  const rolePermission = sessionStorage.getItem("permissions") ? JSON.parse(sessionStorage.getItem("permissions")) : userProfile;
  useEffect(() => {
    if(userProfile.data.roles[0].id) {
      axios.get(`${api.BASE_URL}/roles/detail?id=${userProfile.data.roles[0].id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        sessionStorage.setItem("permissions", JSON.stringify(res.model));
      });
    }
  },[]);

  const { children, role } = props;

  // Check if user has permission
  var hasPermission = rolePermission.permission?.includes(role);

  if(role == "profile") {
    hasPermission = true;
  }

  if (hasPermission) {
    return <>{children}</>;
  } else {
    const [roles, action] = rolePermission.permission[0].split('.');
    const redirect = rolePermission.permission?.includes("dashboard") ? "/index" : `/${roles}`;
    return (
      <Navigate to={{ pathname: redirect, state: { from: props.location } }} />
    );
  }
};


export { PermissionProtected };
