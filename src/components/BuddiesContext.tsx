import React, { createContext, useEffect, useState } from "react";
import { Buddy } from "./WorkBuddies/BuddyInterface";

interface BuddiesContextType {
  contextData: Buddy[] | undefined;
  setData: (data: Buddy[]) => void;
}

export const BuddiesContext = createContext<BuddiesContextType>({
  contextData: [],
  setData: (data: Buddy[]) => {},
});

export const BuddiesContextProvider = ({ children }: any) => {
  const [contextData, setContextData] = useState<Buddy[]>();

  const setData = (data: Buddy[]) => {
    setContextData(data);
  };

  useEffect(() => {
    console.log(contextData);
  }, [contextData]);

  return (
    <BuddiesContext.Provider value={{ contextData, setData }}>
      {children}
    </BuddiesContext.Provider>
  );
};
