import { createContext, useRef, useEffect, useState, useReducer } from "react";

// Criação do Contexto
export const Contexto = createContext({
  pesquisa: "",
  setResults: [],
  input: "",
  handleSubmit: () => {},
  corpoes: [],
  isOpen: false,
  setOpenModal: "",
  cep: "",
  mudarCep: "",
  setResultsCep: [],
  corpo: [],
  latitude: "",
  longitude: "",
  Ufs: [],
  Cidades: [],
  ModalFalha: false,
});

// Função do useReduce
function Fazer(state, action) {
  switch (action.type) {
    case "SetLatitude":
      return { ...state, latitude: action.lat };
    case "SetLongitude":
      return { ...state, longitude: action.long };
    case "setPesquisaNome":
      return { ...state, pesquisaNome: action.value };
    case "setPesquisaCidade":
      return { ...state, pesquisacidade: action.value };
    case "setPesquisaUf":
      return { ...state, pesquisaUf: action.value };
    case "addCorpoEscolha":
      return {
        ...state,
        corpoEscolha: [...state.corpoEscolha, action.novoElemento],
      };
    case "resetSetCorpoEscolha":
      return { ...state, corpoEscolha: action.resetSetCorpoEscolha };
    case "setCorpo":
      return { ...state, corpo: [...state.corpo, action.novoElemento] };
    case "ModalOpem":
      return { ...state, openModal: action.true };
    case "ModalClose":
      return { ...state, openModal: false };
    case "setResults":
      return { ...state, results: action.results };
    case "setCep":
      return { ...state, mudarCep: action.results };
    case "setResultsCep":
      return { ...state, resultsCep: action.results };
    case "Cidades":
      return { ...state, Cidades: action.results };
    case "ModalFalha":
      return { ...state, ModalFalha: action.results };
    default:
      return state;
  }
}

// Valores iniciais do contexto
const initialValue = {
  pesquisacidade: "",
  pesquisaNome: "",
  corpoEscolha: [],
  pesquisaUf: "",
  openModal: false,
  results: [],
  resultsCep: {},
  corpo: [],
  mudarCep: "",
  longitude: "",
  latitude: "",
  Cidades: [],
  ModalFalha: false,
};

// Contexto com Provider
function ContextoProvider({ children }) {
  const [state, dispatch] = useReducer(Fazer, initialValue);

  const input = useRef("");
  const cidade = useRef("");
  const uf = useRef("");

  // Pegando as informações do browser
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      dispatch({ type: "SetLatitude", lat: location.coords.latitude });
      dispatch({ type: "SetLongitude", long: location.coords.longitude });
    });
  }, []);

  // Função que adiciona vários objetos à lista de corpo
  function adicionarElemento(novoElemento) {
    dispatch({ type: "addCorpoEscolha", novoElemento });
  }

  // Função que adiciona novos resultados por CEP ao corpo
  function adicionarElementoCep(novoElemento) {
    dispatch({ type: "setCorpo", novoElemento });
  }

  useEffect(() => {
    // Mostrar a mensagem de falha apenas quando não houver resultados após uma pesquisa
    if (state.pesquisaNome || state.pesquisacidade || state.pesquisaUf) {
      if (state.results.length === 0) {
        dispatch({ type: "ModalFalha", results: true });
      } else {
        dispatch({ type: "ModalFalha", results: false });
      }
    }
  }, [
    state.results,
    state.pesquisaNome,
    state.pesquisacidade,
    state.pesquisaUf,
  ]);

  useEffect(() => {
    if (state.results.length > 0) {
      state.results.forEach((result) => adicionarElemento(result));
    }
  }, [state.results]);

  useEffect(() => {
    if (state.resultsCep.cep) {
      adicionarElementoCep(state.resultsCep);
    }
  }, [state.resultsCep]);

  function handleSubmit(e) {
    e.preventDefault();
    const valorInput = input.current.value;
    const valorUf = uf.current.value;
    const valorCidade = cidade.current.value;

    dispatch({ type: "setPesquisaNome", value: valorInput });
    dispatch({ type: "setPesquisaCidade", value: valorCidade });
    dispatch({ type: "setPesquisaUf", value: valorUf });

    e.target.reset();
  }

  const valores = {
    setResults: (data) => dispatch({ type: "setResults", results: data }),
    setCorpoEscolha: () =>
      dispatch({ type: "resetSetCorpoEscolha", resetSetCorpoEscolha: [] }),
    isOpen: () => dispatch({ type: "ModalOpem", true: true }),
    setOpenModal: () => dispatch({ type: "ModalClose", true: false }),
    handleSubmit: handleSubmit,
    pesquisaNome: state.pesquisaNome,
    pesquisacidade: state.pesquisacidade,
    pesquisaUf: state.pesquisaUf,
    input: input,
    cidade: cidade,
    uf: uf,
    corpoEscolha: state.corpoEscolha,
    cep: (data) => dispatch({ type: "setCep", results: data }),
    mudarCep: state.mudarCep,
    setResultsCep: (data) => dispatch({ type: "setResultsCep", results: data }),
    corpo: state.corpo,
    latitude: state.latitude,
    longitude: state.longitude,
    Ufs: [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ],
    Cidades: (data) => dispatch({ type: "Cidades", results: data }),
    DadosCidades: state.Cidades,
    setModalFalha: (data) => dispatch({ type: "ModalFalha", results: data }),
    ModalFalha: state.ModalFalha,
  };

  return <Contexto.Provider value={valores}>{children}</Contexto.Provider>;
}

export default ContextoProvider;
