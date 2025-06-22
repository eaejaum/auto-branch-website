import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { BranchProvider } from "./context/branchContext.jsx";
import { VehicleProvider } from "./context/vehicleContext.jsx";
import { SellHistoryProvider } from "./context/sellHistoryContext.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
    <Toaster position="top-right" richColors duration={2000} />
      <AuthProvider>
        <BranchProvider>
          <VehicleProvider>
            <SellHistoryProvider>
              <App />
            </SellHistoryProvider>
          </VehicleProvider>
        </BranchProvider>
      </AuthProvider>
    </Theme>
  </StrictMode>
);
