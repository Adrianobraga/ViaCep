import { useContext } from "react";
import { Contexto } from "../Context/Context";

const Modal = () => {
  const { isOpen, corpoEscolha, cep, setOpenModal, setCorpoEscolha } =
    useContext(Contexto);
    
  if (corpoEscolha[0] && isOpen) {
    return (
      <>
        <div className="fixed inset-0 z-[1000] bg-black bg-opacity-70 flex justify-center items-center">
          <div className="relative bg-gray-700 rounded-xl shadow-xl w-full max-w-[90vw] max-h-[90vh] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] p-6 text-white overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Informações</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {corpoEscolha.map((sobre, index) => (
                <div
                  key={index}
                  className="bg-gray-800 border border-gray-600 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <h5 className="text-lg font-semibold mb-4 text-blue-400">
                    {sobre.logradouro || "Endereço Desconhecido"}
                  </h5>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-300">
                    <li>CEP: {sobre.cep}</li>
                    <li>Complemento: {sobre.complemento}</li>
                    <li>Bairro: {sobre.bairro}</li>
                    <li>Localidade: {sobre.localidade}</li>
                    <li>UF: {sobre.uf}</li>
                    <li>Estado: {sobre.estado}</li>
                    <li>Região: {sobre.regiao}</li>
                    <li>IBGE: {sobre.ibge}</li>
                    <li>GIA: {sobre.gia}</li>
                    <li>DDD: {sobre.ddd}</li>
                    <li>SIAFI: {sobre.siafi}</li>
                  </ul>
                  <button
                    className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                    onClick={() => {
                      cep(sobre.cep);
                      setCorpoEscolha();
                      setOpenModal(false);
                    }}
                  >
                    Escolha
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default Modal;
