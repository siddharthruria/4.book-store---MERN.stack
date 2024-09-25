import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <SnackbarProvider>
      <App />
      </SnackbarProvider>
    </Router>
  </React.StrictMode>
);
