import React from "react";
import { Link } from "react-router-dom";
import Box from "../../components/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const Ticket = ({ ticket, actions }) => {
  const { isAdmin, username } = useAuth();

  return (
    <Box>
      <div className="flex justify-between items-center mb-2">
        <Link to={`/panel/tickets/${ticket.id}`}>
          <h2 className="text-lg font-bold hover:text-primary-900 dark:hover:text-primary-200">
            {ticket.title}
          </h2>
        </Link>
        <div className="flex gap-4">
          {isAdmin || ticket.createdBy.username === username ? (
            <button title="Eliminar ticket" onClick={() => actions(ticket.id)}>
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 hover:text-red-600"
              />
            </button>
          ) : null}

          <span
            className={`p-1 rounded text-white text-xs font-bold ${
              ticket.priority === "alta"
                ? "bg-red-500"
                : ticket.priority === "media"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {ticket.priority.toUpperCase()}
          </span>
        </div>
      </div>
      <p className="text-gray-700 dark:text-primary-50 mb-4 text-sm">
        {ticket.description}
      </p>
      <div className="flex justify-between items-center text-gray-500 dark:text-primary-50 text-sm">
        <div>
          <p>
            <strong>Estado:</strong>{" "}
            <span
              className={`px-1  rounded text-white text-sm font-semiold ${
                ticket.status === "abierto"
                  ? "bg-yellow-400 text-yellow-800"
                  : ticket.status === "en progreso"
                  ? "bg-blue-300 text-blue-900"
                  : "bg-gray-400 text-gray-900"
              }`}
            >
              {ticket.status}
            </span>
          </p>
          <p>
            <strong>Asignado a:</strong>{" "}
            {ticket.assignedTo ? (
              <Link
                to={`/panel/usuarios/${ticket.assignedTo._id}`}
                className="hover:text-primary-950 dark:hover:text-primary-100"
              >
                {ticket.assignedTo.username}
              </Link>
            ) : (
              <span>No asignado</span>
            )}
          </p>
        </div>
        <div>
          <p>
            <strong>Creado por:</strong>{" "}
            <Link
              to={`/panel/usuarios/${ticket.createdBy._id}`}
              className="hover:text-primary-950 dark:hover:text-primary-100"
            >
              {ticket.createdBy.username}
            </Link>
          </p>
          <p>
            <strong>Creado el:</strong>{" "}
            {new Date(ticket.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Box>
  );
};

export default Ticket;
