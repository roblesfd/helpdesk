import { Link } from "react-router-dom";
import heroImg from "../assets/hero-1.jpg";

const Hero = () => {
  return (
    <header
      className="bg-blue-500 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="bg-black bg-opacity-50 w-full h-full">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-4">Marca de Computadoras</h1>
          <p className="text-lg mb-8 text-center">
            Ofrecemos las mejores computadoras y servicios para todas tus
            necesidades tecnológicas.
          </p>
          <nav className="flex space-x-4">
            <Link
              to="/"
              className="px-4 py-2 shadow-lg bg-indigo-600 text-indigo-50 rounded hover:bg-indigo-700 transition"
            >
              Saber más
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Hero;
