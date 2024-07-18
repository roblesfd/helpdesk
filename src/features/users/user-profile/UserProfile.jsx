import React, { useState } from "react";
import TabsContainer from "../../../components/Tabs/TabsContainer";
import Tab from "../../../components/Tabs/Tab";
import {
  UserProfileTickets,
  UserProfileInfo,
  UserProfileSettings,
} from "./UserTabs";
import { useGetAUserQuery } from "../usersApiSlice";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const UserProfile = () => {
  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const {
    data: userInfo,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAUserQuery(id);
  const { username } = useAuth();
  let content;

  if (isLoading) {
    content = <p className="my-8">Cargando...</p>;
  }

  if (isSuccess) {
    content = (
      <>
        {username === userInfo.username ? (
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
            title="Historial de Tickets Resueltos"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            data="tickets"
          />
          {username === userInfo.username && (
            <Tab
              title="Configuración de Cuenta"
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              data="settings"
            />
          )}
        </TabsContainer>
        <div className="mt-4">
          {activeTab === "info" && <UserProfileInfo userInfo={userInfo} />}
          {activeTab === "tickets" && (
            <UserProfileTickets tickets={resolvedTickets} />
          )}
          {activeTab === "settings" && (
            <UserProfileSettings userInfo={userInfo} />
          )}
        </div>
      </>
    );
  }

  if (isError) {
    content = <p className="my-8 text-red-500">{error?.data?.message}</p>;
  }

  return <div className="container mx-auto p-4">{content}</div>;
};

export default UserProfile;
