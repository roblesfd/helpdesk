import { Link, useLocation, useParams } from "react-router-dom";
import Box from "../../components/Box";

const Notification = ({ notification }) => {
  return (
    <Box>
      <div className="grid grid-cols-5 ">
        <div className="col-span-4 text-sm space-y-2">
          <div className="flex justify-start items-center gap-3">
            <h2 className="font-bold text-md">{notification.recipient}</h2>
            <span className="text-xs">{notification.type}</span>
          </div>
          <p>{notification.content}</p>
        </div>
        <div className="col-span-1 flex justify-end items-start text-xs">
          {notification.createdAt}
        </div>
      </div>
    </Box>
  );
};

export default Notification;
