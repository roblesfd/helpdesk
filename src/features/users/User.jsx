import { Link } from "react-router-dom";

const User = ({ user }) => {
  const host = location.host;
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center">
      <img
        src={user.profileImage || "https://via.placeholder.com/50"}
        alt={`${user.username}'s profile`}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex-grow text-sm">
        <Link
          to={`/panel/usuarios/id`}
          className="text-lg font-bold"
        >{`${user.name} ${user.lastname}`}</Link>
        <p className="text-gray-700">{user.email}</p>
        <p className="text-gray-500">{`@${user.username}`}</p>
        <p className="text-gray-500">{`Rol: ${user.roles}`}</p>
      </div>
      <div className="text-right">
        <p
          className={`text-sm ${
            user.active ? "text-green-500" : "text-red-500"
          }`}
        >
          {user.active ? "Activo" : "Inactivo"}
        </p>
        {user.lastLogin && (
          <p className="text-gray-500 text-sm">
            Último inicio de sesión:{" "}
            {new Date(user.lastLogin).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default User;
