import React, { createContext, useState, useContext } from "react";

const IdxContext = createContext();

export const useIndex = () => useContext(IdxContext);

export const IndexProvider = ({ children }) => {
  const [Index, setIndex] = useState(0);

  return (
    <IdxContext.Provider value={{ Index, setIndex }}>
      {children}
    </IdxContext.Provider>
  );
};
