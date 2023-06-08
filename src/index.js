import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Context } from "./Context";
import { AuthContext } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <AuthContext>
    <Context>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context>
  </AuthContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
