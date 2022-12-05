import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import  generalSlice  from "./reducers/generalReducer";
import  productSlice  from "./reducers/productsReducer";



const rootReducer = combineReducers({
  general: generalSlice,
  products: productSlice
  })

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: rootReducer,
});

export default store;
