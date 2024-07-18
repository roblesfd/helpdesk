import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCirclePlus,
  faClose,
  faLightbulb,
  faMoon,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../context/themeContext";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DashHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { id } = useAuth();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/panel/iniciar-sesion");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Cerrando sesión...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <nav className="bg-primary-500">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Boton menu movil */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-50 hover:text-primary-100 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              {!isOpen ? (
                <FontAwesomeIcon icon={faBars} />
              ) : (
                <FontAwesomeIcon icon={faClose} />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center md:justify-between">
            <div className="flex-shrink-0">
              <Link to="/panel">
                <h1 className="text-xl text-white font-semibold tracking-widest">
                  Helpdesk
                </h1>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex justify-end space-x-4">
                <Link
                  to="/panel/tickets/nuevo"
                  title="Nuevo ticket"
                  className="text-white hover:bg-primary-400 px-3 py-2 rounded-full"
                >
                  <FontAwesomeIcon icon={faCirclePlus} />
                </Link>
                <Link
                  to="#"
                  className="text-white hover:bg-primary-400 px-3 py-2 rounded-full"
                >
                  <FontAwesomeIcon icon={faBell} />
                </Link>
                <Link
                  to="#"
                  className="text-white hover:bg-primary-400 px-3 py-2 rounded-full"
                  onClick={() => {
                    setDarkTheme(!darkTheme);
                    localStorage.setItem("theme", darkTheme ? "false" : "true");
                  }}
                >
                  <FontAwesomeIcon icon={darkTheme ? faMoon : faLightbulb} />
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleUserDropdown}
                    className="text-white hover:bg-primary-400 px-3 py-2 rounded-full focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      <Link
                        to={`/panel/usuarios/${id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Perfil
                      </Link>
                      <Link
                        to={`/panel/usuarios/${id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Configuración
                      </Link>
                      <button
                        onClick={sendLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/panel/tickets/nuevo"
            title="Nuevo ticket"
            className="text-white hover:bg-primary-400 px-3 py-2 rounded-md text-base font-medium flex justify-center items-center gap-4"
          >
            <span>Ticket nuevo</span>
            <FontAwesomeIcon icon={faCirclePlus} />
          </Link>
          <Link
            to="#"
            className="text-white hover:bg-primary-400  px-3 py-2 rounded-md text-base font-medium flex justify-center items-center gap-4"
          >
            <span>Notificaciones</span>
            <FontAwesomeIcon icon={faBell} />
          </Link>

          <Link
            to={`/panel/usuarios/${id}`}
            className="text-white  hover:bg-primary-400  px-3 py-2 rounded-md text-base font-medium flex justify-center items-center gap-4"
          >
            <span>Perfil</span>
          </Link>
          <Link
            to="#"
            className="text-white hover:bg-primary-400  px-3 py-2 rounded-md text-base font-medium flex justify-center items-center gap-4"
            onClick={() => {
              setDarkTheme(!darkTheme);
              localStorage.setItem("theme", darkTheme ? "false" : "true");
            }}
          >
            Modo oscuro
            <FontAwesomeIcon icon={darkTheme ? faMoon : faLightbulb} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashHeader;
