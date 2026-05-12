import { useState, useEffect, useContext } from "react";
import { Contexto } from "../Context/Context";

function Corpo() {
  const { corpo, latitude, longitude } = useContext(Contexto);
  const [corpoSalvo, setCorpoSalvo] = useState([]);


  useEffect(() => {
    const dadosNoLocalStorage = localStorage.getItem("corpoData");

    if (dadosNoLocalStorage) {
      setCorpoSalvo(JSON.parse(dadosNoLocalStorage));
    }
  }, []);

 
  useEffect(() => {
    if (corpo.length > 0) {
 
      localStorage.setItem("corpoData", JSON.stringify(corpo));
      setCorpoSalvo(corpo); 
    }
  }, [corpo]); 

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
        {(corpoSalvo.length > 0 ? corpoSalvo : corpo).map((sobre, index) => {
          return (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {sobre.logradouro}
                  </h5>
                </a>
                <ul className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <li>CEP: {sobre.cep}</li>
                  <li>Logradouro: {sobre.logradouro}</li>
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
                <a
                  href={`https://www.google.com.br/maps/dir/${latitude},${longitude}/${sobre.logradouro}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  target="_blank" 
                >
                  Trajeto
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Corpo;
