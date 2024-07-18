import React from "react";
import HeaderContent from "../../components/HeaderContent";
import Notification from "./Notification";

const notificationData = [
  {
    recipient: "Fernando Robles",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dignissimos tenetur fuga blanditiis mollitia doloremque.",
    type: "ticket_update",
    createdAt: "12 Feb 2024",
  },
  {
    recipient: "Fernando Robles",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dignissimos tenetur fuga blanditiis mollitia doloremque.",
    type: "ticket_update",
    createdAt: "12 Feb 2024",
  },
  {
    recipient: "Fernando Robles",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dignissimos tenetur fuga blanditiis mollitia doloremque.",
    type: "ticket_update",
    createdAt: "12 Feb 2024",
  },
];

const NotificationsPage = () => {
  return (
    <>
      {/* header */}
      <HeaderContent
        title="Notificaciones"
        description="Descripcion sobre notificaciones"
      />
      <div className="w-1/2 mx-auto">
        {notificationData.map((notif, key) => (
          <Notification notification={notif} key={key} />
        ))}
      </div>
    </>
  );
};

export default NotificationsPage;
