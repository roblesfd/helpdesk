import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isAgente = false;
  let status = "agente";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles, id } = decoded.UserInfo;

    isAdmin = roles === "admin";
    isAgente = roles === "agente";

    if (isAdmin) status = "admin";
    if (isAgente) status = "agente";

    return { username, roles, id, status, isAgente, isAdmin };
  }

  return { username: "", roles: [], status, isAgente, isAdmin };
};

export default useAuth;
