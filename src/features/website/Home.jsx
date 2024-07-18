import React from "react";
import Hero from "../../components/Hero";
import Newsletter from "../../components/Newsletter";
import Slider from "../../components/Slider";
import ClientNavBar from "./ClientNavBar";
import ClientFooter from "./ClientFooter";

const productData = [
  {
    id: 1,
    name: "Laptop X1",
    description: "Una laptop potente y versátil.",
    image: "https://via.placeholder.com/150",
    price: "$999",
  },
  {
    id: 2,
    name: "PC Gamer G5",
    description: "La mejor experiencia para juegos.",
    image: "https://via.placeholder.com/150",
    price: "$1299",
  },
  {
    id: 3,
    name: "Monitor UltraWide",
    description: "Pantalla panorámica de alta resolución.",
    image: "https://via.placeholder.com/150",
    price: "$399",
  },
  {
    id: 4,
    name: "Teclado Mecánico",
    description: "Teclado con retroiluminación RGB.",
    image: "https://via.placeholder.com/150",
    price: "$99",
  },
  {
    id: 5,
    name: "Mouse Inalámbrico",
    description: "Precisión y comodidad sin cables.",
    image: "https://via.placeholder.com/150",
    price: "$49",
  },
];

const Home = () => {
  return (
    <div className="text-indigo-950">
      {/* NAVBAR */}
      <ClientNavBar />
      {/* CONTENIDO PRINCIPAL */}
      <div className="min-h-screen bg-indigo-50">
        <Hero />
        <main className="container mx-auto px-4 py-8">
          {/* HERO */}
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Bienvenido a nuestra marca
            </h2>
            <p>
              Ofrecemos las mejores computadoras y servicios para todas tus
              necesidades tecnológicas.
            </p>
          </section>
          {/* FEATURED PRODUCTS */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
            <Slider data={productData} />
          </section>
          {/* PRODUCTOS */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`relative w-full overflow-hidden shadow-md rounded-lg p-8 h-[500px] text-white flex flex-col items-end justify-end bg-[url("assets/laptop.jpg")] bg-right-bottom bg-cover bg-no-repeat`}
              >
                <h3 className="text-4xl font-bold mb-2">Laptops</h3>
                <p className="">Descripción del servicio 1.</p>
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-indigo-900 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-20"></div>
              </div>
              <div
                className={`relative w-full overflow-hidden  shadow-md rounded-lg p-8 h-[500px] text-white flex flex-col items-end justify-end bg-[url("assets/desktop.jpg")] bg-right-bottom bg-cover bg-no-repeat`}
              >
                <h3 className="text-4xl font-bold mb-2">PCs de escritorio</h3>
                <p className="">Descripción del servicio 1.</p>
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-indigo-900 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-20"></div>
              </div>
              <div
                className={`relative full shadow-md rounded-lg p-8 h-[500px] text-white flex flex-col items-end justify-end bg-[url("assets/ssd.jpg")] bg-right-bottom bg-cover bg-no-repeat`}
              >
                <h3 className="text-4xl font-bold mb-2">
                  Componentes de Hardware
                </h3>
                <p className="">Descripción del servicio 1.</p>
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-indigo-900 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-20"></div>
              </div>
              <div
                className={`relative w-full overflow-hidden  shadow-md rounded-lg p-8 h-[500px] text-white flex flex-col items-end justify-end bg-[url("assets/printer.jpg")] bg-right-bottom bg-cover bg-no-repeat`}
              >
                <h3 className="text-4xl font-bold mb-2">Impresoras</h3>
                <p className="">Descripción del servicio 1.</p>
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hiden bg-indigo-900 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-20"></div>
              </div>
            </div>
          </section>
          {/* NEWSLETTER */}
          <Newsletter />
        </main>
        {/* FOOTER */}
        <ClientFooter />
      </div>
    </div>
  );
};

export default Home;
