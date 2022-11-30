import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";



const rootReducer = combineReducers({

  })

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: rootReducer,
});

export default store;
