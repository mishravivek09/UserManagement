import { createContext, useState } from "react";

export const LoginContext=createContext();

export const LoginContextProvider=({children})=>{
    const[token,setToken]=useState(JSON.parse(localStorage.getItem("token"))||null);
    const handleSetToken=(value)=>{
        setToken(value);
    }
    return <LoginContext.Provider value={{token,handleSetToken}}>{children}</LoginContext.Provider>;
}