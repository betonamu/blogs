import React from "react";

const createContext = (initialValue) => {
  const Context = React.createContext(initialValue);

  const Provider = ({ children, value }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContext = () => {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error("useContext must be inside a Provider with a value");
    }
    return context;
  };

  return [Provider, useContext];
};

export default createContext;
