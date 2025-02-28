import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const isDarkLocalStorage = localStorage.getItem("isDark");
    const [ isDark, setIsDark ] = useState(isDarkLocalStorage === null?false:(isDarkLocalStorage === "true"?true:false));

    const toggleTheme = () => {
        setIsDark(prevMode => !prevMode);
    }

    useEffect(() => {
      const body = document.querySelector("body");
      if(isDark){
        body.classList.remove("light");
        body.classList.add("dark");
      }
      else{
        body.classList.remove("dark");
        body.classList.add("light");
      }
      localStorage.setItem("isDark", isDark);
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);