import Ticket from "./Ticket";
import { useDeleteTicketMutation } from "./ticketsApiSlice";
import toast from "react-hot-toast";

const TicketList = ({ tickets }) => {
  const [ticketDelete, { data: ticket, isLoading, isSuccess, isError, error }] =
    useDeleteTicketMutation("ticket");

  const onDeleteTicketClicked = async (id) => {
    const result = await ticketDelete(id);

    if (result.error) {
      toast.error(result.error.data.message);
    } else {
      toast.success(result.data);
    }
  };

  return (
    <>
      {tickets.length === 0 ? (
        <p>No hay tickets disponibles.</p>
      ) : (
        Object.values(tickets).map((ticket) => (
          <Ticket
            key={ticket._id}
            ticket={ticket}
            actions={onDeleteTicketClicked}
          />
        ))
      )}
    </>
  );
};

export default TicketList;
