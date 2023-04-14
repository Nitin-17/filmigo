/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

import App from "./components/App";
import store from "./app/store";
import "./index.css";
import ToggleColorModeProvide from "./utils/ToggleColorMode";

ReactDOM.render(
  <Provider store={store}>
    <ToggleColorModeProvide>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvide>
  </Provider>,
  document.getElementById("root")
);
