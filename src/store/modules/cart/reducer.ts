import { Reducer } from "redux";
import produce from "immer";
import { ActionTypes, ICartState } from "./types";

const INITIAL_STATE: ICartState = { items: [], failedStockCheck: [] };

//o reducer é uma função que retorna os dados contidos dentro do estado.
//state é o estado antes de ocorrer a alteração
//action retorna os dados da action disparada (type e payload)
const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          item => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          //utilizando o immer (produce) fica menos verboso lidar com a imutabilidade do React
          //Com Immer:
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
        //Sem Immer:
        //   return { ...state, items: [...state.items, { product, quantity: 1 }] };
      }
      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);
        break;
      }
      default: {
        return draft;
      }
    }
  });
};
export default cart;
