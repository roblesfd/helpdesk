import React, { useState } from "react";
import {
  faHome,
  faUser,
  faChevronLeft,
  faChevronRight,
  faList,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex h-auto ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-300 bg-primary-800`}
    >
      <div className="flex flex-col w-full">
        <button
          className="text-white p-4 focus:outline-none hover:bg-primary-700  focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
          )}
        </button>
        <div className="mt-4 px-2">
          <ul className="space-y-2 text-white">
            <li>
              <Link
                to="/panel"
                className={`flex items-center ${
                  isOpen ? "justify-start space-x-4" : "justify-center"
                }  p-2 hover:bg-primary-700 rounded-md `}
              >
                <FontAwesomeIcon icon={faHome} className="w-4 " />
                {isOpen && <span className="ml-3">Inicio</span>}
              </Link>
            </li>
            <li>
              <Link
                to="tickets"
                className={`flex items-center ${
                  isOpen ? "justify-start space-x-4" : "justify-center"
                }  p-2 hover:bg-primary-700 rounded-md `}
              >
                <FontAwesomeIcon icon={faList} className="w-4" />
                {isOpen && <span className="ml-3">Tickets</span>}
              </Link>
            </li>
            <li>
              <Link
                to="usuarios"
                className={`flex items-center ${
                  isOpen ? "justify-start space-x-4" : "justify-center"
                }  p-2 hover:bg-primary-700 rounded-md `}
              >
                <FontAwesomeIcon icon={faUser} className="w-4" />
                {isOpen && <span className="ml-3">Usuarios</span>}
              </Link>
            </li>
            <li>
              <Link
                to="base-de-conocimiento"
                className={`flex items-center ${
                  isOpen ? "justify-start space-x-4" : "justify-center"
                }  p-2 hover:bg-primary-700 rounded-md `}
              >
                <FontAwesomeIcon icon={faNewspaper} className="w-4" />
                {isOpen && <span className="ml-3">Base de conocimiento</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
