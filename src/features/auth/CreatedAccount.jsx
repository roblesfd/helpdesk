import { Link } from "react-router-dom";

const CreatedAccount = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-8 text-primary-950">
        <h2 className="text-2xl font-bold text-center mb-6">
          Tu cuenta ha sido creada
        </h2>
        <p>
          Para poder utlizar tu cuenta, enviamos un enlace a tu dirección de
          correo para confirmar tu cuenta
        </p>
        <p>
          <Link to="/">Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
};

export default CreatedAccount;
