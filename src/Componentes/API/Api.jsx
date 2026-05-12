import axios from "axios";
import { useEffect, useContext } from "react";
import { Contexto } from "../Context/Context";

function Api() {
  const { setResults, pesquisaNome, pesquisacidade, pesquisaUf } =
    useContext(Contexto);

  const busca = (nome, uf, estado) => {
    axios
      .get(`//viacep.com.br/ws/${uf}/${estado}/${nome}/json/`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (pesquisaNome && pesquisaUf && pesquisacidade) {
      busca(pesquisaNome, pesquisaUf, pesquisacidade);
    }
  }, [pesquisaNome, pesquisaUf, pesquisacidade]);

  return null;
}

export default Api;
