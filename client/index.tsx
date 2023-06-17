import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

if (typeof window !== "undefined") {
  ReactDOM.createRoot(
    window.document.querySelector("#client") as HTMLDivElement
  ).render(<App />);
}

export default <div id="client" />;
