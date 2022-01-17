import { all } from "redux-saga/effects";

import cart from "./cart/sagas";

// o "*" é transformado em async
export default function* rootSaga() {
  // o "yield" é transformado em await
  //@ts-ignore
  return yield all([cart]);
}
