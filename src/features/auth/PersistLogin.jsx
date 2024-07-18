import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
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
    return <Outlet />;
  } else if (isSuccess && trueSuccess) {
    return <Outlet />;
  } else if (token && isUninitialized) {
    console.log(isUninitialized);
    return <Outlet />;
  }
};

export default PersistLogin;
