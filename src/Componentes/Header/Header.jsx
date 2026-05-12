import { useContext, useState, useEffect } from "react";
import { Contexto } from "../Context/Context";

function Header() {
  const { input, cidade, uf, handleSubmit, setOpenModal, Ufs, latitude, DadosCidades } =
    useContext(Contexto);
  const [ufSelecionado, setUfSelecionado] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

  // Atualiza o UF selecionado
  const handleSelectUfChange = (event) => {
    const ufValue = event.target.value;
    setUfSelecionado(ufValue);
    setCidadeSelecionada(''); // Limpa a cidade selecionada ao mudar o UF
  };

  // Atualiza a cidade selecionada
  const handleSelectCidadeChange = (event) => {
    setCidadeSelecionada(event.target.value);
  };

  // Filtra as cidades quando o UF mudar
  useEffect(() => {
  if (ufSelecionado && DadosCidades) {
    const cidadesNoUF = DadosCidades.filter(
      (item) => item?.municipio?.microrregiao?.mesorregiao?.UF?.sigla === ufSelecionado
    );
    setCidadesFiltradas(cidadesNoUF);
  } else {
    setCidadesFiltradas([]);
  }
}, [ufSelecionado, DadosCidades]);
  return (
    <>
      <form onSubmit={handleSubmit} className="flex justify-center pt-10">
        <div className="bg-slate-400 p-6 rounded-lg shadow-lg w-full max-w-2xl">
          {/* Select para UF */}
          <div className="mb-4">
            <select
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-3 pl-4 pr-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
              name="input2"
              ref={uf}
              required
              onChange={handleSelectUfChange}
              value={ufSelecionado}
            >
              <option value="" hidden>
                Selecione um estado
              </option>
              {Ufs.map((UFs) => (
                <option value={UFs} key={UFs}>
                  {UFs}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-3 pl-4 pr-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
              placeholder="Nome da cidade"
              type="text"
              name="input1"
              required
              disabled={!ufSelecionado} 
              value={cidadeSelecionada} 
              onChange={handleSelectCidadeChange} 
              ref={cidade}
            >
              <option value="" hidden>
                Selecione uma cidade
              </option>
              {cidadesFiltradas.length > 0 ? (
                cidadesFiltradas.map((cidade, index) => (
                  <option key={index} value={cidade.nome}>
                    {cidade.nome}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhuma cidade disponível
                </option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-3 pl-4 pr-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
              placeholder="Nome da rua"
              type="text"
              name="input3"
              ref={input}
              required
              disabled={!ufSelecionado} 
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-4 py-3"
            onClick={() => {
              if (
                input.current.value &&
                uf.current.value &&
                cidadeSelecionada
              ) {
                setOpenModal(true);
              }
            }}
          >
            Pesquisar
          </button>
        </div>
      </form>
    </>
  );
}

export default Header;
