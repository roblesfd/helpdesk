import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin = ({ roles }) => {
  const navigate = useNavigate();

  if (roles === "usuario") {
    navigate("/iniciar-sesion");
  }
  return <Outlet />;
};

export default ProtectedRouteAdmin;
