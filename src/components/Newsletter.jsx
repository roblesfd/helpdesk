import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Gracias por suscribirte con el email: ${email}!`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Suscríbete a nuestro Newsletter
      </h2>
      <p className="text-gray-700 mb-6 text-center">
        Recibe las últimas noticias y actualizaciones directamente en tu bandeja
        de entrada.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Introduce tu email"
          className="px-4 py-2 mb-4 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Suscribirse
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
