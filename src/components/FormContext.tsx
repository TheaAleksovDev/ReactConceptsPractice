import { createContext, useEffect, useState } from "react";

interface FormDisabledContextType {
  isDisabled: boolean | undefined;
  setDisabled: () => void;
}

export const FormDisabledContext = createContext<FormDisabledContextType>({
  isDisabled: false,
  setDisabled: () => {},
});

export const FormContextDisabledProvider = ({ children }: any) => {
  const [isDisabled, setIsDisabled] = useState<boolean>();

  useEffect(() => {
    console.log(isDisabled);
  }, [isDisabled]);

  return (
    <FormDisabledContext.Provider
      value={{
        isDisabled,
        setDisabled: ()=>{setIsDisabled((prev) => !prev)},
      }}
    >
      {children}
    </FormDisabledContext.Provider>
  );
};
