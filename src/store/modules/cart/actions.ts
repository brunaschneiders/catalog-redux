import { IProduct, ActionTypes } from "./types";

export function addProductToCartRequest(product: IProduct) {
  return {
    //string que identifica a ação
    type: ActionTypes.addProductToCartRequest,
    //qualquer informação adicional necessária para adicionar um produto ao carrinho,
    //isto é, parâmetros recebidos.
    payload: {
      product,
    },
  };
}
export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartSuccess,
    payload: {
      product,
    },
  };
}
export function addProductToCartFailure(productId: number) {
  return {
    type: ActionTypes.addProductToCartFailure,
    payload: {
      productId,
    },
  };
}
