import HeaderContent from "../../components/HeaderContent";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserList from "./UserList";
import { useGetUsersQuery } from "./usersApiSlice";
import useAuth from "../../hooks/useAuth";

const UsersPage = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { isAdmin } = useAuth();

  const colData = [
    "ID.",
    "Nombre de usuario",
    "Correo",
    "Nombre",
    "Apellido",
    "Estado de cuenta",
    "Roles",
    "Teléfono",
  ];

  if (isAdmin) colData.push("Acciones");

  let content;

  if (isLoading) {
    content = <p>Cargando...</p>;
  }

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { entities } = users;
    content = <UserList userData={entities} colData={colData} />;
  }

  return (
    <>
      {/* header */}
      <div className=" flex justify-between items-center">
        <HeaderContent
          title="Usuarios"
          description="Descripcion sobre usuarios"
        />
        <div>
          {isAdmin && (
            <Link
              to="/panel/usuarios/nuevo"
              className="inline-block px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transform transition-transform duration-300 ease-in-out hover:-translate-y-1"
            >
              + Nuevo
            </Link>
          )}
        </div>
      </div>
      {content}
    </>
  );
};

export default UsersPage;
