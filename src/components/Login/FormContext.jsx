import { createContext, useRef } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const formRef = useRef(null);

    return (
        <FormContext.Provider value={formRef}>
            {children}
        </FormContext.Provider>
    );
} 