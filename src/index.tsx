import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/state/store";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./app/providers/AuthProvider";
import { ThemeProvider } from "@mui/material";
import theme from "./app/theme";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
