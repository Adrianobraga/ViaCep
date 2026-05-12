import ContextoProvider from "../Context/Context";
import Header from "../Header/Header";
import Corpo from "../Corpo/Corpo";
import Api from "../API/Api";
import Modal from "../Modal/Modal";
import Apicep from "../API/Apicep";
import ApiCidade from "../API/ApiCidades";
import ModalInicial from "../Modal/ModalInicial";
import ModalFalha from "../Modal/ModalFalha";

function App() {
  return (
    <>
      <ContextoProvider>
        <ModalInicial> </ModalInicial>
        <Api></Api>
        <Apicep></Apicep>
        <ApiCidade></ApiCidade>
        <ModalFalha></ModalFalha>
        <Header></Header>
        <Modal></Modal>
        <Corpo></Corpo>
      </ContextoProvider>
    </>
  );
}

export default App;
