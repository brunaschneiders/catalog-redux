import { Provider } from "react-redux";
import Cart from "./components/Cart";

import Catalog from "./components/Catalog";

import store from "./store";

function App() {
  return (
    //com a utilização do Provider, todos os componentes que estiverem
    //dentro dele ganham acesso ao estado global
    <Provider store={store}>
      <Catalog />
      <Cart />
    </Provider>
  );
}

export default App;
