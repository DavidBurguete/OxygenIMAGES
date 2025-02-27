import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [ isDark, setIsDark ] = useState(false);

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
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);