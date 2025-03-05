import React, { useContext, createContext, useState } from "react";
export const ThemeContext = createContext({});

const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default DarkModeProvider;

export const useDarkMode = () => {
  return useContext(ThemeContext);
};
