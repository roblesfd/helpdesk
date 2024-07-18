import { useNavigate, Outlet, Link } from "react-router-dom";

const ProtectedRouteClient = ({ user }) => {
  let content;

  if (!user && user.length === 0) {
    content = (
      <p className="my-6 text-3xl text-center ">
        <Link to="/ingresar" className="font-semibold underline">
          {" "}
          Por favor inicia sesión
        </Link>
      </p>
    );
  } else {
    return <Outlet />;
  }
  return content;
};

export default ProtectedRouteClient;
