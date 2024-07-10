"use client";

import React, { createContext,useContext, SetStateAction, Dispatch } from "react";
import { Mail } from "~/types";

interface ContextProps {
    mailContext: Mail[] | null;
    setMailContext: (value: SetStateAction<Mail[] | null>) => void;
  }

const GlobalContext = createContext<ContextProps | null>({
    mailContext: null,
    setMailContext: () => {},
}); 

const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
      throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
  };
export { GlobalContext, useGlobalContext }

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    const [mailContext, setMailContext] = React.useState<Mail[] | null>(null);
    return (
      <GlobalContext.Provider value={{ mailContext, setMailContext }}>
        {children}
      </GlobalContext.Provider>
    );
  }