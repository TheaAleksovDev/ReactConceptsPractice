import { createContext, useEffect, useState } from "react";

interface FormDisabledContextType {
  isDisabled: boolean | undefined;
  toggleDisabled: () => void;
}

export const FormDisabledContext = createContext<FormDisabledContextType>({
  isDisabled: false,
  toggleDisabled: () => {},
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
        toggleDisabled: () => {
          setIsDisabled((prev) => !prev);
        },
      }}
    >
      {children}
    </FormDisabledContext.Provider>
  );
};
