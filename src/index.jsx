import React from "react";
import ReactDOM from "react-dom/client";
import GeneralContextProvider from "./context/generalContext";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GeneralContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </GeneralContextProvider>
  </React.StrictMode>
);
