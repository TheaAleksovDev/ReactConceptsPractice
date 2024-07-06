import { createContext, useEffect, useState } from "react";
import { Buddy } from "./WorkBuddies/BuddyInterface";

interface BuddiesContextType {
  contextData: Buddy[] | undefined;
  setData: (data: Buddy[]) => void;
}

export const BuddiesContext = createContext<BuddiesContextType>({
  contextData: [],
  setData: () => {},
});

export const BuddiesContextProvider = ({ children }: any) => {
  const [contextData, setContextData] = useState<Buddy[]>();

  useEffect(() => {
    console.log(contextData);
  }, [contextData]);

  return (
    <BuddiesContext.Provider value={{ contextData, setData: setContextData }}>
      {children}
    </BuddiesContext.Provider>
  );
};
