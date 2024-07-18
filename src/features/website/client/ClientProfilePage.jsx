import { useEffect, useState } from "react";
import Tab from "../../../components/Tabs/Tab";
import TabsContainer from "../../../components/Tabs/TabsContainer";
import {
  ClientProfileInfo,
  ClientProfileSettings,
  ClientProfileTickets,
} from "./ClientTabsContent";
import ClientNavBar from "../ClientNavBar";
import ClientFooter from "../ClientFooter";
import useAuth from "../../../hooks/useAuth";
import { useGetAUserQuery } from "../../users/usersApiSlice";
import { useGetTicketsQuery } from "../../tickets/ticketsApiSlice";

const ClientProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState("info");

  const { id, username } = useAuth();

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAUserQuery(id);

  const {
    data: ticketData,
    isLoading: isLoadingTickets,
    isSuccess: isSuccessTickets,
    isError: isErrorTickets,
    error: isLoadingError,
  } = useGetTicketsQuery();

  let content;

  useEffect(() => {
    if (isSuccessTickets) {
      const { entities } = ticketData;

      const userTickets = Object.values(entities).filter(
        (ticket) => ticket.createdBy._id === id
      );

      setTickets(userTickets);
    }
    if (isSuccess) {
      setUserInfo(user);
    }
  }, [isSuccess, isSuccessTickets]);

  if (isLoading) {
    content = <p className="my-8">Cargando...</p>;
  }

  if (isSuccess) {
    content = (
      <>
        {username === user.username ? (
          <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
        )}
        <TabsContainer>
          <Tab
            title="Información personal"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            data="info"
          />
          <Tab
            title="Mis Tickets"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            data="tickets"
          />
          {username === user.username && (
            <Tab
              title="Configuración de Cuenta"
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              data="settings"
            />
          )}
        </TabsContainer>
        <div className="mt-4">
          {activeTab === "info" && <ClientProfileInfo userInfo={user} />}
          {activeTab === "tickets" && (
            <ClientProfileTickets tickets={tickets} />
          )}
          {activeTab === "settings" && (
            <ClientProfileSettings userInfo={user} />
          )}
        </div>
      </>
    );
  }

  if (isError) {
    content = <p className="my-8 text-red-500">{error?.data?.message}</p>;
  }

  const handleSubmit = () => {
    console.log("submit!!");
  };

  return (
    <div className="bg-indigo-50">
      <ClientNavBar />
      <div className="grid grid-cols-10 gap-4">
        {/* CONTENIDO DEL BLOG */}
        <main className="col-span-8  min-h-screen container mx-auto px-3 md:px-8 py-3 md:py-10">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
            {content}
          </div>
        </main>
      </div>
      <ClientFooter />
    </div>
  );
};

export default ClientProfilePage;
