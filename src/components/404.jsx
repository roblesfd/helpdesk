import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="text-6xl font-extrabold">404 No encontrado</h1>
      <div className="block">
        <p>La página que estas buscando no existe o ya no esta disponible</p>
      </div>
      <Link
        to="/"
        className="bg-secondary-500 hover:bg-secondary-600 dark:bg-secondary-400 dark:hover:bg-secondary-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Volver a Inicio
      </Link>
    </div>
  );
};

export default NotFound;
