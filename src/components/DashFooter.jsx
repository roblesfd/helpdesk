import {
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const DashFooter = () => {
  return (
    <footer className="bg-primary-500 text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex justify-center mt-6 space-x-4 text-3xl">
            <Link to="/">
              <FontAwesomeIcon icon={faGithub} />
            </Link>
            <Link to="/">
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
            <Link to="/">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
          </div>
        </div>
        <div className="text-center mb-4 md:mb-0 space-y-4">
          <p className="text-sm">
            © 2024 Helpdesk. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DashFooter;
