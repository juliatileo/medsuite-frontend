import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import GlobalStyle from "./globalStyles.ts";
import Router from "./routes.tsx";
import Theme from "./Theme.tsx";
import { FirstAccessProvider } from "providers/FirstAccessProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <FirstAccessProvider>
        <Router />
      </FirstAccessProvider>
      <GlobalStyle />
    </Theme>
  </StrictMode>
);
