import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import Sidebar from "./Sidebar";

const DashLayout = () => {
  const pathName = location.pathname;
  return (
    <>
      {pathName != "/panel/iniciar-sesion" && pathName != "/panel/registro" && (
        <DashHeader />
      )}
      <div className="flex">
        {pathName != "/panel/iniciar-sesion" &&
          pathName != "/panel/registro" && <Sidebar />}
        <main className="min-h-screen w-full overflow-scroll  px-4 md:px-6 xl:px-12 py-6 md:py-10">
          <Outlet />
        </main>
      </div>
      {pathName != "/panel/iniciar-sesion" && pathName != "/panel/registro" && (
        <DashFooter />
      )}
    </>
  );
};

export default DashLayout;
