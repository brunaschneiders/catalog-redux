import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { ICartState } from "./modules/cart/types";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

//função principal que é chamada uma única vez dentro da aplicação
//responsável por criar a store, onde todas as informações da aplicação serão disponibilizadas.
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
