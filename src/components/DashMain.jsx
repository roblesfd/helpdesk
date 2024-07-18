import Box from "./Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleHalfStroke,
  faFolderClosed,
  faFolderOpen,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import HeaderContent from "./HeaderContent";
import TicketList from "../features/tickets/TicketList";
import { useGetTicketsQuery } from "../features/tickets/ticketsApiSlice";

const DashMain = () => {
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

  let content;

  if (isLoading) content = <p className="my-6 text-center">Cargando...</p>;

  if (isError)
    content = <p className="my-6 text-center">{error?.data?.message}</p>;

  if (isSuccess) {
    const { entities } = tickets;
    content = (
      <>
        <TicketList tickets={entities} />
        <div className="flex justify-center mt-8">
          <Link
            to="tickets"
            className="inline-block px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transform transition-transform duration-300 ease-in-out hover:-translate-y-1"
          >
            Ver todo
          </Link>
        </div>
      </>
    );
  }

  return (
    <div>
      {/* header */}
      <HeaderContent title="Inicio" description="Panel de administración" />
      {/* seccion cards para tickets */}
      <section className="flex justify-start gap-4 md:justify-between flex-wrap lg:flex-nowrap mb-12 md:mb-0">
        <Box>
          <Link to="#">
            <div className="h-auto w-full md:w-48 p-2 md:p-0">
              <div className="flex justify-between md:items-center">
                <div className="block space-y-4">
                  <FontAwesomeIcon icon={faFolderOpen} className="text-3xl" />
                  <h3>Abiertos</h3>
                </div>
                <div>
                  <span className="text-3xl">12</span>
                </div>
              </div>
            </div>
          </Link>
        </Box>
        <Box>
          <Link to="#">
            <div className="h-auto w-full md:w-48 p-2 md:p-0">
              <div className="flex justify-between md: items-center">
                <div className="block space-y-4">
                  <FontAwesomeIcon
                    icon={faCircleHalfStroke}
                    className="text-3xl"
                  />
                  <h3>En Progreso</h3>
                </div>
                <div>
                  <span className="text-3xl">12</span>
                </div>
              </div>
            </div>
          </Link>
        </Box>{" "}
        <Box>
          <Link to="#">
            <div className="h-auto w-full md:w-48 p-2 md:p-0">
              <div className="flex justify-between md: items-center">
                <div className="block space-y-4">
                  <FontAwesomeIcon icon={faFolderClosed} className="text-3xl" />
                  <h3>Cerrados</h3>
                </div>
                <div>
                  <span className="text-3xl">12</span>
                </div>
              </div>
            </div>
          </Link>
        </Box>{" "}
        <Box>
          <Link to="#">
            <div className="h-auto w-full md:w-48 p-2 md:p-0">
              <div className="flex justify-between md: items-center">
                <div className="block space-y-4">
                  <FontAwesomeIcon icon={faListCheck} className="text-3xl" />
                  <h3>Total resueltos</h3>
                </div>
                <div>
                  <span className="text-3xl">12</span>
                </div>
              </div>
            </div>
          </Link>
        </Box>
      </section>
      {/* seccion tickets asignados*/}
      <section className="my-4 md:my-12">
        <h2 className="text-xl font-bold">Tickets de hoy</h2>
        {content}
        <div className="flex justify-center mt-6"></div>
      </section>
    </div>
  );
};

export default DashMain;
