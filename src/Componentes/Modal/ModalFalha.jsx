import { useContext } from "react";
import { Contexto } from "../Context/Context";

const ModalFalha = () => {
  const { ModalFalha, setModalFalha } = useContext(Contexto);


  const handleCloseModal = () => {
    setModalFalha(false);  
  };

  if (!ModalFalha) {
    return null; 
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-70 flex justify-center items-center">
      <div className="relative bg-gray-700 rounded-xl shadow-xl w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] p-6 text-white">
        <h1 className="text-center text-2xl">
          Nenhum resultado encontrado. Por favor, tente novamente.
        </h1>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleCloseModal}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFalha;
