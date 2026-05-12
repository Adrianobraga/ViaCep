import axios from "axios";
import { useEffect, useContext } from "react";
import { Contexto } from "../Context/Context";
function Apicep() {
  const { mudarCep, setResultsCep } = useContext(Contexto);

  const buscaCep = (nome) => {
    axios
      .get(`//viacep.com.br/ws/${nome}/json/ `)
      .then((res) => {
        setResultsCep(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    buscaCep(mudarCep);
  }, [mudarCep]);

  return ;
}

export default Apicep;
