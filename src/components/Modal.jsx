import { useState } from "react";

const Modal = ({ content }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleContainerClick = (e) => {
    // Verifica si el click no se hizo desde el ModalContent
    if (e.currentTarget === e.target) {
      handleModalClose();
    }
  };

  return (
    <>
      <button
        className="bg-blue-300 text-gray-900 px-4 py-2 rounded"
        onClick={handleModalOpen}
      >
        Abrir modal
      </button>
      {modalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 transition duration-300 ease-in-out"
          onClick={handleContainerClick}
        >
          <div className="bg-white w-96 min-h-48 p-8 rounded shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Titulo del Modal</h2>
            {content}
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
              onClick={handleModalClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
