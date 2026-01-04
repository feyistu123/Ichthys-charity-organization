import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { DonationProvider } from "./context/DonationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <UserProvider>
        <DonationProvider>
          <App />
        </DonationProvider>
      </UserProvider>
    </DataProvider>
  </StrictMode>
);
