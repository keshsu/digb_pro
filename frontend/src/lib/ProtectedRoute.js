import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

import { ROUTES } from "constants/routes";

import { AuthContext } from "context-api/AuthContext";

export function ProtectedRoute({ children, ...rest }) {
  const { userToken } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        if (userToken) {
          return children;
        }
        if (!userToken) {
          return <Navigate to={{ pathname: ROUTES.Auth.path }} />;
        }

        return null;
      }}
    />
  );
}
