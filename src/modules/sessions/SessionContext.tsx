import React, { createContext, useContext, useState } from "react";
import { startNewSession, appendRecord, getSession } from "./SessionArchiver";
import type { SessionLog } from "./sessionTypes";

interface SessionContextValue {
  start: () => void;
  append: (action: string, payload?: any) => void;
  session: SessionLog | null;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<SessionLog | null>(null);

  const start = () => {
    const newSession = startNewSession();
    setSession(newSession);
  };

  const append = (action: string, payload?: any) => {
    const timestamp = new Date().toISOString();
    appendRecord({ timestamp, action, payload });
    // Update state to trigger re-render
    setSession(getSession());
  };

  return (
    <SessionContext.Provider value={{ start, append, session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
};
