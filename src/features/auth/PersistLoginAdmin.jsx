import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLoginAdmin = () => {
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const navigate = useNavigate();

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyFreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };
      if (!token) verifyFreshToken();
    }
    return () => (effectRan.current = true);
  }, []);

  let content;

  if (isError) {
    content = (
      <p className="my-6 text-3xl text-center ">
        {error.data?.message}
        <Link to="/panel/iniciar-sesion" className="font-semibold underline">
          {" "}
          Por favor inicia sesión
        </Link>
        .
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }
  return content;
};

export default PersistLoginAdmin;
