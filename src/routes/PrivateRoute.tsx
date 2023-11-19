import { useAuth } from "../providers";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  redirectTo?: string;
}

export const PrivateRoute = ({ children, redirectTo = "/" }: Props) => {
  const { user } = useAuth();

  return user ? children : <Navigate to={redirectTo} />;
};
