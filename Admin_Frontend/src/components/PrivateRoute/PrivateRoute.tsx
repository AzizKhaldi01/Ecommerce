// src/components/PrivateRoute/PrivateRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface PrivateRouteProps {
  allowedRoles: string[];
  redirectPath?: string;
  children: ReactNode; // Accepts any React component as a child
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  allowedRoles,
  redirectPath = "/login",
  children,
}) => {
  const user = useSelector((state: RootState) => state.user);

  const hasAccess = user.roles.some((role) => allowedRoles.includes(role));

  return hasAccess ? <>{children}</> : <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
