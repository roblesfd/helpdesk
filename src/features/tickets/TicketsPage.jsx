import HeaderContent from "../../components/HeaderContent";
import { Link } from "react-router-dom";
import { useGetTicketsQuery } from "./ticketsApiSlice";
import FilterInput from "../../components/FilterData";
import { useEffect, useState } from "react";

const TicketsPage = () => {
  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTicketsQuery("ticketsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [ticketList, setTicketList] = useState([]);

  let filterContent;
  let content;
  let entities = {};

  if (isLoading) content = <p>Cargando...</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    entities = tickets.entities;
    filterContent = <FilterInput ticketData={ticketList} />;
  }

  useEffect(() => {
    setTicketList(Object.values(entities));
  }, [isSuccess]);

  return (
    <>
      {/* header */}
      <div className="flex justify-between items-center">
        <HeaderContent
          title="Tickets"
          description="Descripcion sobre tickets"
        />
        <div>
          <Link
            to="/panel/tickets/nuevo"
            className="inline-block px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transform transition-transform duration-300 ease-in-out hover:-translate-y-1"
          >
            + Nuevo
          </Link>
        </div>
      </div>
      <section>{filterContent}</section>
    </>
  );
};

export default TicketsPage;
