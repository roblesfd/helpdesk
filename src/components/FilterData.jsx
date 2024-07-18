import { useEffect, useState } from "react";
import { useGetUsersQuery } from "../features/users/usersApiSlice";
import TicketList from "../features/tickets/TicketList";

const busquedaObject = {
  title: "",
  priority: "",
  status: "",
  createdBy: "",
  assignedTo: "",
  date: "",
};

const priorities = {
  Alta: "alta",
  Media: "media",
  Baja: "baja",
};

const statusObject = {
  Abierto: "abierto",
  "En progreso": "en progreso",
  Cerrado: "cerrado",
};

const FilterInput = ({ ticketData }) => {
  const [datosBusqueda, setDatosBusqueda] = useState({ ...busquedaObject });
  const [filteredTickets, setFilteredTickets] = useState([]);

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  let selectUsersOptions;
  let content;
  let filtered;

  useEffect(() => {
    setFilteredTickets([...ticketData]);
  }, [isSuccess]);

  if (isLoading) content = <p className="my-6">Cargando...</p>;
  if (isError) {
    content = <p className="my-6">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { entities } = users;
    selectUsersOptions = Object.values(entities).map((user, key) => (
      <option key={key} value={user._id}>
        {user.username}
      </option>
    ));
    content = <TicketList tickets={filteredTickets} />;
  }

  const filterTitle = (ticket) => {
    if (datosBusqueda["title"]) {
      return ticket["title"].includes(datosBusqueda["title"]);
    }
    return ticket;
  };

  const filterStatus = (ticket) => {
    if (datosBusqueda["status"]) {
      return Object.values(ticket).includes(datosBusqueda["status"]);
    }
    return ticket;
  };

  const filterPriority = (ticket) => {
    if (datosBusqueda["priority"]) {
      return Object.values(ticket).includes(datosBusqueda["priority"]);
    }
    return ticket;
  };

  const filterCreatedBy = (ticket) => {
    if (datosBusqueda["createdBy"]) {
      return ticket.createdBy._id.includes(datosBusqueda["createdBy"]);
    }
    return ticket;
  };

  const filterAssignedTo = (ticket) => {
    if (datosBusqueda["assignedTo"]) {
      return ticket.assignedTo._id.includes(datosBusqueda["assignedTo"]);
    }
    return ticket;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosBusqueda({
      ...datosBusqueda,
      [name]: value,
    });
  };

  const applyFilters = () => {
    filtered = ticketData
      .filter(filterTitle)
      .filter(filterStatus)
      .filter(filterPriority)
      .filter(filterCreatedBy)
      .filter(filterAssignedTo);
    setFilteredTickets(filtered);
  };

  return (
    <div className="p-1 md:p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={datosBusqueda.title}
          onBlur={handleInputChange}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-primary-970 dark:text-primary-50 dark:placeholder-primary-50"
        />
        <select
          name="priority"
          value={datosBusqueda.priority}
          onBlur={handleInputChange}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-primary-970 dark:text-primary-50"
        >
          <option value="">Prioridad</option>
          {Object.entries(priorities).map((priority, key) => (
            <option key={key} value={priority[1]}>
              {priority[0]}
            </option>
          ))}
        </select>
        <select
          name="status"
          value={datosBusqueda.status}
          onBlur={handleInputChange}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-primary-970 dark:text-primary-50"
        >
          <option value="">Estado</option>
          {Object.entries(statusObject).map((status, key) => (
            <option key={key} value={status[1]}>
              {status[0]}
            </option>
          ))}
        </select>
        <select
          name="createdBy"
          value={datosBusqueda.createdBy}
          onBlur={handleInputChange}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-primary-970 dark:text-primary-50"
        >
          <option value="">Creado por</option>
          {selectUsersOptions}
        </select>
        <select
          name="assignedTo"
          value={datosBusqueda.assignedTo}
          onBlur={handleInputChange}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-primary-970 dark:text-primary-50"
        >
          <option value="">Asignado a</option>
          {selectUsersOptions}
        </select>
        <input
          type="date"
          name="date"
          value={datosBusqueda.date}
          onBlur={handleInputChange}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-primary-970 dark:text-primary-50"
        />
      </div>
      <button
        onClick={applyFilters}
        className="inline-block px-4 py-2 mt-4 bg-secondary-500 text-white rounded-md hover:bg-secondary-600"
      >
        Buscar
      </button>
      <div className="mt-6">{content}</div>
    </div>
  );
};

export default FilterInput;
