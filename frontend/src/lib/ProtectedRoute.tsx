import React, { FC, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { ROUTES } from "constants/routes";
import { AuthContext } from "context-api/AuthContext";

const PrivateRoutes: FC = () => {
  const { userToken } = useContext(AuthContext);
  return userToken ? <Outlet /> : <Navigate to={ROUTES.Auth.path} />;
};

export default PrivateRoutes;
