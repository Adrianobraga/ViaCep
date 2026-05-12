import axios from "axios";
import { useEffect, useContext } from "react";
import { Contexto } from "../Context/Context";

function ApiCidade() {
    const {Cidades} = useContext(Contexto)
  const busca = () => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/distritos?orderBy=nome")
      .then((res) => {
        Cidades(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
      busca();
  },[])

  return null;
}

export default ApiCidade;

