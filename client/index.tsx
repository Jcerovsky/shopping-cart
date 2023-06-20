import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { AppContextProvider } from "./AppContext";

if (typeof window !== "undefined") {
  ReactDOM.createRoot(
    window.document.querySelector("#client") as HTMLDivElement
  ).render(
    <AppContextProvider>
      <App />
    </AppContextProvider>)

}

export default <div id="client" />;
