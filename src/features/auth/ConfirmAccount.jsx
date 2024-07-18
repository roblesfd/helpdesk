import { Link, useParams } from "react-router-dom";
import { useConfirmUserQuery } from "./authApiSlice";

const ConfirmAccount = () => {
  const { token } = useParams();

  const { isLoading, isSuccess, isError, error } = useConfirmUserQuery(token);

  let content;

  if (isLoading) content = <p>Cargando...</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    content = (
      <div className="text-center">
        <h2 className="text-2xl font-bold  mb-6">
          Tu cuenta ha sido confirmada exitosamente
        </h2>
        <p>
          Ahora puedes
          <Link to={`/ingresar`} className="font-bold">
            {" "}
            Iniciar sesión
          </Link>{" "}
          en tu cuenta
        </p>
      </div>
    );
  } else {
    content = (
      <div className="text-center">
        <h2 className="text-2xl font-bold  mb-6">Error</h2>
        <p>El enlace solicitado ya no está disponible</p>
        <p className="mt-8 hover:text-black font-bold">
          {" "}
          <Link to={`/`}>Volver al inicio</Link>{" "}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-8 text-primary-950">
        {content}
      </div>
    </div>
  );
};

export default ConfirmAccount;
