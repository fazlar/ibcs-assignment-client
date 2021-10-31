import { useState } from "react";
import { createContext } from "react";

export const EmpContext = createContext();

export const EmpProvider = (props) => {
    const [emp, setEmp] = useState({});
    return (
        <EmpContext.Provider value={[emp, setEmp]}>
            {props.children}
        </EmpContext.Provider>
    )
}