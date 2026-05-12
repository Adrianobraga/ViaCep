import { useContext } from "react";
import { Contexto } from "../Context/Context";

const ModalInicial = () => {
  const { latitude } =
    useContext(Contexto);
    
  if (!latitude) {
    return (
      <>
        <div className="fixed inset-0 z-[1000] bg-black bg-opacity-70 flex justify-center items-center">
          <div className="relative bg-gray-700 rounded-xl shadow-xl w-full max-w-[90vw] max-h-[200vh] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] p-6 text-white overflow-y-auto">
            <h1 className="text-center text-2xl">Por favor, permita o acesso à sua localização.</h1>
          </div>
          </div>
      </>
    );
  }
  return null;
};

export default ModalInicial;
