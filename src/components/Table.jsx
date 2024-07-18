import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Table = ({ cols, rows, actions }) => {
  const { isAdmin } = useAuth();

  return (
    <div className="flex flex-col">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 sm:px-6 lg:px-8">
          <div>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  {cols.map((col, key) => (
                    <th scope="col" className="px-6 py-4" key={key}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.values(rows).map((row, key) => (
                  <tr
                    key={key}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {row._id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {row.username}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{row.email}</td>
                    <td className="whitespace-nowrap px-6 py-4">{row.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {row.lastname}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {row.active ? "Activada" : "Desactivada"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{row.roles}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {row.phoneNumber}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <Link
                          to={`/panel/usuarios/${row._id}`}
                          title="Ver usuario"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                        {isAdmin && (
                          <>
                            <Link
                              to={`/panel/usuarios/${row._id}/editar`}
                              title="Editar usuario"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <button
                              onClick={() => actions(row._id)}
                              title="Eliminar usuario"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
