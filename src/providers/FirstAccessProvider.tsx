import { createContext, useContext, ReactNode, useState } from "react";

import session from "config/session";

type FirstAccessContextType = {
  isFirstAccess: boolean;
  setFirstAccess: (value: boolean) => void;
};

const FirstAccessContext = createContext<FirstAccessContextType | undefined>(
  undefined
);

export const FirstAccessProvider = ({ children }: { children: ReactNode }) => {
  const [isFirstAccess, setFirstAccess] = useState(session.isFirstAccess());

  return (
    <FirstAccessContext.Provider value={{ isFirstAccess, setFirstAccess }}>
      {children}
    </FirstAccessContext.Provider>
  );
};

export const useFirstAccess = () => {
  const context = useContext(FirstAccessContext);

  if (context === undefined) {
    throw new Error("useFirstAccess must be used within a FirstAccessProvider");
  }

  return context;
};
