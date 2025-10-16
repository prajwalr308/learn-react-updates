import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// StrictMode stays enabled so we can surface double-invocation behavior that
// React 18+ uses to help find impure render logic.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
