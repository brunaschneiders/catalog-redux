import { IState } from "./../../index";
import { all, select, takeLatest, call, put } from "redux-saga/effects";
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from "./actions";
import { AxiosResponse } from "axios";
import api from "../../../services/api";
import { ActionTypes } from "./types";

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  //select é usado para buscar informações de dentro do estado
  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find(item => item.product.id === product.id)?.quantity ??
      0
    );
  });

  // 1º parâmetro: função assíncrona a ser executada
  // 2º parâmetro: parâmetros que são recebidos pela função assíncrona chamada no 1º parâmetro
  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }

  console.log(currentQuantity);
}

export default all([
  //takeLatest pega apeenas a última ação do usuário. Se uma requisição
  //está sendo feita e o user clica de novo no botão, ele pegará sempre a última ação do usuário.
  //1º parâmetro: action que quando chamada deverá ser interceptada
  //2º parâmetro: função que deve ser chamada quando a action for disparada
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
